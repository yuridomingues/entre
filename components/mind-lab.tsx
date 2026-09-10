"use client";
import { useMemo, useState } from "react";
const words=["VERDE","AZUL","ROXO","VERDE","ROXO","AZUL"];
export function MindLab(){
 const [stage,setStage]=useState(0),[answer,setAnswer]=useState<string|null>(null),[flipped,setFlipped]=useState(false),[memory,setMemory]=useState(false);
 const dots=useMemo(()=>[2,7,4,9,1,6,3,8],[]);
 return <div className="mind-lab">
  <nav className="lab-progress" aria-label="Progresso"><span className={stage>=0?"on":""}>atenção</span><span className={stage>=1?"on":""}>mudança</span><span className={stage>=2?"on":""}>memória</span></nav>
  {stage===0&&<section className="lab-panel">
    <p className="instruction">Diga em voz baixa a <strong>cor da tinta</strong>, não a palavra.</p>
    <div className="stroop-grid" aria-label="Palavras coloridas">{words.map((w,i)=><b key={i} className={`ink-${i%3}`}>{w}</b>)}</div>
    <button className="pill-button" onClick={()=>setStage(1)}>pronto, próximo →</button>
    <details><summary>o que aconteceu aqui?</summary><p>Quando leitura é automática, o significado da palavra compete com a tarefa de nomear a tinta. É uma versão recreativa do efeito Stroop — não é teste clínico nem mede inteligência.</p></details>
  </section>}
  {stage===1&&<section className="lab-panel">
    <p className="instruction">Olhe por alguns segundos. Depois aperte o botão e tente notar o que mudou.</p>
    <div className={`change-scene ${flipped?"changed":""}`}><span>◯</span><span>△</span><span>□</span><span>◇</span><i className="little-leaf">❧</i></div>
    <button className="pill-button" onClick={()=>setFlipped(v=>!v)}>{flipped?"voltar":"mudar a cena"}</button>
    <div className="answer-row"><button onClick={()=>setAnswer("shape")}>uma forma</button><button onClick={()=>setAnswer("leaf")}>a folha</button><button onClick={()=>setAnswer("position")}>a posição</button></div>
    {answer&&<p className="reveal">A folha mudou de lado. Mudanças podem passar despercebidas quando nossa atenção está comprometida com a cena como um todo — um exemplo simples de <strong>cegueira à mudança</strong>.</p>}
    <button className="text-button" onClick={()=>setStage(2)}>seguir para memória →</button>
  </section>}
  {stage===2&&<section className="lab-panel">
    <p className="instruction">Memorize esta sequência por alguns segundos.</p>
    {!memory?<><div className="number-cloud">{dots.map(n=><span key={n}>{n}</span>)}</div><button className="pill-button" onClick={()=>setMemory(true)}>esconder</button></>:<><div className="memory-blank">?</div><p>Consegue reconstruir a ordem inteira sem olhar?</p><button className="pill-button" onClick={()=>setMemory(false)}>mostrar de novo</button></>}
    <div className="lab-explanation"><h2>Percepção é uma negociação.</h2><p>Atenção tem limites; memória de trabalho também. O cérebro prioriza sinais úteis em vez de produzir uma gravação perfeita do ambiente.</p><p className="source-note">Essas demonstrações são educativas, não diagnósticas. Conceitos: efeito Stroop, cegueira à mudança e memória de trabalho.</p></div>
  </section>}
 </div>
}
