"use client";
import { useState } from "react";

const steps=[
  {name:"grão de areia",size:"1 mm",previous:"",ratio:"",note:"Começamos com algo que quase some entre os dedos.",next:"aumentar 5×"},
  {name:"formiga",size:"5 mm",previous:"grão",ratio:"≈ 5×",note:"Uma formiga pequena já mede vários grãos de areia.",next:"aumentar 5×"},
  {name:"moeda",size:"2,5 cm",previous:"formiga",ratio:"≈ 5×",note:"Agora a formiga cabe várias vezes no diâmetro de uma moeda.",next:"aumentar 7×"},
  {name:"mão",size:"18 cm",previous:"moeda",ratio:"≈ 7×",note:"A moeda vira um detalhe na palma da mão.",next:"aumentar 9×"},
  {name:"pessoa",size:"1,7 m",previous:"mão",ratio:"≈ 9×",note:"A mão que parecia enorme volta a ser apenas uma parte do corpo.",next:"aumentar 7×"},
  {name:"ônibus",size:"12 m",previous:"pessoa",ratio:"≈ 7×",note:"Ao lado de um ônibus, uma pessoa já parece pequena.",next:"aumentar 7×"},
  {name:"sequoia",size:"80 m",previous:"ônibus",ratio:"≈ 7×",note:"Um ônibus inteiro cabe várias vezes na altura de uma sequoia gigante.",next:"aumentar 111×"},
  {name:"Everest",size:"8,8 km",previous:"sequoia",ratio:"≈ 111×",note:"A árvore que dominava a cena quase desaparece diante da montanha.",next:"aumentar 1.440×"},
  {name:"Terra",size:"12.742 km",previous:"Everest",ratio:"≈ 1.440×",note:"Na escala do planeta, o Everest vira uma pequena irregularidade na superfície.",next:""}
];

