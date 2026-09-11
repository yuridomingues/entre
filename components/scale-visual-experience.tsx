"use client";
import { useState } from "react";

type Kind="grain"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"mountain"|"earth";

type Item={
  kind:Kind;
  name:string;
  size:string;
  meters:number;
  measure:string;
};

const items:Item[]=[
  {kind:"grain",name:"grão de areia",size:"1 mm",meters:.001,measure:"diâmetro"},
  {kind:"coin",name:"moeda",size:"2,5 cm",meters:.025,measure:"diâmetro"},
  {kind:"phone",name:"celular",size:"15 cm",meters:.15,measure:"altura"},
  {kind:"person",name:"pessoa",size:"1,7 m",meters:1.7,measure:"altura"},
  {kind:"bus",name:"ônibus",size:"3,2 m",meters:3.2,measure:"altura"},
  {kind:"building",name:"prédio",size:"30 m",meters:30,measure:"altura"},
  {kind:"tree",name:"sequoia",size:"80 m",meters:80,measure:"altura"},
  {kind:"mountain",name:"Everest",size:"8,8 km",meters:8849,measure:"altura"},
  {kind:"earth",name:"Terra",size:"12.742 km",meters:12742000,measure:"diâmetro"}
];

const fmt=(n:number)=>{
  if(n>=1000)return Math.round(n).toLocaleString("pt-BR");
  if(n>=10)return n.toFixed(1).replace(".",",");
  return n.toFixed(1).replace(".",",");
};

function Icon({kind}:{kind:Kind}){
  if(kind==="grain")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="16" fill="currentColor"/>
  </svg>;

  if(kind==="coin")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="46" fill="#ffd45b" stroke="currentColor" strokeWidth="7"/>
    <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="4"/>
    <circle cx="60" cy="60" r="4" fill="currentColor"/>
  </svg>;

  if(kind==="phone")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="35" y="8" width="50" height="104" rx="11" fill="#fffdf8" stroke="currentColor" strokeWidth="7"/>
    <rect x="42" y="20" width="36" height="68" rx="4" fill="#9edcea" stroke="currentColor" strokeWidth="4"/>
    <circle cx="60" cy="100" r="4" fill="currentColor"/>
  </svg>;

  if(kind==="person")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="19" r="13" fill="currentColor"/>
    <path d="M44 39h32l9 28-12 4-6-20v61H53V72l-8 40H31l11-52-17 21-10-9 27-33Z" fill="currentColor"/>
  </svg>;

  if(kind==="bus")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="6" y="40" width="108" height="48" rx="10" fill="#ffd45b" stroke="currentColor" strokeWidth="6"/>
    <rect x="16" y="49" width="67" height="22" rx="3" fill="#fffdf8" stroke="currentColor" strokeWidth="3"/>
    <rect x="89" y="49" width="14" height="22" rx="3" fill="#fffdf8" stroke="currentColor" strokeWidth="3"/>
    <circle cx="30" cy="91" r="11" fill="currentColor"/><circle cx="90" cy="91" r="11" fill="currentColor"/>
    <circle cx="30" cy="91" r="4" fill="#fffdf8"/><circle cx="90" cy="91" r="4" fill="#fffdf8"/>
  </svg>;

  if(kind==="building")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <rect x="31" y="5" width="58" height="110" rx="3" fill="#c9b9f4" stroke="currentColor" strokeWidth="6"/>
    {[0,1,2,3].map(r=>[0,1,2].map(c=><rect key={`${r}-${c}`} x={41+c*16} y={19+r*20} width="8" height="10" fill="#fffdf8"/>))}
    <rect x="51" y="94" width="18" height="21" fill="currentColor"/>
  </svg>;

  if(kind==="tree")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M51 115 56 52h10l5 63Z" fill="#7b4d32" stroke="currentColor" strokeWidth="5"/>
    <path d="M61 4 32 46h17L25 70h22L29 94h64L75 70h21L72 46h17Z" fill="#6b9850" stroke="currentColor" strokeWidth="5" strokeLinejoin="round"/>
  </svg>;

  if(kind==="mountain")return <svg viewBox="0 0 120 120" aria-hidden="true">
    <path d="M3 111 44 46l15 19 20-36 38 82Z" fill="#9aa9b7" stroke="currentColor" strokeWidth="6" strokeLinejoin="round"/>
    <path d="m44 46 15 19 20-36 14 29-13-6-10 12-10-9-10 10Z" fill="#fffdf8"/>
  </svg>;

  return <svg viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="54" fill="#7f84d8" stroke="currentColor" strokeWidth="6"/>
    <path d="M25 42c11-14 26-18 37-10l5 15 15 5 3 15-11 10-3 21-17-4-8-19-16-7-7-14Zm56-14c12 2 21 9 27 18l-12 8-12-7Z" fill="#82b864" stroke="currentColor" strokeWidth="3"/>
  </svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(1);
  const current=items[index];
  const previous=items[index-1];
  const ratio=current.meters/previous.meters;
  const previousPct=Math.max(.35,100/ratio);
  const tooSmall=previousPct<6;

  return <div className="scale-pair">
    <section className="scale-pair-card">
      <header className="scale-pair-head">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          <h2>{current.name}</h2>
          <strong>{current.size}</strong>
        </div>
        <div className="scale-pair-ratio">
          <small>comparado com {previous.name}</small>
          <b>{fmt(ratio)}×</b>
        </div>
      </header>

      <div className="scale-ruler">
        <div className="scale-ruler-line"><span>100%</span><span>75%</span><span>50%</span><span>25%</span><span>0</span></div>

        <div className="scale-object previous" style={{height:`${previousPct}%`}}>
          <Icon kind={previous.kind}/>
          <i className="measure-line"/>
        </div>

        <div className="scale-object current">
          <Icon kind={current.kind}/>
          <i className="measure-line"/>
        </div>

        <div className="scale-label previous-label">
          <strong>{previous.name}</strong><span>{previous.size}</span>
        </div>
        <div className="scale-label current-label">
          <strong>{current.name}</strong><span>{current.size}</span>
        </div>

        {tooSmall&&<aside className="scale-inset">
          <small>zoom de referência</small>
          <Icon kind={previous.kind}/>
          <strong>{previous.name}</strong>
          <span>na régua real ele está marcado no chão</span>
        </aside>}
      </div>

      <div className="scale-pair-caption">
        <span>{current.measure}</span>
        <p>Na mesma régua, {previous.name} ocupa cerca de <strong>{previousPct<1?"menos de 1":fmt(previousPct)}%</strong> da medida de {current.name}.</p>
      </div>

      <div className="scale-pair-actions">
        <button onClick={()=>setIndex(v=>Math.max(1,v-1))} disabled={index===1}>← anterior</button>
        <button className="primary" onClick={()=>setIndex(v=>v===items.length-1?1:v+1)}>{index===items.length-1?"recomeçar ↺":"próxima comparação →"}</button>
      </div>
    </section>

    <nav className="scale-pair-nav" aria-label="Comparações">
      {items.slice(1).map((item,i)=><button key={item.kind} className={index===i+1?"active":""} onClick={()=>setIndex(i+1)}>
        <span>{String(i+2).padStart(2,"0")}</span>
        <strong>{item.name}</strong>
      </button>)}
    </nav>

    <section className="scale-pair-end">
      <span>mesma régua, referências diferentes</span>
      <h2>Quando a proporção está certa, o desenho quase não precisa explicar nada.</h2>
    </section>
  </div>;
}
