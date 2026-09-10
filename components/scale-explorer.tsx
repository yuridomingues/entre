"use client";
import { useState } from "react";

const items=[
  {name:"grão de areia",size:"1 mm",note:"cabe na ponta do dedo",visual:7},
  {name:"formiga",size:"5 mm",note:"alguns passos já viram centímetros",visual:12},
  {name:"moeda",size:"2,5 cm",note:"agora o grão quase desaparece",visual:20},
  {name:"mão",size:"18 cm",note:"uma escala que o corpo reconhece",visual:31},
  {name:"pessoa",size:"1,7 m",note:"o metro começa a fazer sentido",visual:43},
  {name:"ônibus",size:"12 m",note:"uma pessoa vira detalhe",visual:56},
  {name:"sequoia",size:"80 m",note:"um prédio cabe na comparação",visual:69},
  {name:"Everest",size:"8,8 km",note:"árvores somem na montanha",visual:82},
  {name:"Terra",size:"12.742 km",note:"a montanha vira uma pequena rugosidade",visual:96}
];

export function ScaleExplorer(){
  const [index,setIndex]=useState(3);
  const item=items[index];

  return <div className="scale-explorer">
    <section className="scale-stage">
      <div className="scale-copy"><span>escala {index+1} de {items.length}</span><h2>{item.name}</h2><strong>{item.size}</strong><p>{item.note}</p></div>
      <div className="scale-orbit" aria-hidden="true"><i style={{width:`${item.visual}%`,height:`${item.visual}%`}}/><b>{item.name}</b></div>
    </section>
    <div className="scale-control">
      <label htmlFor="scale-range">arraste para aumentar a régua</label>
      <input id="scale-range" type="range" min="0" max={items.length-1} value={index} onChange={e=>setIndex(Number(e.target.value))}/>
      <div><span>1 mm</span><span>12.742 km</span></div>
    </div>
    <p className="scale-ending">Grande e pequeno não são propriedades soltas. Quase sempre são comparações.</p>
  </div>
}
