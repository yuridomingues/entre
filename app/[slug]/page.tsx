import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { TreeTimeline } from "@/components/tree-timeline";
import { MindLab } from "@/components/mind-lab";
import { MusicLab } from "@/components/music-lab";
import { ConversationDive } from "@/components/conversation-dive";
import { LifeWeeks } from "@/components/life-weeks";
import { getExperiment, experiments } from "@/lib/experiments";

const intros: Record<string,string> = {
  arvore:"Imagine uma árvore que começou a crescer em 1500. Agora atravesse tudo o que aconteceu ao redor dela sem tirar os olhos do mesmo organismo.",
  mente:"Três imagens. Três perguntas simples. Em todas elas, o contexto consegue mudar o que parece óbvio.",
  musica:"Ligue o áudio, desligue camadas e compare formas de onda. O som muda na hora conforme você mexe.",
  conversa:"Uma pessoa diz uma única frase. Você escolhe qual palavra seguir e descobre para onde a conversa vai.",
  vida:"Anos são grandes demais para a intuição. Troque a unidade por semanas e veja a escala mudar sem transformar o tempo numa meta."
};

const components: Record<string, React.ReactNode> = {
  arvore:<TreeTimeline/>, mente:<MindLab/>, musica:<MusicLab/>, conversa:<ConversationDive/>, vida:<LifeWeeks/>
};

export function generateStaticParams(){return experiments.map(({slug})=>({slug}))}

export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params;
  const exp=getExperiment(slug);
  if(!exp)return {};
  return {title:exp.title,description:exp.description};
}

export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const exp=getExperiment(slug);
  if(!exp)notFound();
  return <ExperimentShell slug={slug} title={exp.title} intro={intros[slug]}>{components[slug]}</ExperimentShell>
}
