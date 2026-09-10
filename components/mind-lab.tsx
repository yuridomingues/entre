"use client";
import { useState } from "react";
const words=["VERDE","AZUL","ROXO","VERDE","ROXO","AZUL"];
const sequence=[2,7,4,9,1,6,3,8];

export function MindLab(){
 const [stage,setStage]=useState(0); const [stroopDone,setStroopDone]=useState(false);
 const [flipped,setFlipped]=useState(false); const [answer,setAnswer]=useState<string|null>(null);
 const [memoryHidden,setMemoryHidden]=useState(false); const [memoryAnswer,setMemoryAnswer]=useState<number|null>(null);

 return <div className="mind-lab">
  <div className="lab-progress" aria-label={`Etapa ${stage+1} de 3`}><span>{stage+1} / 3</span><div><i style={{width:`${((stage+1)/3)*100}%`}}/></div><strong>{["atenção","mudança","memória"][stage]}</strong></div>

  {stage===0&&<section className="lab-panel">
    <p className="step-label">teste 1 · atenção</p><h2>Leia a cor, não a palavra.</h2>
    <p className="instruction">Diga em voz baixa a <strong>cor da tinta</strong> de cada palavra, da esquerda para a direita.</p>
    <div className="stroop-grid" aria-label="Palavras escritas com cores conflitantes">{words.map((w,i)=><b key={i} className={`ink-${i%3}`}>{w}</b>)}</div>
    {!stroopDone?<button className="pill-button" onClick={()=>setStroopDone(true)}>terminei</button>:<div className="feedback-box"><strong>Por que isso pode travar?</strong><p>Ler palavras é muito automático para leitores experientes. O significado da palavra pode competir com a tarefa de nomear a tinta — uma versão recreativa do efeito Stroop.</p><button className="text-button" onClick={()=>setStage(1)}>ir para o teste 2 →</button></div>}
  </section>}

  {stage===1&&<section className="lab-panel">
    <p className="step-label">teste 2 · mudança</p><h2>O que mudou?</h2>
    <p className="instruction">Olhe a cena. Quando estiver pronto, mude-a uma vez e tente encontrar a diferença.</p>
    <div className={`change-scene ${flipped?"changed":""}`} aria-label="Cena geométrica com quatro formas e uma pequena folha"><span>◯</span><span>△</span><span>□</span><span>◇</span><i className="little-leaf">❧</i></div>
    {!flipped?<button className="pill-button" onClick={()=>setFlipped(true)}>mudar a cena</button>:<>
      <div className="answer-row" aria-label="Escolha sua resposta"><button onClick={()=>setAnswer("shape")}>uma forma mudou</button><button onClick={()=>setAnswer("leaf")}>a folha mudou</button><button onClick={()=>setAnswer("position")}>todo o conjunto moveu</button></div>
      {answer&&<div className={`feedback-box ${answer==="leaf"?"feedback-correct":""}`}><strong>{answer==="leaf"?"Você encontrou.":"A mudança estava na folha."}</strong><p>Ela trocou de lado. Mudanças visíveis podem passar despercebidas quando a atenção está distribuída pela cena — um exemplo simples de cegueira à mudança.</p><button className="text-button" onClick={()=>setStage(2)}>ir para o teste 3 →</button></div>}
    </>}
  </section>}

  {stage===2&&<section className="lab-panel">
    <p className="step-label">teste 3 · memória</p><h2>Segure oito números por alguns segundos.</h2>
    {!memoryHidden?<><p className="instruction">Memorize a ordem. Depois esconda a sequência.</p><div className="number-cloud">{sequence.map((n,i)=><span key={i}>{n}</span>)}</div><button className="pill-button" onClick={()=>setMemoryHidden(true)}>memorizei — esconder</button></>:<>
      <p className="instruction">Qual era o <strong>terceiro</strong> número?</p><div className="memory-options">{[7,4,9].map(n=><button key={n} onClick={()=>setMemoryAnswer(n)}>{n}</button>)}</div>
      {memoryAnswer&&<div className={`feedback-box ${memoryAnswer===4?"feedback-correct":""}`}><strong>{memoryAnswer===4?"Isso. Era 4.":"Era 4."}</strong><p>Memória de trabalho é limitada e sensível à distração. O ponto não é pontuar: é sentir a diferença entre “acabei de ver” e “consigo manter disponível”.</p></div>}
    </>}
    <div className="lab-explanation"><h2>Perceber é selecionar.</h2><p>Olhos e ouvidos recebem muito mais informação do que conseguimos manter em foco ao mesmo tempo. Atenção e memória ajudam a construir uma versão útil do que está acontecendo.</p><p className="source-note">Experiência educativa. Não mede inteligência, memória clínica ou qualquer característica pessoal.</p></div>
  </section>}
 </div>
}
