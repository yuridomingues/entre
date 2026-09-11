"use client";
import { useState } from "react";

type Kind="grain"|"coin"|"phone"|"person"|"bus"|"building"|"tree"|"mountain"|"earth";

type Step={
  kind:Kind;
  name:string;
  size:string;
  ratio:string;
  ratioNumber:string;
  note:string;
};

const steps:Step[]=[
  {kind:"grain",name:"grão de areia",size:"1 mm",ratio:"começo",ratioNumber:"1",note:"Um milímetro já é pequeno o bastante para quase sumir na ponta do dedo."},
  {kind:"coin",name:"moeda",size:"2,5 cm",ratio:"25 grãos",ratioNumber:"25×",note:"O grão vira um ponto minúsculo quando a referência passa a ser uma moeda."},
  {kind:"phone",name:"celular",size:"15 cm",ratio:"6 moedas",ratioNumber:"6×",note:"Uma moeda ainda é fácil de enxergar. Agora ela cabe várias vezes num objeto que seguramos todo dia."},
  {kind:"person",name:"pessoa",size:"1,7 m",ratio:"11 celulares",ratioNumber:"11×",note:"O celular que ocupava a cena vira só uma pequena parte da altura de uma pessoa."},
  {kind:"bus",name:"ônibus",size:"12 m",ratio:"7 pessoas",ratioNumber:"7×",note:"Ao lado de um ônibus, a pessoa deixa de dominar a comparação."},
  {kind:"building",name:"prédio",size:"30 m",ratio:"2,5 ônibus",ratioNumber:"2,5×",note:"Um prédio de dez andares já muda a sensação de escala sem sair do cotidiano."},
  {kind:"tree",name:"sequoia",size:"80 m",ratio:"2,7 prédios",ratioNumber:"2,7×",note:"Uma sequoia gigante pode passar da altura de muitos prédios."},
  {kind:"mountain",name:"Everest",size:"8,8 km",ratio:"110 sequoias",ratioNumber:"110×",note:"A árvore que parecia enorme quase desaparece quando a referência vira uma montanha."},
  {kind:"earth",name:"Terra",size:"12.742 km",ratio:"1.448 Everests",ratioNumber:"1.448×",note:"Na escala do planeta, até a maior montanha parece uma pequena irregularidade na superfície."}
];

