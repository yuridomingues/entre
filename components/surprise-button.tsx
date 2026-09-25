"use client";
import { publicSlugs } from "@/lib/experiments";

export function SurpriseButton(){
  const go=()=>{
    const choices=publicSlugs.map(slug=>"/"+slug);
    window.location.href=choices[Math.floor(Math.random()*choices.length)];
  };
  return <button className="surprise-button" onClick={go}>me surpreenda ↗</button>;
}
