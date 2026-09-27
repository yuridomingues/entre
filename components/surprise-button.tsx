"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { publicExperiments, type Experiment } from "@/lib/experiments";

export function SurpriseButton(){
  const router=useRouter();
  const [picked,setPicked]=useState<Experiment|null>(null);
  const go=()=>{
    const choices=publicExperiments();
    const choice=choices[Math.floor(Math.random()*choices.length)];
    setPicked(choice);
    router.push("/"+choice.slug);
  };
  return <button className="surprise-button" onClick={go} disabled={picked!==null} aria-live="polite">
    {picked?`abrindo ${picked.number} · ${picked.title}`:"me surpreenda →"}
  </button>;
}
