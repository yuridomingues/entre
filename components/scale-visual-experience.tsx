"use client";
import { useEffect, useRef, useState } from "react";

type Kind="grain"|"rice"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"eiffel"|"tower"|"mountain"|"earth";

type ScaleItem={
  kind:Kind;
  name:string;
  size:string;
  meters:number;
};

const items:ScaleItem[]=[
  {kind:"grain",name:"grão de areia",size:"1 mm",meters:.001},
  {kind:"rice",name:"grão de arroz",size:"7 mm",meters:.007},
  {kind:"coin",name:"moeda",size:"2,5 cm",meters:.025},
  {kind:"phone",name:"celular",size:"15 cm",meters:.15},
  {kind:"person",name:"pessoa",size:"1,7 m",meters:1.7},
  {kind:"bus",name:"ônibus",size:"12 m",meters:12},
  {kind:"building",name:"prédio",size:"30 m",meters:30},
  {kind:"tree",name:"sequoia",size:"80 m",meters:80},
  {kind:"eiffel",name:"Torre Eiffel",size:"330 m",meters:330},
  {kind:"tower",name:"Burj Khalifa",size:"828 m",meters:828},
  {kind:"mountain",name:"Everest",size:"8,8 km",meters:8849},
  {kind:"earth",name:"Terra",size:"12.742 km",meters:12742000}
];

const fmtRatio=(value:number)=>{
  if(value>=1000)return Math.round(value).toLocaleString("pt-BR");
  if(value>=10)return value.toFixed(1).replace(".",",");
  return value.toFixed(1).replace(".",",");
};

