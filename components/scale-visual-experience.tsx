"use client";
import { useEffect, useRef, useState } from "react";

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
  return n.toFixed(1).replace(".",",");
};

const sketchProps={
  fill:"none",
  stroke:"currentColor",
  strokeWidth:5,
  strokeLinecap:"round" as const,
  strokeLinejoin:"round" as const,
  vectorEffect:"non-scaling-stroke" as const
};

function Sketch({kind}:{kind:Kind}){
  if(kind==="grain")return <svg viewBox="0 0 100 100" aria-hidden="true">
    <ellipse cx="51" cy="52" rx="31" ry="22" transform="rotate(-12 51 52)" {...sketchProps}/>
    <path d="M31 48c10-10 26-13 40-7M38 63c9 4 22 5 32-1" {...sketchProps} strokeWidth="2.5"/>
  </svg>;

  if(kind==="coin")return <svg viewBox="0 0 100 100" aria-hidden="true">
    <circle cx="50" cy="50" r="43" {...sketchProps}/>
    <circle cx="50" cy="50" r="34" {...sketchProps} strokeWidth="2.5"/>
    <path d="M43 37c4-5 15-5 17 2 2 6-4 9-9 12-5 3-8 6-8 12h18" {...sketchProps} strokeWidth="4"/>
  </svg>;

  if(kind==="phone")return <svg viewBox="0 0 70 120" aria-hidden="true">
    <rect x="10" y="4" width="50" height="112" rx="9" {...sketchProps}/>
    <path d="M20 18h30v72H20zM29 103h12" {...sketchProps} strokeWidth="3"/>
  </svg>;

  if(kind==="person")return <svg viewBox="0 0 90 180" aria-hidden="true">
    <circle cx="45" cy="20" r="14" {...sketchProps}/>
    <path d="M45 35v69M22 62l23-21 24 20M45 104l-18 67M45 104l22 67" {...sketchProps}/>
    <path d="M35 49c7-5 14-5 21 0" {...sketchProps} strokeWidth="2.5"/>
  </svg>;

  if(kind==="bus")return <svg viewBox="0 0 130 180" aria-hidden="true">
    <rect x="18" y="5" width="94" height="158" rx="18" {...sketchProps}/>
    <path d="M31 25h68M30 43h70v67H30zM65 43v67M38 129h54" {...sketchProps}/>
    <circle cx="40" cy="143" r="7" {...sketchProps}/>
    <circle cx="90" cy="143" r="7" {...sketchProps}/>
    <path d="M30 161v14M100 161v14" {...sketchProps}/>
  </svg>;

  if(kind==="building")return <svg viewBox="0 0 110 220" aria-hidden="true">
    <rect x="18" y="4" width="74" height="212" rx="2" {...sketchProps}/>
    {[0,1,2,3,4].map(r=>[0,1].map(c=><rect key={`${r}-${c}`} x={33+c*30} y={25+r*32} width="14" height="17" {...sketchProps} strokeWidth="2.5"/>))}
    <path d="M45 216v-34h20v34" {...sketchProps}/>
  </svg>;

  if(kind==="tree")return <svg viewBox="0 0 130 260" aria-hidden="true">
    <path d="M55 255c4-57 6-111 5-168M75 255c-5-58-8-112-6-168" {...sketchProps}/>
    <path d="M66 4 37 61h16L27 104h21L20 151h25L14 202h102l-31-51h25l-28-47h21L77 61h16Z" {...sketchProps}/>
    <path d="M50 220c11-3 21-3 31 0" {...sketchProps} strokeWidth="2.5"/>
  </svg>;

  if(kind==="mountain")return <svg viewBox="0 0 260 180" aria-hidden="true">
    <path d="M6 174 76 81l28 31 45-77 105 139Z" {...sketchProps}/>
    <path d="m76 81 28 31 45-77 34 46-23-10-17 20-20-16-20 18Z" {...sketchProps} strokeWidth="3"/>
    <path d="M6 174h248" {...sketchProps} strokeWidth="3"/>
  </svg>;

  return <svg viewBox="0 0 200 200" aria-hidden="true">
    <circle cx="100" cy="100" r="91" {...sketchProps}/>
    <path d="M38 67c19-20 45-25 63-13l8 22 26 8 5 24-18 16-5 34-28-6-13-31-26-11-12-25ZM132 37c20 4 37 15 47 30l-20 13-22-11M141 132c18 3 31 12 42 24" {...sketchProps} strokeWidth="3"/>
  </svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(1);
  const touchStart=useRef<number|null>(null);

  const current=items[index];
  const previous=items[index-1];
  const ratio=current.meters/previous.meters;
  const previousPct=100/ratio;

  const currentHeight=74;
  const previousHeight=currentHeight*(previous.meters/current.meters);
  const tooSmall=previousHeight<5;

  const next=()=>setIndex(v=>v===items.length-1?1:v+1);
  const back=()=>setIndex(v=>Math.max(1,v-1));

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="ArrowRight")next();
      if(event.key==="ArrowLeft")back();
    };
    addEventListener("keydown",onKey);
    return()=>removeEventListener("keydown",onKey);
  },[]);

  return <div className="scale-sketch">
    <section className="scale-sketch-card">
      <header className="scale-sketch-head">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          <h2>{previous.name} <em>e</em> {current.name}</h2>
        </div>
        <div className="scale-sketch-ratio">
          <b>{fmt(ratio)}×</b>
          <span>{current.measure}</span>
        </div>
      </header>

      <div
        className="scale-sketch-paper"
        onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null}}
        onTouchEnd={e=>{
          if(touchStart.current===null)return;
          const end=e.changedTouches[0]?.clientX??touchStart.current;
          if(end-touchStart.current<-45)next();
          if(end-touchStart.current>45)back();
          touchStart.current=null;
        }}
      >
        <div className="sketch-baseline"/>
        <div className="sketch-tick t25"><span>25%</span></div>
        <div className="sketch-tick t50"><span>50%</span></div>
        <div className="sketch-tick t75"><span>75%</span></div>
        <div className="sketch-tick t100"><span>100%</span></div>

        <div className="sketch-object previous" key={`previous-${index}`} style={{height:`${Math.max(.25,previousHeight)}%`}}>
          <Sketch kind={previous.kind}/>
          <div className="sketch-label"><strong>{previous.name}</strong><span>{previous.size}</span></div>
        </div>

        <div className="sketch-object current" key={`current-${index}`} style={{height:`${currentHeight}%`}}>
          <Sketch kind={current.kind}/>
          <div className="sketch-label"><strong>{current.name}</strong><span>{current.size}</span></div>
        </div>

        {tooSmall&&<div className="sketch-zoom">
          <span>zoom</span>
          <div><Sketch kind={previous.kind}/></div>
          <small>{previous.name}</small>
        </div>}
      </div>

      <p className="scale-sketch-sentence">
        {previous.name} mede <strong>{previousPct<1?"menos de 1":fmt(previousPct)}%</strong> de {current.name} nesta comparação.
      </p>

      <div className="scale-sketch-controls">
        <button onClick={back} disabled={index===1}>← anterior</button>
        <div className="scale-sketch-progress"><i style={{width:`${(index/(items.length-1))*100}%`}}/></div>
        <button className="primary" onClick={next}>{index===items.length-1?"recomeçar ↺":"próxima →"}</button>
      </div>
      <p className="scale-sketch-hint">use as setas ou deslize no celular</p>
    </section>

    <nav className="scale-sketch-nav" aria-label="Comparações">
      {items.slice(1).map((item,i)=><button key={item.kind} className={index===i+1?"active":""} onClick={()=>setIndex(i+1)}>
        <span>{String(i+2).padStart(2,"0")}</span><strong>{item.name}</strong><small>{item.size}</small>
      </button>)}
    </nav>
  </div>;
}