function ScaleScene({index}:{index:number}){
  if(index===0)return <svg viewBox="0 0 800 460" role="img" aria-label="Um grão de areia sobre a ponta de um dedo">
    <path d="M80 430C170 310 270 245 370 250c105 5 180 72 350 180Z" fill="#f3ad91" stroke="currentColor" strokeWidth="6"/>
    <circle cx="390" cy="245" r="7" fill="currentColor"/>
    <path d="M390 185v38" stroke="currentColor" strokeWidth="3"/><text x="390" y="165" textAnchor="middle" fontSize="24" fontWeight="900">1 mm</text>
  </svg>;

  if(index===1)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma formiga comparada a um grão de areia">
    <circle cx="160" cy="310" r="6" fill="currentColor"/><text x="160" y="350" textAnchor="middle" fontSize="20" fontWeight="900">grão</text>
    <g transform="translate(365 180)" fill="currentColor" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
      <ellipse cx="0" cy="80" rx="32" ry="26"/><ellipse cx="64" cy="80" rx="42" ry="30"/><circle cx="-54" cy="80" r="24"/>
      <path d="M-10 58-58 18M5 54 12 5M12 104-45 142M58 50 108 10M65 110 118 145M88 82l62 0M-75 62l-38-34M-75 94l-42 28"/>
    </g>
    <path d="M155 285C245 238 315 220 365 220" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8"/>
  </svg>;

  if(index===2)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma formiga sobre uma moeda">
    <circle cx="400" cy="235" r="168" fill="#ffd45b" stroke="currentColor" strokeWidth="7"/>
    <circle cx="400" cy="235" r="132" fill="none" stroke="currentColor" strokeWidth="4"/>
    <text x="400" y="275" textAnchor="middle" fontSize="118" fontWeight="900">1</text>
    <g transform="translate(302 172) scale(.35)" fill="currentColor" stroke="currentColor" strokeWidth="8" strokeLinecap="round">
      <ellipse cx="0" cy="80" rx="32" ry="26"/><ellipse cx="64" cy="80" rx="42" ry="30"/><circle cx="-54" cy="80" r="24"/>
      <path d="M-10 58-58 18M5 54 12 5M12 104-45 142M58 50 108 10M65 110 118 145M88 82l62 0"/>
    </g>
    <text x="270" y="142" fontSize="20" fontWeight="900">formiga</text>
  </svg>;

  if(index===3)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma moeda na palma de uma mão">
    <path d="M294 411c-32-88-40-151-21-188 14-27 38-15 50 5l-9-126c-2-32 40-36 45-4l13 103 5-142c1-32 44-32 45 2l8 139 17-117c5-31 47-25 43 8l-11 130 28-80c11-31 51-17 42 14l-37 147c-14 60-63 109-132 109Z" fill="#f3ad91" stroke="currentColor" strokeWidth="7" strokeLinejoin="round"/>
    <circle cx="395" cy="294" r="48" fill="#ffd45b" stroke="currentColor" strokeWidth="6"/>
    <text x="395" y="302" textAnchor="middle" fontSize="28" fontWeight="900">moeda</text>
  </svg>;

  if(index===4)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma pessoa com a mão destacada">
    <circle cx="410" cy="92" r="48" fill="currentColor"/>
    <path d="M330 178c20-35 140-35 160 0l30 120-55 8-18-87v197h-72V270l-24 146h-73l35-205-58 91-49-33 96-91Z" fill="currentColor"/>
    <circle cx="312" cy="208" r="17" fill="#f3ad91" stroke="#fffdf8" strokeWidth="4"/>
    <path d="M280 205h-80" stroke="currentColor" strokeWidth="3"/><text x="188" y="211" textAnchor="end" fontSize="20" fontWeight="900">mão</text>
  </svg>;

  if(index===5)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma pessoa ao lado de um ônibus">
    <rect x="165" y="145" width="510" height="220" rx="38" fill="#ffd45b" stroke="currentColor" strokeWidth="7"/>
    <path d="M205 185h300v95H205zM530 185h105v95H530z" fill="#fffdf8" stroke="currentColor" strokeWidth="5"/>
    <circle cx="270" cy="365" r="42" fill="currentColor"/><circle cx="570" cy="365" r="42" fill="currentColor"/>
    <g transform="translate(68 228) scale(.52)" fill="currentColor"><circle cx="70" cy="35" r="28"/><path d="M35 82h70l15 120H88v115H52V202H20Z"/></g>
    <text x="70" y="420" fontSize="18" fontWeight="900">pessoa</text>
  </svg>;

  if(index===6)return <svg viewBox="0 0 800 460" role="img" aria-label="Um ônibus ao lado de uma sequoia">
    <path d="M470 432c-12-139-7-228 16-328l58 2c22 107 28 196 13 326Z" fill="#7b4d32" stroke="currentColor" strokeWidth="6"/>
    <g fill="#28501e" stroke="currentColor" strokeWidth="5">
      <circle cx="515" cy="92" r="82"/><circle cx="438" cy="142" r="71"/><circle cx="592" cy="151" r="75"/><circle cx="488" cy="196" r="84"/><circle cx="568" cy="211" r="76"/>
    </g>
    <g transform="translate(70 324) scale(.36)">
      <rect x="0" y="0" width="510" height="220" rx="38" fill="#ffd45b" stroke="currentColor" strokeWidth="12"/>
      <circle cx="105" cy="220" r="42" fill="currentColor"/><circle cx="405" cy="220" r="42" fill="currentColor"/>
    </g>
    <text x="72" y="300" fontSize="18" fontWeight="900">ônibus</text>
  </svg>;

  if(index===7)return <svg viewBox="0 0 800 460" role="img" aria-label="Uma sequoia diante do Everest">
    <path d="M30 420 310 105l88 92 105-150 267 373Z" fill="#d9e7ef" stroke="currentColor" strokeWidth="7" strokeLinejoin="round"/>
    <path d="m310 105 88 92 105-150 90 126-55-26-35 38-48-29-57 41-52-35Z" fill="#fffdf8"/>
    <g transform="translate(86 360) scale(.19)">
      <path d="M120 300 145 40h54l25 260Z" fill="#7b4d32" stroke="currentColor" strokeWidth="14"/>
      <circle cx="170" cy="40" r="85" fill="#28501e"/><circle cx="110" cy="110" r="65" fill="#28501e"/><circle cx="225" cy="110" r="65" fill="#28501e"/>
    </g>
    <text x="48" y="406" fontSize="18" fontWeight="900">sequoia</text>
  </svg>;

  return <svg viewBox="0 0 800 460" role="img" aria-label="O Everest comparado ao planeta Terra">
    <circle cx="425" cy="230" r="192" fill="#7f84d8" stroke="currentColor" strokeWidth="7"/>
    <path d="M250 178c66-66 118-47 158-7 45 45 93 27 142-16 34 61 56 126 48 194-80 58-262 71-352-4-19-64-8-117 54-167Z" fill="#9edc9a" stroke="currentColor" strokeWidth="5"/>
    <path d="M595 109l18 18-12 20" fill="none" stroke="#fffdf8" strokeWidth="4"/>
    <circle cx="602" cy="120" r="7" fill="#fffdf8"/>
    <path d="M604 115 663 78" stroke="#fffdf8" strokeWidth="3"/>
    <text x="674" y="80" fontSize="20" fontWeight="900" fill="#fffdf8">Everest</text>
  </svg>;
}

export function ScaleExplorer(){
  const [index,setIndex]=useState(0);
  const item=steps[index];
  const previous=steps[Math.max(0,index-1)];

  return <div className="scale-v3">
    <section className="scale-v3-stage">
      <header>
        <div><span>{String(index+1).padStart(2,"0")} / {String(steps.length).padStart(2,"0")}</span><h2>{item.name}</h2><strong>{item.size}</strong></div>
        {index>0&&<div className="scale-ratio"><small>comparado com {previous.name}</small><b>{item.ratio}</b></div>}
      </header>

      <div className="scale-scene"><ScaleScene index={index}/></div>
      <p className="scale-note">{item.note}</p>

      <div className="scale-v3-actions">
        <button onClick={()=>setIndex(v=>Math.max(0,v-1))} disabled={index===0}>← voltar</button>
        {index<steps.length-1?<button className="scale-next" onClick={()=>setIndex(v=>Math.min(steps.length-1,v+1))}>{item.next} →</button>:<button className="scale-next" onClick={()=>setIndex(0)}>começar de novo ↺</button>}
      </div>
    </section>

    <div className="scale-v3-track">
      {steps.map((step,i)=><button key={step.name} className={i===index?"active":i<index?"seen":""} onClick={()=>setIndex(i)} aria-label={`Ir para ${step.name}`}><i/><span>{step.name}</span></button>)}
    </div>

    <section className="scale-v3-ending">
      <span>1 mm → 12.742 km</span>
      <h2>O segredo não é aumentar o círculo. É não perder a referência.</h2>
      <p>Quando conseguimos manter uma coisa conhecida dentro da próxima escala, números enormes começam a ganhar forma.</p>
    </section>
  </div>;
}
