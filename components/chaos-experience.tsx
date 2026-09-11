"use client";
import { useEffect, useMemo, useState } from "react";

function logisticSeries(start:number,steps=38){
  const r=3.91;
  const out=[start];
  for(let i=1;i<steps;i++)out.push(r*out[i-1]*(1-out[i-1]));
  return out;
}
function seriesPath(values:number[],visible:number){
  const count=Math.max(1,Math.min(values.length,visible));
  return values.slice(0,count).map((v,i)=>{
    const x=38+(i/(values.length-1))*824;
    const y=345-v*285;
    return (i===0?"M":"L")+x.toFixed(1)+" "+y.toFixed(1);
  }).join(" ");
}

export function SmallChange(){
  const [amount,setAmount]=useState(24);
  const [visible,setVisible]=useState(1);
  const [running,setRunning]=useState(false);

  const delta=amount===0?0:Math.pow(10,-6+(amount/100)*3.1);
  const a=useMemo(()=>logisticSeries(.431),[]);
  const b=useMemo(()=>logisticSeries(.431+delta),[delta]);

  useEffect(()=>{
    if(!running)return;
    setVisible(1);
    let step=1;
    const timer=setInterval(()=>{
      step++;
      setVisible(step);
      if(step>=a.length){clearInterval(timer);setRunning(false)}
    },105);
    return()=>clearInterval(timer);
  },[running,a.length,delta]);

  const last=Math.min(visible,a.length)-1;
  const difference=Math.abs(a[last]-b[last]);
  const initialLabel=amount===0?"nenhuma":delta<.00001?"quase invisível":delta<.0002?"minúscula":"pequena";

  return <div className="change-lab">
    <div className="instruction-banner"><span>duas histórias</span><p>Elas seguem exatamente a mesma regra. Você só muda um detalhe no começo.</p></div>
    <section className="change-card">
      <header className="change-head">
        <div><span>sensibilidade ao começo</span><h2>Quanto cabe em uma diferença pequena?</h2></div>
        <div className="change-meter"><span>diferença agora</span><strong>{Math.round(difference*100)}%</strong></div>
      </header>

      <div className="change-stage">
        <svg viewBox="0 0 900 390" role="img" aria-label="Duas trajetórias que começam quase iguais e podem se separar">
          <path className="change-grid" d="M38 60H862M38 155H862M38 250H862M38 345H862"/>
          <path className="change-path one" d={seriesPath(a,visible)}/>
          <path className="change-path two" d={seriesPath(b,visible)}/>
          <circle className="change-dot one" cx={38+(last/(a.length-1))*824} cy={345-a[last]*285} r="8"/>
          <circle className="change-dot two" cx={38+(last/(b.length-1))*824} cy={345-b[last]*285} r="8"/>
        </svg>
        <div className="change-legend"><span><i className="one"/>mundo A</span><span><i className="two"/>mundo B</span></div>
      </div>

      <div className="change-control">
        <div><span>diferença inicial</span><strong>{initialLabel}</strong></div>
        <input type="range" min="0" max="100" value={amount} disabled={running} onChange={e=>{setAmount(Number(e.target.value));setVisible(1)}}/>
        <div className="change-scale"><span>idênticos</span><span>um detalhe maior</span></div>
        <button onClick={()=>setRunning(true)} disabled={running}>{running?"acontecendo...":visible>1?"rodar de novo ↺":"deixar acontecer →"}</button>
      </div>

      {visible>=a.length&&<div className="change-result">
        <strong>{amount===0?"Sem diferença, as histórias continuam juntas.":"A regra nunca mudou."}</strong>
        <p>{amount===0?"Os dois caminhos coincidem porque começaram iguais.":"O que cresceu foi só a consequência de uma diferença que, no começo, quase não dava para ver."}</p>
      </div>}
    </section>
    <p className="change-thought">Nem toda grande diferença precisa de uma grande causa. Em alguns sistemas, o tempo faz o trabalho de amplificar o começo.</p>
  </div>;
}
