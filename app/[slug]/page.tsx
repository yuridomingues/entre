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
  arvore:"Role por 526 anos enquanto uma árvore cresce e o mundo humano muda ao redor dela. O objetivo é sentir escala antes de falar sobre ela.",
  mente:"Faça três testes rápidos de atenção, mudança e memória. Não existe pontuação: a graça é perceber onde a própria percepção deixa lacunas.",
  musica:"Ligue o áudio, desligue camadas e compare formas de onda. O som é criado no próprio navegador para você ouvir a estrutura mudar em tempo real.",
  conversa:"Você não vai responder nada pessoal. Só escolha as perguntas que faria e observe como assunto, contexto e confiança mudam o tipo de conversa.",
  vida:"Anos são grandes demais para a intuição. Troque a unidade por semanas e veja a escala mudar — sem transformar o tempo numa meta de produtividade."
};
const components: Record<string, React.ReactNode> = {
  arvore:<TreeTimeline/>, mente:<MindLab/>, musica:<MusicLab/>, conversa:<ConversationDive/>, vida:<LifeWeeks/>
};
export function generateStaticParams(){return experiments.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
  const {slug}=await params; const exp=getExperiment(slug); if(!exp)return {};
  return {title:exp.title,description:exp.description};
}
export default async function Page({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const exp=getExperiment(slug); if(!exp)notFound();
  return <ExperimentShell slug={slug} title={exp.title} intro={intros[slug]}>{components[slug]}</ExperimentShell>
}
