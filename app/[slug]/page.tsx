import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { MindLab, MusicLab, ConversationDive, LifeWeeks, RandomWalk, NightSky } from "@/components/interactive-experiences";
import { TreeExperience } from "@/components/tree-experience";
import { ScaleExplorer } from "@/components/scale-visual-experience";
import { IdeaSpread, WhereIsCenter } from "@/components/social-experiences";
import { getExperiment, experiments } from "@/lib/experiments";

const intros: Record<string,string> = {
  arvore:"Uma mesma árvore. 526 anos. Role.",
  mente:"Três imagens. Responda antes de revelar.",
  musica:"Ouça tudo. Depois tire uma camada.",
  conversa:"Uma frase. Você escolhe o detalhe que a conversa segue.",
  vida:"Troque anos por semanas e veja o tempo mudar de forma.",
  escala:"Cada etapa coloca duas referências na mesma régua. Compare antes de olhar o número.",
  acaso:"Todos começam juntos. Depois, cada ponto escolhe um lado várias vezes.",
  noite:"A cidade está acesa. Apague-a devagar.",
  rede:"Escolha onde uma ideia começa. Depois mude a regra e veja até onde ela consegue ir.",
  centro:"Escolha primeiro. Depois descubra como três regras diferentes movem o melhor ponto."
};

const components: Record<string, React.ReactNode> = {
  arvore:<TreeExperience/>, mente:<MindLab/>, musica:<MusicLab/>, conversa:<ConversationDive/>, vida:<LifeWeeks/>,
  escala:<ScaleExplorer/>, acaso:<RandomWalk/>, noite:<NightSky/>, rede:<IdeaSpread/>, centro:<WhereIsCenter/>
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
