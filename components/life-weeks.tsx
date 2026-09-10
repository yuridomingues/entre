"use client";
import { useMemo, useState } from "react";
export function LifeWeeks(){
 const [years,setYears]=useState(5); const weeks=years*52; const dots=useMemo(()=>Array.from({length:520},(_,i)=>i),[]);
 return <div className="life-weeks">
  <section className="year-control"><p className="step-label">mexa na escala</p><h2><strong>{years}</strong> {years===1?"ano":"anos"} <span>≈ {weeks.toLocaleString("pt-BR")} semanas</span></h2><p>Arraste o controle ou escolha um atalho. Cada ponto abaixo representa uma semana.</p><input aria-label="Quantidade de anos" type="range" min="1" max="10" value={years} onChange={e=>setYears(Number(e.target.value))}/><div className="range-labels"><span>1 ano</span><span>10 anos</span></div><div className="quick-years">{[1,5,10].map(n=><button key={n} className={years===n?"active":""} onClick={()=>setYears(n)}>{n} {n===1?"ano":"anos"}</button>)}</div></section>
  <div className="weeks-readout"><strong aria-live="polite">{weeks}</strong><span>pontos preenchidos</span></div>
  <div className="weeks-grid" aria-label={`${weeks} semanas representadas visualmente`}>{dots.map(i=><i key={i} className={i<weeks?"filled":""}/>)}</div>
  <section className="time-prompts"><article><span>52</span><h3>semanas fazem um ano parecer diferente.</h3><p>Uma unidade menor torna repetição e intervalo mais fáceis de enxergar.</p></article><article><span>igual</span><h3>no gráfico, diferente na experiência.</h3><p>Uma semana memorável e uma semana rotineira ocupam o mesmo ponto. Medir duração não mede significado.</p></article><article><span>sem meta</span><h3>isto não é uma planilha de produtividade.</h3><p>Descanso, espera, brincadeira, estudo, conversa e silêncio também são tempo vivido.</p></article></section>
  <blockquote className="life-quote">A pergunta não é “como preencher todos os pontos?”.<br/><strong>Que tipo de coisa merece virar tempo?</strong></blockquote>
 </div>
}
