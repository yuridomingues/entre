"use client";
import { useState } from "react";
const levels=[
 {m:"0 m",name:"contato",q:["calor hoje, né?","como foi seu dia?"],idea:"Small talk pode sinalizar disponibilidade e abrir espaço para continuar — não precisa ser “profundo” para ter função."},
 {m:"20 m",name:"preferências",q:["que música você tem ouvido?","qual lugar você sempre gostaria de visitar de novo?"],idea:"Gostos são atalhos para histórias. Perguntas concretas costumam ser mais fáceis de responder do que perguntas enormes."},
 {m:"100 m",name:"histórias",q:["qual coisa você aprendeu tarde?","qual memória pequena ainda aparece do nada?"],idea:"Ao contar uma história, escolhemos começo, detalhes e significado. Narrar já é uma forma de organizar experiência."},
 {m:"300 m",name:"valores",q:["o que faz alguém ser uma boa pessoa?","o que você não gostaria de perder em si?"],idea:"Perguntas sobre valores revelam critérios que usamos para interpretar escolhas — mesmo quando duas pessoas chegam a respostas diferentes."},
 {m:"600 m",name:"sentido",q:["o que faz um dia valer a pena?","que pergunta você gostaria de saber responder melhor?"],idea:"Profundidade não exige confissão. Pode existir numa pergunta honesta e na disposição de escutar sem transformar tudo em conselho."}
];
export function ConversationDive(){
 const [level,setLevel]=useState(0),[chosen,setChosen]=useState<string[]>([]);
 const pick=(q:string)=>{setChosen(v=>[...v,q]);setLevel(l=>Math.min(levels.length-1,l+1))};
 const reset=()=>{setLevel(0);setChosen([])};
 return <div className="conversation-wrap">
  <div className="instruction-banner"><span>como usar</span><p>Você <strong>não precisa responder</strong> às perguntas. Só escolha qual delas faria numa conversa.</p></div>
  <div className="conversation-dive">
   <div className="depth-meter" aria-label={`Camada ${level+1} de ${levels.length}`}><span style={{height:`${(level+1)/levels.length*100}%`}}/><b>{levels[level].m}</b></div>
   <section className="conversation-stage"><p className="step-label">camada {level+1} de {levels.length} · {levels[level].name}</p><h2>Qual pergunta você faria?</h2><div className="question-pair">{levels[level].q.map(q=><button key={q} onClick={()=>pick(q)}>“{q}”<span>escolher →</span></button>)}</div><p className="concept-card">{levels[level].idea}</p>{level<levels.length-1?<small>Escolha uma para avançar. Não existe resposta certa.</small>:<div className="conversation-ending"><strong>Não existe “fundo”.</strong><p>Pessoas, contexto e confiança mudam. A mesma pergunta pode ser trivial em um momento e importante em outro.</p><button className="text-button" onClick={reset}>recomeçar a descida ↺</button></div>}</section>
   <aside className="conversation-log"><span>perguntas escolhidas</span>{chosen.length===0?<p>Sua trilha aparece aqui.</p>:chosen.map((q,i)=><p key={i}><b>{i+1}</b>{q}</p>)}</aside>
  </div>
 </div>
}
