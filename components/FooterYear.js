import {useEffect, useState} from 'react';

export default function FooterYear(){
  const [year,setYear] = useState('');
  useEffect(()=>{ setYear(new Date().getFullYear()); },[]);
  return (<span>{year}</span>);
}
