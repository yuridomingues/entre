"use client";
import { useEffect, useMemo, useState } from "react";

const WALKERS=81;
const STEPS=32;

export function RandomWalk(){
  const [positions,setPositions]=useState<number[]>(Array(WALKERS).fill(0));
  const [step,setStep]=useState(0);
  const [running,setRunning]=useState(false);

  useEffect(()=>{
    if(!running)return;
    if(step>=STEPS){setRunning(false);return}
    const id=setTimeout(()=>{
      setPositions(values=>values.map(v=>v+(Math.random()<.5?-1:1)));
      setStep(v=>v+1);
    },70);
    return()=>clearTimeout(id);
  },[running,step]);

  const bins=useMemo(()=>{
    const result=Array.from({length:STEPS+1},()=>0);
    positions.forEach(pos=>{const normalized=Math.round((pos+STEPS)/2);if(result[normalized]!==undefined)result[normalized]++});
    return result;
  },[positions]);

  const start=()=>{setPositions(Array(WALKERS).fill(0));setStep(0);setRunning(true)};

  return <div className="random-lab">
    <section className="random-stage">
      <div className="random-head"><span>{step} de {STEPS} escolhas</span><h2>{running?"cada ponto escolhe um lado":step===STEPS?"olhe onde eles chegaram":"81 pontos no mesmo lugar"}</h2></div>
      <div className="random-bars" aria-label="Distribuição dos pontos">
        {bins.map((count,i)=><div key={i} className="random-column"><i style={{height:`${Math.max(2,count*9)}px`}}/><small>{count||""}</small></div>)}
      </div>
      <div className="random-axis"><span>mais para A</span><b>início</b><span>mais para B</span></div>
      <button onClick={start} disabled={running}>{running?"andando...":step===0?"soltar os pontos":"soltar de novo"}</button>
    </section>
    <p className="random-ending">{step===STEPS?"Cada escolha foi imprevisível. O conjunto, porém, criou uma forma bem menos caótica do que parece.":"Todos começam juntos. Em cada passo, cada ponto tem a mesma chance de ir para A ou B."}</p>
  </div>
}