function Shape({kind}:{kind:Kind}){
  if(kind==="grain")return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="11" fill="currentColor"/></svg>;
  if(kind==="rice")return <svg viewBox="0 0 100 100" aria-hidden="true"><ellipse cx="50" cy="50" rx="38" ry="15" fill="currentColor" transform="rotate(-18 50 50)"/></svg>;
  if(kind==="coin")return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" fill="currentColor"/><circle cx="50" cy="50" r="31" fill="none" stroke="#fffdf8" strokeWidth="5"/></svg>;
  if(kind==="phone")return <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="27" y="7" width="46" height="86" rx="10" fill="currentColor"/><rect x="34" y="17" width="32" height="57" rx="3" fill="#fffdf8"/><circle cx="50" cy="83" r="4" fill="#fffdf8"/></svg>;
  if(kind==="person")return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="17" r="12" fill="currentColor"/><path d="M35 34h30l9 27-12 4-5-17v45H43V58l-6 35H23l10-44-13 17-10-8Z" fill="currentColor"/></svg>;
  if(kind==="bus")return <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="5" y="30" width="90" height="46" rx="10" fill="currentColor"/><rect x="14" y="38" width="56" height="19" rx="2" fill="#fffdf8"/><rect x="75" y="38" width="12" height="19" rx="2" fill="#fffdf8"/><circle cx="26" cy="78" r="10" fill="currentColor" stroke="#fffdf8" strokeWidth="4"/><circle cx="76" cy="78" r="10" fill="currentColor" stroke="#fffdf8" strokeWidth="4"/></svg>;
  if(kind==="building")return <svg viewBox="0 0 100 100" aria-hidden="true"><rect x="24" y="5" width="52" height="90" rx="3" fill="currentColor"/>{[0,1,2,3].map(r=>[0,1,2].map(c=><rect key={`${r}-${c}`} x={33+c*14} y={18+r*16} width="7" height="8" fill="#fffdf8"/>))}<rect x="43" y="78" width="14" height="17" fill="#fffdf8"/></svg>;
  if(kind==="tree")return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M43 97 48 44h7l5 53Z" fill="currentColor"/><path d="M52 2 28 43h15L21 66h19L25 85h54L63 66h18L59 43h15Z" fill="currentColor"/></svg>;
  if(kind==="eiffel")return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M49 3h2l8 36 26 56H64L55 71H45l-9 24H15l26-56Zm-5 48-7 18h26l-7-18Z" fill="currentColor"/></svg>;
  if(kind==="tower")return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M48 2h4l3 18 7 9-4 8 10 57H32l10-57-4-8 7-9Z" fill="currentColor"/><path d="M38 51h24M35 69h30" stroke="#fffdf8" strokeWidth="3"/></svg>;
  if(kind==="mountain")return <svg viewBox="0 0 100 100" aria-hidden="true"><path d="M1 91 37 35l13 16 16-28 33 68Z" fill="currentColor"/><path d="m37 35 13 16 16-28 12 24-11-5-8 9-8-7-8 8Z" fill="#fffdf8"/></svg>;
  return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="47" fill="currentColor"/><path d="M18 34c10-12 22-15 31-8l4 13 13 4 3 13-10 8-2 19-15-3-7-17-14-6-6-12Zm52-12c10 2 18 8 23 16l-10 7-10-6Z" fill="#fffdf8"/></svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(0);
  const touchStart=useRef<number|null>(null);
  const current=items[index];
  const previous=index>0?items[index-1]:null;
  const ratio=previous?current.meters/previous.meters:1;

  const next=()=>setIndex(v=>Math.min(items.length-1,v+1));
  const back=()=>setIndex(v=>Math.max(0,v-1));

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="ArrowRight")next();
      if(event.key==="ArrowLeft")back();
    };
    addEventListener("keydown",onKey);
    return()=>removeEventListener("keydown",onKey);
  },[]);

  return <div className="scale-life">
    <section
      className="scale-life-camera"
      onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null}}
      onTouchEnd={e=>{
        if(touchStart.current===null)return;
        const end=e.changedTouches[0]?.clientX??touchStart.current;
        const delta=end-touchStart.current;
        if(delta<-45)next();
        if(delta>45)back();
        touchStart.current=null;
      }}
    >
      <div className="scale-life-head">
        <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
        <div><h2>{current.name}</h2><strong>{current.size}</strong></div>
      </div>

      <div className="scale-life-world" aria-live="polite">
        <div className="scale-life-baseline"/>

        {items.map((item,i)=>{
          const distance=i-index;
          const extent=distance===0?68:distance===-1?Math.max(.15,68*(item.meters/current.meters)):68;
          const state=distance===0?"current":distance===-1?"previous":distance>0?"future":"past";
          return <div
            key={item.kind}
            className={`scale-life-object ${state}`}
            style={{height:`${extent}%`}}
            aria-hidden={distance!==0&&distance!==-1}
          >
            <Shape kind={item.kind}/>
          </div>;
        })}

        {previous&&<div className="scale-life-prev-label">
          <i/>
          <div><small>era isto</small><strong>{previous.name}</strong><span>{previous.size}</span></div>
        </div>}

        <div className="scale-life-current-label">
          <small>agora</small><strong>{current.name}</strong><span>{current.size}</span>
        </div>

        {previous&&<div className="scale-life-ratio">
          <small>o próximo é</small>
          <b>{fmtRatio(ratio)}×</b>
          <span>maior nesta medida</span>
        </div>}
      </div>

      <div className="scale-life-controls">
        <button onClick={back} disabled={index===0} aria-label="Escala anterior">←</button>
        <div>
          <span>{index===0?"comece aqui":index===items.length-1?"do menor ao planeta":"continue abrindo a escala"}</span>
          <div className="scale-life-progress"><i style={{width:`${((index+1)/items.length)*100}%`}}/></div>
        </div>
        <button onClick={index===items.length-1?()=>setIndex(0):next} aria-label={index===items.length-1?"Recomeçar":"Próxima escala"}>{index===items.length-1?"↺":"→"}</button>
      </div>
      <p className="scale-life-swipe">use as setas ou deslize</p>
    </section>

    <nav className="scale-life-index" aria-label="Objetos da escala">
      {items.map((item,i)=><button key={item.kind} onClick={()=>setIndex(i)} className={i===index?"active":""}>
        <span>{String(i+1).padStart(2,"0")}</span><strong>{item.name}</strong><small>{item.size}</small>
      </button>)}
    </nav>

    <section className="scale-life-ending">
      <span>1 mm até 12.742 km</span>
      <h2>A mesma tela muda de régua doze vezes.</h2>
      <p>O objeto anterior não é redesenhado para parecer menor. Ele realmente encolhe na proporção da próxima medida.</p>
    </section>
  </div>;
}
