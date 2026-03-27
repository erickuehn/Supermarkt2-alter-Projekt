const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const products = [
  { name: 'Brot (500g)', aldi: '1.00', lidl: '1.00', penny: '0.99', kaufland: '1.00' },
  { name: 'Butter (250g)', aldi: '2.19', lidl: '2.25', penny: '2.19', kaufland: '2.25' },
  { name: 'Milch (1L)', aldi: '0.95', lidl: '0.95', penny: '0.95', kaufland: '1.00' },
  { name: 'Eier (10 Stk)', aldi: '1.99', lidl: '1.99', penny: '1.99', kaufland: '2.09' },
  { name: 'Mehl (1kg)', aldi: '0.79', lidl: '0.79', penny: '0.79', kaufland: '0.85' },
  { name: 'Zucker (1kg)', aldi: '0.79', lidl: '0.79', penny: '0.79', kaufland: '0.85' },
  { name: 'Nudeln (500g)', aldi: '0.99', lidl: '0.99', penny: '0.99', kaufland: '0.99' },
  { name: 'Reis (1kg)', aldi: '1.79', lidl: '1.79', penny: '1.79', kaufland: '1.89' },
  { name: 'Kartoffeln (2kg)', aldi: '3.49', lidl: '3.49', penny: '3.29', kaufland: '3.59' },
  { name: 'Äpfel (1kg)', aldi: '2.49', lidl: '2.49', penny: '2.29', kaufland: '2.69' },
  { name: 'Bananen (1kg)', aldi: '1.29', lidl: '1.29', penny: '1.19', kaufland: '1.39' },
  { name: 'Tomaten (1kg)', aldi: '2.99', lidl: '2.99', penny: '2.79', kaufland: '3.19' },
  { name: 'Gurke (Stk)', aldi: '0.89', lidl: '0.89', penny: '0.85', kaufland: '0.99' },
  { name: 'Karotten (1kg)', aldi: '1.29', lidl: '1.29', penny: '1.19', kaufland: '1.39' },
  { name: 'Zwiebeln (1kg)', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Käse (Gouda 200g)', aldi: '1.79', lidl: '1.79', penny: '1.69', kaufland: '1.89' },
  { name: 'Joghurt (500g)', aldi: '0.89', lidl: '0.89', penny: '0.85', kaufland: '0.95' },
  { name: 'Quark (500g)', aldi: '0.99', lidl: '0.99', penny: '0.95', kaufland: '1.05' },
  { name: 'Sahne (200ml)', aldi: '0.89', lidl: '0.89', penny: '0.85', kaufland: '0.95' },
  { name: 'Hähnchenbrust (1kg)', aldi: '7.99', lidl: '7.99', penny: '7.79', kaufland: '8.49' },
  { name: 'Hackfleisch (500g)', aldi: '3.49', lidl: '3.49', penny: '3.29', kaufland: '3.79' },
  { name: 'Wurst (200g)', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Tiefkühlpizza', aldi: '2.49', lidl: '2.49', penny: '2.39', kaufland: '2.49' },
  { name: 'Pommes TK (1kg)', aldi: '1.79', lidl: '1.79', penny: '1.69', kaufland: '1.89' },
  { name: 'Fischstäbchen', aldi: '2.99', lidl: '2.99', penny: '2.79', kaufland: '3.19' },
  { name: 'Cornflakes', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Müsli', aldi: '1.99', lidl: '1.99', penny: '1.89', kaufland: '2.09' },
  { name: 'Honig', aldi: '2.79', lidl: '2.79', penny: '2.69', kaufland: '2.99' },
  { name: 'Nutella-Alternative', aldi: '1.79', lidl: '1.79', penny: '1.69', kaufland: '1.89' },
  { name: 'Marmelade', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Kaffee (500g)', aldi: '4.99', lidl: '4.99', penny: '4.79', kaufland: '5.29' },
  { name: 'Tee (20 Beutel)', aldi: '0.99', lidl: '0.99', penny: '0.95', kaufland: '1.09' },
  { name: 'Wasser (1,5L)', aldi: '0.29', lidl: '0.29', penny: '0.25', kaufland: '0.35' },
  { name: 'Cola (1,5L)', aldi: '0.89', lidl: '0.89', penny: '0.85', kaufland: '0.99' },
  { name: 'Saft (1L)', aldi: '1.19', lidl: '1.19', penny: '1.09', kaufland: '1.29' },
  { name: 'Bier (0,5L)', aldi: '0.49', lidl: '0.49', penny: '0.45', kaufland: '0.55' },
  { name: 'Öl (1L)', aldi: '1.99', lidl: '1.99', penny: '1.89', kaufland: '2.19' },
  { name: 'Essig', aldi: '0.79', lidl: '0.79', penny: '0.75', kaufland: '0.89' },
  { name: 'Salz', aldi: '0.39', lidl: '0.39', penny: '0.35', kaufland: '0.45' },
  { name: 'Pfeffer', aldi: '1.29', lidl: '1.29', penny: '1.19', kaufland: '1.39' },
  { name: 'Ketchup', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Mayo', aldi: '1.29', lidl: '1.29', penny: '1.19', kaufland: '1.39' },
  { name: 'Tiefkühlgemüse', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Spinat TK', aldi: '1.29', lidl: '1.29', penny: '1.19', kaufland: '1.39' },
  { name: 'Linsen (500g)', aldi: '1.49', lidl: '1.49', penny: '1.39', kaufland: '1.59' },
  { name: 'Bohnen Dose', aldi: '0.79', lidl: '0.79', penny: '0.75', kaufland: '0.89' },
  { name: 'Thunfisch Dose', aldi: '1.19', lidl: '1.19', penny: '1.09', kaufland: '1.29' },
  { name: 'Toastbrot', aldi: '0.99', lidl: '0.99', penny: '0.95', kaufland: '1.09' },
  { name: 'Croissants TK', aldi: '2.49', lidl: '2.49', penny: '2.39', kaufland: '2.69' }
];

async function main() {
  for (const p of products) {
    await prisma.price.upsert({
      where: { productName: p.name },
      update: {
        aldi: p.aldi,
        lidl: p.lidl,
        penny: p.penny,
        kaufland: p.kaufland,
        version: { increment: 1 }
      },
      create: {
        productName: p.name,
        aldi: p.aldi,
        lidl: p.lidl,
        penny: p.penny,
        kaufland: p.kaufland
      }
    });
  }

  console.log('Seeded prices:', products.length, 'rows');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