function Pictogram({kind,className=""}:{kind:Kind;className?:string}){
  const common={className:`scale-pictogram ${className}`,viewBox:"0 0 160 160",role:"img" as const};

  if(kind==="grain")return <svg {...common} aria-label="Grão de areia">
    <circle cx="80" cy="84" r="12" fill="#111"/>
    <path d="M24 132h112M40 123v18M60 126v12M80 121v20M100 126v12M120 123v18" stroke="#111" strokeWidth="4" strokeLinecap="round"/>
    <text x="80" y="154" textAnchor="middle" fontSize="13" fontWeight="900">1 mm</text>
  </svg>;

  if(kind==="coin")return <svg {...common} aria-label="Moeda">
    <circle cx="80" cy="80" r="55" fill="#ffd45b" stroke="#111" strokeWidth="7"/>
    <circle cx="80" cy="80" r="41" fill="none" stroke="#111" strokeWidth="4"/>
    <circle cx="80" cy="80" r="7" fill="#111"/>
  </svg>;

  if(kind==="phone")return <svg {...common} aria-label="Celular">
    <rect x="48" y="15" width="64" height="130" rx="13" fill="#fffdf8" stroke="#111" strokeWidth="7"/>
    <rect x="56" y="28" width="48" height="91" rx="5" fill="#9edcea" stroke="#111" strokeWidth="4"/>
    <circle cx="80" cy="133" r="5" fill="#111"/>
  </svg>;

  if(kind==="person")return <svg {...common} aria-label="Pessoa">
    <circle cx="80" cy="31" r="20" fill="#111"/>
    <path d="M53 61c8-10 46-10 54 0l12 48-20 5-7-30v62H68V96l-9 50H35l17-75-20 28-16-13Z" fill="#111"/>
  </svg>;

  if(kind==="bus")return <svg {...common} aria-label="Ônibus">
    <rect x="12" y="43" width="136" height="78" rx="15" fill="#ffd45b" stroke="#111" strokeWidth="6"/>
    <rect x="24" y="54" width="84" height="34" rx="4" fill="#fffdf8" stroke="#111" strokeWidth="4"/>
    <rect x="115" y="54" width="22" height="34" rx="4" fill="#fffdf8" stroke="#111" strokeWidth="4"/>
    <circle cx="42" cy="122" r="15" fill="#111"/><circle cx="120" cy="122" r="15" fill="#111"/>
    <circle cx="42" cy="122" r="6" fill="#fffdf8"/><circle cx="120" cy="122" r="6" fill="#fffdf8"/>
  </svg>;

  if(kind==="building")return <svg {...common} aria-label="Prédio">
    <rect x="38" y="19" width="84" height="127" rx="4" fill="#c9b9f4" stroke="#111" strokeWidth="7"/>
    {[0,1,2,3].map(row=>[0,1,2].map(col=><rect key={`${row}-${col}`} x={52+col*22} y={34+row*23} width="11" height="12" fill="#fffdf8" stroke="#111" strokeWidth="2"/>))}
    <rect x="69" y="124" width="22" height="22" fill="#111"/>
  </svg>;

  if(kind==="tree")return <svg {...common} aria-label="Sequoia">
    <path d="M68 146 75 58h18l7 88Z" fill="#7b4d32" stroke="#111" strokeWidth="5"/>
    <path d="M80 11 42 69h23L31 104h35l-24 30h76l-24-30h35L95 69h23Z" fill="#6b9850" stroke="#111" strokeWidth="5" strokeLinejoin="round"/>
  </svg>;

  if(kind==="mountain")return <svg {...common} aria-label="Everest">
    <path d="M7 137 61 52l20 28 22-47 50 104Z" fill="#9aa9b7" stroke="#111" strokeWidth="6" strokeLinejoin="round"/>
    <path d="m61 52 20 28 22-47 18 37-17-7-12 15-12-11-12 13Z" fill="#fffdf8" stroke="#111" strokeWidth="3" strokeLinejoin="round"/>
  </svg>;

  return <svg {...common} aria-label="Planeta Terra">
    <circle cx="80" cy="80" r="62" fill="#7f84d8" stroke="#111" strokeWidth="7"/>
    <path d="M37 54c12-15 30-22 42-14l6 17 18 5 5 18-14 13-2 25-20-4-9-23-20-8-8-17Z" fill="#82b864" stroke="#111" strokeWidth="3"/>
    <path d="M102 31c13 3 24 11 31 22l-14 9-13-8Z" fill="#82b864" stroke="#111" strokeWidth="3"/>
  </svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(0);
  const current=steps[index];
  const previous=index>0?steps[index-1]:null;

  return <div className="scale-clean">
    <section className="scale-clean-stage">
      <div className="scale-clean-top">
        <div>
          <span>{String(index+1).padStart(2,"0")} / {String(steps.length).padStart(2,"0")}</span>
          <h2>{current.name}</h2>
          <strong>{current.size}</strong>
        </div>
        {previous&&<div className="scale-clean-ratio"><small>em relação a {previous.name}</small><b>{current.ratioNumber}</b></div>}
      </div>

      <div className={previous?"scale-comparison":"scale-comparison first"}>
        {previous&&<div className="scale-specimen previous">
          <small>antes</small>
          <Pictogram kind={previous.kind}/>
          <strong>{previous.name}</strong>
          <span>{previous.size}</span>
        </div>}

        {previous&&<div className="scale-equation" aria-label={current.ratio}><span>×</span><strong>{current.ratioNumber.replace("×","")}</strong></div>}

        <div className="scale-specimen current">
          <small>{previous?"agora":"começo"}</small>
          <Pictogram kind={current.kind}/>
          <strong>{current.name}</strong>
          <span>{current.size}</span>
        </div>
      </div>

      <p className="scale-clean-note">{current.note}</p>

      <div className="scale-clean-actions">
        <button onClick={()=>setIndex(v=>Math.max(0,v-1))} disabled={index===0}>← voltar</button>
        {index<steps.length-1
          ?<button className="primary" onClick={()=>setIndex(v=>Math.min(steps.length-1,v+1))}>próxima escala →</button>
          :<button className="primary" onClick={()=>setIndex(0)}>começar de novo ↺</button>}
      </div>
    </section>

    <nav className="scale-clean-nav" aria-label="Escalas">
      {steps.map((step,i)=><button key={step.kind} onClick={()=>setIndex(i)} className={i===index?"active":i<index?"seen":""}>
        <Pictogram kind={step.kind}/>
        <span>{step.name}</span>
      </button>)}
    </nav>

    <section className="scale-clean-ending">
      <span>1 mm → 12.742 km</span>
      <h2>A comparação fica mais fácil quando a referência não desaparece.</h2>
      <p>Cada passo mantém o objeto anterior ao lado do próximo. Assim, a mudança de escala deixa de ser só um número.</p>
    </section>
  </div>;
}
