"use client";
import { useEffect, useRef, useState } from "react";

type Layer="pulse"|"bass"|"harmony"|"spark";
const initialLayers: Record<Layer, boolean>={pulse:true,bass:true,harmony:true,spark:true};

export function MusicLab(){
 const ctx=useRef<AudioContext|null>(null),timer=useRef<ReturnType<typeof setInterval>|null>(null);
 const [playing,setPlaying]=useState(false),[layers,setLayers]=useState(initialLayers),[wave,setWave]=useState<OscillatorType>("sine");
 const layersRef=useRef(layers),waveRef=useRef(wave);

 useEffect(()=>{layersRef.current=layers},[layers]);
 useEffect(()=>{waveRef.current=wave},[wave]);

 const stop=()=>{if(timer.current)clearInterval(timer.current);timer.current=null;setPlaying(false)};
 useEffect(()=>()=>{if(timer.current)clearInterval(timer.current);ctx.current?.close()},[]);

 const tone=(freq:number,dur=.16,vol=.035,type:OscillatorType=waveRef.current)=>{
   if(!ctx.current)return;
   const c=ctx.current,o=c.createOscillator(),g=c.createGain();
   o.type=type;o.frequency.value=freq;
   g.gain.setValueAtTime(vol,c.currentTime);
   g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);
   o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur);
 };

 const tick=()=>{
   const l=layersRef.current;
   if(l.pulse)tone(110,.08,.018,"sine");
   if(l.bass)tone(146.83,.32,.028,"triangle");
   if(l.harmony){tone(293.66,.45,.018);tone(369.99,.45,.014);tone(440,.45,.012)}
   if(l.spark)tone([587.33,659.25,739.99,880][Math.floor(Math.random()*4)],.12,.012,waveRef.current);
 };

 const start=async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tick();timer.current=setInterval(tick,620);setPlaying(true)};
 const toggle=(k:Layer)=>setLayers(v=>({...v,[k]:!v[k]}));

 return <div className="music-lab">
  <div className="instruction-banner"><span>como usar</span><p><strong>1.</strong> ouça tudo junto <strong>2.</strong> desligue uma camada <strong>3.</strong> compare o que mudou</p></div>
  <section className="sound-console">
   <div className="now-playing"><span className={playing?"pulse-dot active":"pulse-dot"}/><div><small>composição</small><strong>{playing?"tocando":"em silêncio"}</strong></div></div>
   <button className="play-button" onClick={playing?stop:start} aria-pressed={playing}>{playing?"■ parar":"▶ ouvir composição"}</button>
   <div className="equalizer" aria-hidden="true">{Array.from({length:20}).map((_,i)=><i key={i} style={{height:playing?`${25+(i*37)%72}%`:"8%"}}/>)}</div>
  </section>
  <section className="mixer"><p className="step-label">parte 1 · camadas</p><h2>Uma música pode parecer uma coisa só.</h2><p>Desligue uma parte por vez e ouça o espaço que ela ocupava.</p>
   {([["pulse","pulso","marca a repetição"],["bass","baixo","dá uma referência grave"],["harmony","harmonia","empilha notas"],["spark","melodia","desenha movimento"]] as [Layer,string,string][]).map(([k,n,d])=><button key={k} onClick={()=>toggle(k)} className={layers[k]?"track on":"track"} aria-pressed={layers[k]}><span>{layers[k]?"ligada":"desligada"}</span><strong>{n}</strong><small>{d}</small></button>)}
  </section>
  <section className="wave-lab"><div><p className="step-label">parte 2 · timbre</p><h2>A mesma nota pode ter texturas diferentes.</h2><p>Escolha uma forma e toque a mesma nota. A altura continua igual, mas a textura muda.</p></div><div className="wave-controls"><label htmlFor="wave">forma do som</label><select id="wave" value={wave} onChange={e=>setWave(e.target.value as OscillatorType)}><option value="sine">senoidal, mais pura</option><option value="triangle">triangular, mais macia</option><option value="square">quadrada, mais áspera</option><option value="sawtooth">serrilhada, mais brilhante</option></select><button className="pill-button" onClick={async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tone(440,.8,.05,wave)}}>ouvir a mesma nota</button></div></section>
  <aside className="source-note">Todo o som é criado na hora. Nenhuma gravação é usada.</aside>
 </div>
}
