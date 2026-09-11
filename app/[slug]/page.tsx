import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ExperimentShell } from "@/components/experiment-shell";
import { TreeTimeline, MindLab, MusicLab, ConversationDive, LifeWeeks, RandomWalk, NightSky } from "@/components/interactive-experiences";\nimport { ScaleExplorer } from "@/components/scale-visual-experience";
import { getExperiment, experiments } from "@/lib/experiments";

const intros: Record<string,string> = {
  arvore:"Imagine uma árvore que começou a crescer em 1500. Continue rolando e use o mesmo organismo como régua enquanto cinco séculos passam.",
  mente:"Três imagens. Três perguntas simples. Em todas elas, o contexto muda o que parece óbvio.",
  musica:"Ligue o áudio, desligue camadas e compare formas. O som muda na hora conforme você mexe.",
  conversa:"Uma pessoa diz uma única frase. Você escolhe qual palavra seguir e descobre para onde a conversa vai.",
  vida:"Anos são grandes demais para a intuição. Troque a unidade por semanas e veja a escala mudar sem transformar o tempo numa meta.",
  escala:"Comece em um milímetro e aumente a régua até chegar ao planeta inteiro. A cada passo, a referência anterior encolhe.",
  acaso:"Todos os pontos começam juntos. Depois, cada um escolhe A ou B repetidas vezes. Veja o desenho que aparece.",
  noite:"A cidade está acesa. Diminua a luz e observe o que começa a aparecer acima dos prédios."
};

const components: Record<string, React.ReactNode> = {
  arvore:<TreeTimeline/>, mente:<MindLab/>, musica:<MusicLab/>, conversa:<ConversationDive/>, vida:<LifeWeeks/>,
  escala:<ScaleExplorer/>, acaso:<RandomWalk/>, noite:<NightSky/>
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
