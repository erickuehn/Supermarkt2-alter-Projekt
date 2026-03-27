#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

function parseCSV(content){
  // very small CSV parser: supports comma or semicolon, handles quoted values
  const lines = content.split(/\r?\n/).filter(l => l.trim() !== '')
  if(lines.length === 0) return { headers: [], rows: [] }
  // detect delimiter from first line
  const delim = lines[0].includes(';') ? ';' : ','
  const parseLine = (ln) => {
    const res = []
    let cur = ''
    let inQ = false
    for(let i=0;i<ln.length;i++){
      const ch = ln[i]
      if(ch === '"') { inQ = !inQ; continue }
      if(ch === delim && !inQ){ res.push(cur.trim()); cur = ''; continue }
      cur += ch
    }
    res.push(cur.trim())
    return res.map(s => s.replace(/^"|"$/g,''))
  }
  const headers = parseLine(lines[0])
  const rows = lines.slice(1).map(parseLine)
  return { headers, rows }
}

function toNumber(v){
  if(v == null) return null
  const s = String(v).replace(/[^0-9.,-]/g,'').replace(',', '.')
  const n = Number(s)
  return Number.isNaN(n) ? null : n
}

async function run(){
  const src = process.argv[2]
  if(!src){
    console.error('Usage: node scripts/import-lebensmittelpreise.js <path-to-file>')
    process.exit(2)
  }
  const abs = path.isAbsolute(src) ? src : path.join(process.cwd(), src)
  if(!fs.existsSync(abs)){
    console.error('File not found:', abs)
    process.exit(2)
  }

  const ext = path.extname(abs).toLowerCase()
  let data = null

  if(ext === '.json'){
    const raw = await fs.promises.readFile(abs,'utf8')
    data = JSON.parse(raw)
    // basic validation
    if(!data.products && !data.stores){
      console.warn('JSON did not contain stores/products keys; treating as products list')
    }
  } else if(ext === '.csv' || ext === '.txt'){
    const raw = await fs.promises.readFile(abs,'utf8')
    const parsed = parseCSV(raw)
    const headers = parsed.headers
    const rows = parsed.rows
    if(headers.length < 2){
      console.error('CSV needs at least two columns: product name + one store column')
      process.exit(2)
    }
    // build stores from headers[1..]
    const stores = headers.slice(1).map((h,idx)=>({ id: String.fromCharCode(65+idx), name: h }))
    const products = rows.map(r => {
      const name = r[0] || ''
      const prices = {}
      for(let i=1;i<headers.length;i++){
        const storeId = String.fromCharCode(65 + (i-1))
        prices[storeId] = toNumber(r[i])
      }
      return { name, prices }
    })
    data = { stores, products }
  } else if(ext === '.xlsx' || ext === '.xls'){
    try{
      const xlsx = require('xlsx')
      const wb = xlsx.readFile(abs)
      const sheetName = wb.SheetNames[0]
      const sheet = wb.Sheets[sheetName]
      const arr = xlsx.utils.sheet_to_json(sheet, { header:1 })
      if(!arr || arr.length === 0){ console.error('XLSX sheet empty'); process.exit(2) }
      const headers = arr[0].map(h => String(h||''))
      const rows = arr.slice(1)
      const stores = headers.slice(1).map((h,idx)=>({ id: String.fromCharCode(65+idx), name: h }))
      const products = rows.map(r=>{
        const name = r[0] || ''
        const prices = {}
        for(let i=1;i<headers.length;i++) prices[String.fromCharCode(65+(i-1))] = toNumber(r[i])
        return { name, prices }
      })
      data = { stores, products }
    }catch(err){
      console.error('To import XLSX you need the `xlsx` package. Install with `npm install xlsx` and re-run.');
      process.exit(2)
    }
  } else {
    console.error('Unsupported file extension:', ext, 'Supported: .json, .csv, .xlsx')
    process.exit(2)
  }

  // write to public/data/stores.json
  const outDir = path.join(process.cwd(),'public','data')
  await fs.promises.mkdir(outDir, { recursive: true })
  const outPath = path.join(outDir,'stores.json')
  await fs.promises.writeFile(outPath, JSON.stringify(data,null,2),'utf8')
  console.log('Imported data written to', outPath)

  // static HTML generation for the old hidden page is intentionally skipped.
  // We keep only the JSON data under public/data/stores.json. If you want a
  // static HTML export, run a separate script to generate it into a safe
  // subfolder under public/ (for example: public/export/) so it doesn't
  // reference removed application routes.
  console.log('Static HTML generation skipped — wrote JSON only to', outPath)
}

run().catch(err=>{ console.error(err); process.exit(2) })
