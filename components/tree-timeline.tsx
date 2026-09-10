"use client";
import { useEffect, useRef, useState } from "react";
const events = [
 {year:1500,label:"uma semente encontra luz",text:"Tudo começa pequeno. A árvore imaginária desta experiência serve como régua: não representa um indivíduo histórico específico."},
 {year:1543,label:"Copérnico publica De revolutionibus",text:"Uma mudança radical na maneira europeia de descrever a posição da Terra no cosmos."},
 {year:1687,label:"Newton publica os Principia",text:"Movimento e gravitação ganham uma linguagem matemática que atravessaria séculos."},
 {year:1859,label:"Darwin publica A origem das espécies",text:"A seleção natural oferece um mecanismo para compreender a transformação das populações ao longo do tempo."},
 {year:1877,label:"o som pode ser gravado e reproduzido",text:"O fonógrafo transforma vibração passageira em algo que pode voltar a acontecer."},
 {year:1969,label:"ARPANET transmite suas primeiras mensagens",text:"Computadores distantes começam a conversar em uma rede que ajudaria a formar a história da internet."},
 {year:1990,label:"a Web começa a tomar forma",text:"Tim Berners-Lee implementa tecnologias fundamentais da World Wide Web no CERN."},
 {year:2026,label:"você chegou aqui",text:"526 anos depois. Para nós, gerações. Para organismos longevos, uma escala biológica possível."}
];
export function TreeTimeline(){
 const ref=useRef<HTMLDivElement>(null); const [progress,setProgress]=useState(0);
 useEffect(()=>{const on=()=>{if(!ref.current)return; const r=ref.current.getBoundingClientRect(); const total=ref.current.offsetHeight-innerHeight; setProgress(Math.max(0,Math.min(1,-r.top/Math.max(total,1))))}; on(); addEventListener("scroll",on,{passive:true}); return()=>removeEventListener("scroll",on)},[]);
 const year=Math.round(1500+progress*526); const rings=Math.max(1,Math.round(progress*26));
 return <div className="tree-experience" ref={ref}>
   <div className="tree-sticky">
    <div className="year-counter"><span>ano</span><strong>{year}</strong><small>{Math.round(progress*100)}% da travessia</small></div>
    <div className="tree-scene" aria-hidden="true">
      <div className="sun-disc" style={{transform:`translateY(${progress*70}px)`}}/>
      <div className="tree-crown" style={{transform:`scale(${.25+progress*.85})`,opacity:.35+progress*.65}}><i/><i/><i/><i/></div>
      <div className="tree-trunk" style={{height:`${80+progress*250}px`,width:`${12+progress*48}px`}}>{Array.from({length:rings}).map((_,i)=><span key={i} style={{inset:`${i*1.7}px`}}/>)}</div>
      <div className="ground-line"/>
    </div>
   </div>
   <div className="timeline-events">
    {events.map((e,i)=><section key={e.year} className="timeline-event" style={{marginTop:i===0?"18vh":"42vh"}}><span>{e.year}</span><h2>{e.label}</h2><p>{e.text}</p></section>)}
    <section className="tree-ending"><p className="overline">uma mudança de escala</p><h2>História humana parece longa até encontrarmos outra régua.</h2><p>Árvores armazenam tempo em crescimento, cicatrizes e anéis. A proposta aqui não é dizer que “nada muda”, mas lembrar que cada organismo habita ritmos diferentes.</p><div className="source-note">Para continuar: procure por dendrocronologia, árvores longevas e escalas de tempo ecológicas.</div></section>
   </div>
 </div>
}
