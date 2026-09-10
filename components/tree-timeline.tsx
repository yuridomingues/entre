"use client";
import { useEffect, useRef, useState } from "react";
const events=[
 {year:1500,label:"uma semente encontra luz",text:"A árvore desta experiência é imaginária. Ela existe para servir de régua."},
 {year:1543,label:"um novo desenho do cosmos",text:"Copérnico publica De revolutionibus e ajuda a mudar a posição da Terra nos modelos astronômicos europeus."},
 {year:1687,label:"movimento ganha outra linguagem",text:"Newton publica os Principia e organiza movimento e gravitação numa estrutura matemática influente."},
 {year:1859,label:"a vida entra em outra escala",text:"Darwin publica A origem das espécies e apresenta a seleção natural como mecanismo de mudança em populações."},
 {year:1877,label:"o som pode voltar",text:"O fonógrafo torna possível registrar e reproduzir vibrações sonoras."},
 {year:1969,label:"máquinas começam a conversar em rede",text:"A ARPANET transmite suas primeiras mensagens e participa da história que levaria à internet moderna."},
 {year:1990,label:"a Web começa a tomar forma",text:"No CERN, Tim Berners-Lee implementa tecnologias fundamentais da World Wide Web."},
 {year:2026,label:"você chegou aqui",text:"526 anos depois. Para nós, gerações; para organismos longevos, uma escala biológica possível."}
];
export function TreeTimeline(){
 const ref=useRef<HTMLDivElement>(null);const [progress,setProgress]=useState(0);
 useEffect(()=>{const on=()=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();const total=ref.current.offsetHeight-innerHeight;setProgress(Math.max(0,Math.min(1,-r.top/Math.max(total,1))))};on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)},[]);
 const year=Math.round(1500+progress*526);
 return <div className="tree-world" ref={ref}>
   <div className="tree-sticky">
     <div className="tree-year"><small>ano</small><strong>{year}</strong><span>{Math.round(progress*100)}%</span></div>
     <svg className="growing-tree" viewBox="0 0 500 620" aria-hidden="true" style={{transform:`scale(${.58+progress*.42})`,opacity:.72+progress*.28}}>
       <g fill="none" stroke="currentColor" strokeWidth="18" strokeLinecap="round"><path d="M250 590c-7-118-2-215 15-318m-9 93-88-76m89 25 89-92m-93 175-131 15m137 43 120 33"/></g>
       <g fill="currentColor"><circle cx="140" cy="230" r="78"/><circle cx="245" cy="165" r="96"/><circle cx="355" cy="230" r="84"/><circle cx="112" cy="340" r="65"/><circle cx="225" cy="315" r="92"/><circle cx="353" cy="332" r="91"/><circle cx="420" cy="385" r="55"/></g>
     </svg>
     <div className="tree-scroll">role para viajar <b>↓</b></div>
   </div>
   <div className="tree-events">{events.map((e,i)=><section key={e.year} style={{marginTop:i===0?"18vh":"42vh"}}><span>{e.year}</span><h2>{e.label}</h2><p>{e.text}</p></section>)}
     <section className="tree-finale"><span>fim da rolagem</span><h2>História humana parece enorme até mudarmos a régua.</h2><p>Árvores podem registrar crescimento em seus anéis. A metáfora aqui serve para lembrar que “muito tempo” depende do organismo e da escala que escolhemos.</p>
       <svg className="rings-final" viewBox="0 0 360 210" role="img" aria-label="Diagrama simples de anéis de crescimento"><g fill="none" stroke="currentColor" strokeWidth="2"><ellipse cx="180" cy="105" rx="155" ry="82"/><ellipse cx="180" cy="105" rx="128" ry="66"/><ellipse cx="180" cy="105" rx="99" ry="50"/><ellipse cx="180" cy="105" rx="70" ry="35"/><ellipse cx="180" cy="105" rx="40" ry="20"/></g></svg>
     </section>
   </div>
 </div>
}
