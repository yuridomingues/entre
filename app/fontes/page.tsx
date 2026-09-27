import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";
import { publicExperiments } from "@/lib/experiments";

export const metadata: Metadata = { title: "Fontes", description: "Referências usadas nas experiências do ENTRE." };

const notes: Record<string, { text: string; href?: string; label?: string }> = {
  arvore: { text: "A árvore de 1500 é imaginária: as estações passam por uma faia parada enquanto Copérnico, Newton, Darwin e você ficam ao pé dela pelo tempo de uma vida, e os anéis do final vêm da ideia de usar uma árvore como régua de tempo. Os desenhos da faia e da silhueta são de Pearson Scott Foresman, em domínio público.", href: "https://www.usgs.gov/media/images/tree-ring-illustration", label: "U.S. Geological Survey" },
  mente: { text: "As imagens usam ilusões clássicas de tamanho, comprimento e contraste. A primeira permite alterar apenas o contexto externo mantendo os centros iguais." },
  musica: { text: "O som é sintetizado na hora dentro da própria página. Nenhuma gravação é usada." },
  conversa: { text: "A conversa é fictícia e existe para mostrar como detalhes diferentes abrem assuntos diferentes." },
  vida: { text: "Semanas aparecem como unidade visual para deixar alguns anos menos abstratos." },
  escala: { text: "Os tamanhos são aproximados e a rolagem mantém a escala verdadeira entre pulga, joaninha, camundongo, pessoa, ônibus, pinheiro, pirâmide de Gizé, monte Everest, Grande São Paulo, furacão, Lua e Terra; os desenhos são da Pearson Scott Foresman e as fotos de São Paulo à noite (ISS), do furacão Isabel (MODIS), da Lua (LRO) e da Terra (Apollo 17) são da NASA, todos em domínio público via Wikimedia Commons.", href: "https://commons.wikimedia.org/wiki/Category:PD-ScottForesman", label: "Wikimedia Commons" },
  acaso: { text: "Cada passo escolhe entre dois lados com a mesma chance. Repetir a experiência produz desenhos diferentes." },
  noite: { text: "A experiência simplifica um efeito real: luz artificial no céu reduz o contraste e dificulta enxergar estrelas mais fracas." },
  mudanca: { text: "As duas trajetórias usam a mesma recorrência logística em um regime caótico. Uma pequena diferença inicial pode crescer com as iterações sem que exista aleatoriedade na regra." },
  aleatorio: { text: "Humanos costumam introduzir regularidades ao tentar produzir sequências aleatórias, incluindo evitar repetições que parecem “pouco aleatórias”. A comparação da página é ilustrativa.", href: "https://pubmed.ncbi.nlm.nih.gov/37681229/", label: "estudo sobre geração humana de sequências" },
  perguntas: { text: "A experiência usa uma versão simples de ganho de informação: perguntas que dividem melhor as possibilidades tendem a reduzir mais a incerteza." },
  minuto: { text: "Não é um teste psicológico. Ele apenas contrasta um intervalo medido pelo navegador com uma estimativa subjetiva feita sem contador visível." },
  stroop: { text: "Inspirado na tarefa de Stroop: nomear a cor pode sofrer interferência quando a palavra escrita indica uma cor incompatível.", href: "https://pubmed.ncbi.nlm.nih.gov/7302571/", label: "PubMed: Stroop effect" }
};

export default function Sources() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><BrandLogo compact/><Link href="/">← início</Link></header>
    <article>
      <p className="info-kicker">fontes</p>
      <h1>De onde vieram <em>as ideias.</em></h1>
      <p className="info-lead">Algumas experiências usam conceitos conhecidos de ciência, percepção, linguagem e matemática. Aqui ficam as referências e as simplificações principais.</p>
      <div className="credits-box">
        <p><strong>Ilustrações e colagens.</strong> A linguagem visual usa recortes de gravuras e ilustrações históricas, principalmente do Old Book Illustrations, com composição própria em papel, fita, halftone e recortes. O site do OBI não limita o uso das ilustrações e sinaliza obras que considera provavelmente em domínio público; os trabalhos usados aqui são antigos e cada página mantém a referência de origem. A pesquisa visual também passou pela Heritage Library, da Heritage Type Co., que oferece bundles vintage gratuitos para projetos criativos, e pelas coleções públicas da NYPL.</p>
        <p><a href="https://www.oldbookillustrations.com/" target="_blank" rel="noreferrer">Old Book Illustrations ↗</a> · <a href="https://www.heritagetype.com/pages/free-vintage-illustrations" target="_blank" rel="noreferrer">Heritage Library ↗</a> · <a href="https://digitalcollections.nypl.org/" target="_blank" rel="noreferrer">NYPL Digital Collections ↗</a></p>
      </div>
      <div className="sources-list">
        {publicExperiments().map((exp) => {
          const note = notes[exp.slug];
          return <section key={exp.slug}><span>{exp.number}</span><div><h2><Link href={"/" + exp.slug}>{exp.title}</Link></h2>{note && <p>{note.text}</p>}{note?.href && <a href={note.href} target="_blank" rel="noreferrer">{note.label} ↗</a>}</div></section>;
        })}
      </div>
    </article>
  </main>;
}
