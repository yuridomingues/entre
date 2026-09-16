"use client";
import { useEffect, useRef, useState } from "react";
import { ChalkScaleObject } from "@/components/chalk-scenes";

type Kind="grain"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"mountain"|"earth";
type Item={kind:Kind;name:string;size:string;meters:number;measure:string};

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

export function ScaleExplorer(){
  const [index,setIndex]=useState(1);
  const [guess,setGuess]=useState(38);
  const [revealed,setRevealed]=useState(false);
  const touchStart=useRef<number|null>(null);

  const current=items[index];
  const previous=items[index-1];
  const ratio=current.meters/previous.meters;
  const previousPct=100/ratio;
  const currentHeight=72;
  const actualPreviousHeight=currentHeight*(previous.meters/current.meters);
  const guessRatio=Math.exp(Math.log(1.2)+(guess/100)*Math.log(2000/1.2));
  const shownRatio=revealed?ratio:guessRatio;
  const shownPreviousHeight=currentHeight/shownRatio;
  const tooSmall=(revealed?actualPreviousHeight:shownPreviousHeight)<5;

  useEffect(()=>{setRevealed(false);setGuess(38)},[index]);

  const advance=()=>{
    if(!revealed){setRevealed(true);return}
    setIndex(v=>v===items.length-1?1:v+1);
  };
  const back=()=>setIndex(v=>Math.max(1,v-1));

  useEffect(()=>{
    const onKey=(event:KeyboardEvent)=>{
      if(event.key==="ArrowRight")advance();
      if(event.key==="ArrowLeft")back();
    };
    addEventListener("keydown",onKey);
    return()=>removeEventListener("keydown",onKey);
  },[revealed,index]);

  return <div className="scale-doodle chalk-scale">
    <section className="scale-doodle-card">
      <header className="scale-doodle-head">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(items.length).padStart(2,"0")}</span>
          <h2>{previous.name} <em>e</em> {current.name}</h2>
        </div>
        <div className={"scale-doodle-ratio "+(revealed?"revealed":"")}>
          <b>{revealed?fmt(ratio):"?"}</b>
          <span>{revealed?current.measure:"descubra"}</span>
        </div>
      </header>

      <div className="scale-guess">
        <div>
          <span>{revealed?"seu palpite":"antes de revelar"}</span>
          <strong>{fmt(guessRatio)}×</strong>
          {revealed&&<small>real: {fmt(ratio)}×</small>}
        </div>
        <label>
          <span>quanto maior você acha que {current.name} é?</span>
          <input aria-label={"Palpite de quantas vezes "+current.name+" é maior"} type="range" min="0" max="100" value={guess} onChange={e=>{setGuess(Number(e.target.value));setRevealed(false)}}/>
          <div><small>quase igual</small><small>muito maior</small></div>
        </label>
        <button onClick={()=>setRevealed(true)}>{revealed?"revelado ✓":"revelar"}</button>
      </div>

      <div
        className={"doodle-paper chalk-scale-board "+(revealed?"is-revealed":"is-guessing")}
        onTouchStart={e=>{touchStart.current=e.touches[0]?.clientX??null}}
        onTouchEnd={e=>{
          if(touchStart.current===null)return;
          const end=e.changedTouches[0]?.clientX??touchStart.current;
          if(end-touchStart.current<-45)advance();
          if(end-touchStart.current>45)back();
          touchStart.current=null;
        }}
      >
        <div className="chalk-floor" aria-hidden="true"/>

        <div className="doodle-object previous" key={"p-"+index+"-"+revealed} style={{height:Math.max(.25,revealed?actualPreviousHeight:shownPreviousHeight)+"%"}}>
          <ChalkScaleObject kind={previous.kind}/>
          <div className="doodle-label"><strong>{previous.name}</strong><span>{previous.size}</span></div>
        </div>

        <div className="doodle-object current" key={"c-"+index} style={{height:currentHeight+"%"}}>
          <ChalkScaleObject kind={current.kind}/>
          <div className="doodle-label"><strong>{current.name}</strong><span>{revealed?current.size:"?"}</span></div>
        </div>

        {revealed&&<div className="chalk-measure">
          <i/>
          <span>{current.size}</span>
        </div>}

        {tooSmall&&<div className="doodle-note chalk-zoom">
          <span>{revealed?"zoom":"seu palpite"}</span>
          <div><ChalkScaleObject kind={previous.kind}/></div>
          <small>{previous.name}</small>
        </div>}
      </div>

      <p className="scale-doodle-sentence">
        {revealed
          ? <>{previous.name} mede <strong>{previousPct<1?"menos de 1":fmt(previousPct)}%</strong> de {current.name} nesta comparação.</>
          : <>Ajuste a diferença até ela parecer certa. <strong>Depois revele.</strong></>}
      </p>

      <div className="scale-doodle-controls">
        <button onClick={back} disabled={index===1}>← anterior</button>
        <div className="scale-doodle-progress"><i style={{width:(index/(items.length-1))*100+"%"}}/></div>
        <button className="primary" onClick={advance}>{!revealed?"revelar →":index===items.length-1?"recomeçar ↺":"próxima →"}</button>
      </div>
      <p className="scale-doodle-hint">arraste o palpite · use as setas ou deslize no celular</p>
    </section>

    <nav className="scale-doodle-nav" aria-label="Comparações">
      {items.slice(1).map((item,i)=><button key={item.kind} className={index===i+1?"active":""} onClick={()=>setIndex(i+1)}>
        <span>{String(i+2).padStart(2,"0")}</span><strong>{item.name}</strong><small>{item.size}</small>
      </button>)}
    </nav>
  </div>;
}
