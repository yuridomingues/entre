"use client";
import { useEffect, useRef, useState } from "react";
type Layer="pulse"|"bass"|"harmony"|"spark";
const initialLayers: Record<Layer, boolean> = {pulse:true,bass:true,harmony:true,spark:true};
export function MusicLab(){
 const ctx=useRef<AudioContext|null>(null),timer=useRef<ReturnType<typeof setInterval>|null>(null);
 const [playing,setPlaying]=useState(false); const [layers,setLayers]=useState(initialLayers); const [wave,setWave]=useState<OscillatorType>("sine");
 const layersRef=useRef(layers),waveRef=useRef(wave);
 useEffect(()=>{layersRef.current=layers},[layers]); useEffect(()=>{waveRef.current=wave},[wave]);
 const stop=()=>{if(timer.current)clearInterval(timer.current);timer.current=null;setPlaying(false)};
 useEffect(()=>()=>{if(timer.current)clearInterval(timer.current);ctx.current?.close()},[]);
 const tone=(freq:number,dur=.16,vol=.035,type:OscillatorType=waveRef.current)=>{if(!ctx.current)return;const c=ctx.current,o=c.createOscillator(),g=c.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(vol,c.currentTime);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+dur);o.connect(g).connect(c.destination);o.start();o.stop(c.currentTime+dur)};
 const tick=()=>{const l=layersRef.current;if(l.pulse)tone(110,.08,.018,"sine");if(l.bass)tone(146.83,.32,.028,"triangle");if(l.harmony){tone(293.66,.45,.018);tone(369.99,.45,.014);tone(440,.45,.012)}if(l.spark)tone([587.33,659.25,739.99,880][Math.floor(Math.random()*4)],.12,.012,waveRef.current)};
 const start=async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tick();timer.current=setInterval(tick,620);setPlaying(true)};
 const toggle=(k:Layer)=>setLayers(v=>({...v,[k]:!v[k]}));
 return <div className="music-lab">
  <section className="sound-console">
   <div className="now-playing"><span className={playing?"pulse-dot active":"pulse-dot"}/><div><small>composição generativa</small><strong>{playing?"tocando":"em silêncio"}</strong></div></div>
   <button className="play-button" onClick={playing?stop:start}>{playing?"■ parar":"▶ ouvir"}</button>
   <div className="equalizer" aria-hidden="true">{Array.from({length:20}).map((_,i)=><i key={i} style={{height:playing?`${25+(i*37)%72}%`:"8%"}}/>)}</div>
  </section>
  <section className="mixer"><h2>Tire uma camada.</h2><p>Uma música pode ser percebida como um objeto único, mas é feita de eventos simultâneos.</p>
   {([['pulse','pulso','organiza o tempo'],['bass','baixo','dá chão e referência'],['harmony','harmonia','empilha frequências'],['spark','melodia','cria movimento']] as [Layer,string,string][]).map(([k,n,d])=><button key={k} onClick={()=>toggle(k)} className={layers[k]?"track on":"track"}><span>{layers[k]?"●":"○"}</span><strong>{n}</strong><small>{d}</small></button>)}
  </section>
  <section className="wave-lab"><div><p className="overline">timbre</p><h2>A mesma nota pode ter corpos diferentes.</h2><p>Escolha uma forma de onda e toque Lá4 (440 Hz). A frequência fundamental continua a mesma; muda a distribuição de harmônicos e, com ela, a textura que percebemos.</p></div><div className="wave-controls"><select value={wave} onChange={e=>setWave(e.target.value as OscillatorType)} aria-label="Forma de onda"><option value="sine">senoidal — pura</option><option value="triangle">triangular — macia</option><option value="square">quadrada — áspera</option><option value="sawtooth">dente de serra — brilhante</option></select><button className="pill-button" onClick={async()=>{ctx.current??=new AudioContext();await ctx.current.resume();tone(440,.8,.05,wave)}}>ouvir 440 Hz</button></div></section>
  <aside className="source-note">O áudio é sintetizado localmente com Web Audio API; nenhuma música gravada é enviada ou utilizada.</aside>
 </div>
}
