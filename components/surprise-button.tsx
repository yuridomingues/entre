"use client";
import { experiments } from "@/lib/experiments";

export function SurpriseButton(){
  const go=()=>{
    const choices=experiments.map(item=>`/${item.slug}`);
    window.location.href=choices[Math.floor(Math.random()*choices.length)];
  };
  return <button className="surprise-button" onClick={go}>me surpreenda ↗</button>;
}
