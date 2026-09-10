"use client";
import { useEffect, useRef, useState } from "react";
const events = [
 {year:1500,label:"uma semente encontra luz",text:"Esta árvore é uma régua narrativa: não representa um indivíduo histórico específico."},
 {year:1543,label:"um novo desenho do cosmos",text:"Copérnico publica De revolutionibus e ajuda a deslocar a Terra do centro do modelo astronômico europeu."},
 {year:1687,label:"movimento ganha outra linguagem",text:"Newton publica os Principia e organiza movimento e gravitação em uma estrutura matemática influente."},
 {year:1859,label:"a vida entra em outra escala",text:"Darwin publica A origem das espécies e apresenta a seleção natural como mecanismo de mudança em populações."},
 {year:1877,label:"o som deixa de ser só instante",text:"O fonógrafo permite gravar e reproduzir vibrações sonoras."},
 {year:1969,label:"computadores começam a conversar em rede",text:"A ARPANET transmite suas primeiras mensagens e participa da história que levaria à internet moderna."},
 {year:1990,label:"a Web começa a tomar forma",text:"No CERN, Tim Berners-Lee implementa tecnologias fundamentais da World Wide Web."},
 {year:2026,label:"você chegou aqui",text:"526 anos depois. Para nós, muitas gerações; para organismos longevos, outra escala de tempo."}
];
export function TreeTimeline(){
 const ref=useRef<HTMLDivElement>(null); const [progress,setProgress]=useState(0);
 useEffect(()=>{const on=()=>{if(!ref.current)return;const r=ref.current.getBoundingClientRect();const total=ref.current.offsetHeight-innerHeight;setProgress(Math.max(0,Math.min(1,-r.top/Math.max(total,1))))};on();addEventListener("scroll",on,{passive:true});return()=>removeEventListener("scroll",on)},[]);
 const year=Math.round(1500+progress*526); const rings=Math.max(1,Math.round(progress*24));
 return <div className="tree-experience" ref={ref}>
   <div className="tree-sticky">
    <div className="year-counter"><span>você está em</span><strong>{year}</strong><small>{Math.round(progress*100)}% da travessia</small><div className="progress-track" role="progressbar" aria-label="Progresso no tempo" aria-valuemin={1500} aria-valuemax={2026} aria-valuenow={year}><i style={{height:`${progress*100}%`}}/></div></div>
    <div className="tree-scene" aria-hidden="true"><div className="sun-disc"/><div className="tree-crown" style={{transform:`scale(${.28+progress*.72})`,opacity:.45+progress*.55}}><i/><i/><i/><i/></div><div className="tree-trunk" style={{height:`${90+progress*245}px`,width:`${14+progress*44}px`}}>{Array.from({length:rings}).map((_,i)=><span key={i} style={{inset:`${i*1.7}px`}}/>)}</div><div className="ground-line"/></div>
    <div className="scroll-cue"><span>role para avançar</span><b>↓</b></div>
   </div>
   <div className="timeline-events">
    {events.map((e,i)=><section key={e.year} className="timeline-event" style={{marginTop:i===0?"12vh":"34vh"}}><span>{e.year}</span><h2>{e.label}</h2><p>{e.text}</p></section>)}
    <section className="tree-ending"><p className="overline">uma mudança de escala</p><h2>O tempo não passa do mesmo jeito para tudo.</h2><p>Árvores registram crescimento em madeira; pessoas registram tempo em histórias, hábitos e memória. A comparação é uma metáfora para enxergar escala, não para dizer que uma forma de vida é “mais lenta” em tudo.</p>
      <figure className="archive-figure"><img src="https://d9-wret.s3.us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/medium/public/thumbnails/image/Tree%20Rings%203%20JPG.jpg?itok=iHLlAabP" alt="Amostra de anéis de crescimento de uma árvore marcada por anos"/><figcaption>Referência real de anéis de crescimento, U.S. Geological Survey. Imagem marcada como domínio público pela fonte.</figcaption></figure>
    </section>
   </div>
 </div>
}
