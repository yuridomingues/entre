"use client";
const routes=["/arvore","/mente","/musica","/conversa","/vida"];

export function SurpriseButton(){
  const go=()=>{
    const route=routes[Math.floor(Math.random()*routes.length)];
    window.location.href=route;
  };
  return <button className="surprise-button" onClick={go}>me surpreenda ↗</button>;
}
