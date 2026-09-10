"use client";
import { useState } from "react";

type Choice = "left" | "right" | "same";
const slides = [
  { label:"tamanho", question:"Qual círculo do meio é maior?" },
  { label:"comprimento", question:"Qual linha é maior?" },
  { label:"cor", question:"Qual quadrado é mais escuro?" }
];

export function MindLab(){
  const [step,setStep]=useState(0);
  const [answer,setAnswer]=useState<Choice|null>(null);

  const choose=(value:Choice)=>setAnswer(value);
  const next=()=>{setAnswer(null);setStep((value)=>Math.min(2,value+1))};
  const restart=()=>{setAnswer(null);setStep(0)};

  return <div className="illusion-room">
    <div className="illusion-top">
      <span>{step+1} de 3</span>
      <div>{slides.map((_,i)=><i key={i} className={i<=step?"on":""}/>)}</div>
      <strong>{slides[step].label}</strong>
    </div>

    <section className="illusion-card">
      <p>responda antes de revelar</p>
      <h2>{slides[step].question}</h2>

      {step===0&&<div className={`ebbinghaus ${answer?"revealed":""}`} aria-label="Dois círculos centrais cercados por círculos de tamanhos diferentes">
        <div className="cluster cluster-small">{Array.from({length:8}).map((_,i)=><i key={i}/>) }<b/></div>
        <div className="cluster cluster-big">{Array.from({length:6}).map((_,i)=><i key={i}/>) }<b/></div>
      </div>}

      {step===1&&<div className={`muller ${answer?"revealed":""}`} aria-label="Duas linhas com pontas em direções diferentes">
        <svg viewBox="0 0 720 260" role="img">
          <g fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
            <path d="M170 80H550M170 80l45-35M170 80l45 35M550 80l-45-35M550 80l-45 35"/>
            <path d="M170 180H550M170 180l-45-35M170 180l-45 35M550 180l45-35M550 180l45 35"/>
          </g>
          {answer&&<g stroke="currentColor" strokeWidth="2" strokeDasharray="8 8"><path d="M170 25V225M550 25V225"/></g>}
        </svg>
      </div>}

      {step===2&&<div className={`contrast ${answer?"revealed":""}`} aria-label="Dois quadrados cinza iguais em fundos diferentes">
        <div className="contrast-half light"><b/></div>
        <div className="contrast-half dark"><b/></div>
        {answer&&<span>mesmo cinza</span>}
      </div>}

      {!answer?<div className="illusion-choices">
        <button onClick={()=>choose("left")}>o da esquerda</button>
        <button onClick={()=>choose("right")}>o da direita</button>
        <button onClick={()=>choose("same")}>são iguais</button>
      </div>:<div className="illusion-reveal">
        <strong>{answer==="same"?"Você desconfiou certo.":"Eles são iguais."}</strong>
        {step===0&&<p>Os círculos ao redor mudam a maneira como o centro parece. O contexto entra junto na percepção do tamanho.</p>}
        {step===1&&<p>As pontas mudam a impressão de comprimento. As duas linhas começam e terminam exatamente no mesmo lugar.</p>}
        {step===2&&<p>O fundo claro e o fundo escuro alteram a impressão de brilho. Os dois quadrados têm a mesma cor.</p>}
        {step<2?<button onClick={next}>próxima ilusão →</button>:<button onClick={restart}>ver de novo ↺</button>}
      </div>}
    </section>

    <p className="illusion-end">O olho recebe luz. O cérebro decide relações, bordas, contraste e contexto. Ver já é interpretar.</p>
  </div>
}
