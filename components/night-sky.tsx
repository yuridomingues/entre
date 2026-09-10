"use client";
import { useMemo, useState } from "react";

export function NightSky(){
  const [light,setLight]=useState(82);
  const stars=useMemo(()=>Array.from({length:88},(_,i)=>({
    left:(i*47)%97,
    top:4+((i*71)%62),
    size:1+(i%4),
    threshold:(i*31)%100
  })),[]);
  const darkness=100-light;

  return <div className="night-lab">
    <section className="night-stage" style={{background:`rgb(${12+light*.55},${18+light*.48},${42+light*.42})`}}>
      <div className="stars" aria-hidden="true">{stars.map((star,i)=><i key={i} style={{left:`${star.left}%`,top:`${star.top}%`,width:star.size,height:star.size,opacity:darkness>star.threshold?1:.05}}/>)}</div>
      <div className="night-title"><span>luz da cidade {light}%</span><h2>{light>65?"o céu parece quase vazio":light>30?"algumas estrelas voltam":"o céu estava cheio o tempo todo"}</h2></div>
      <div className="skyline" aria-hidden="true">{[38,55,31,68,44,60,35,73,48,57,40].map((h,i)=><b key={i} style={{height:`${h}%`}}><em style={{opacity:light/100}}/></b>)}</div>
    </section>
    <div className="night-control"><label htmlFor="city-light">luzes da cidade</label><input id="city-light" type="range" min="0" max="100" value={light} onChange={e=>setLight(Number(e.target.value))}/><div><span>apagadas</span><span>acesas</span></div></div>
    <p className="night-ending">As estrelas não aparecem porque ficaram mais brilhantes. O fundo ficou menos claro.</p>
  </div>
}
