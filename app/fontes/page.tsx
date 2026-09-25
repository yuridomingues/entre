import Link from "next/link";
import type { Metadata } from "next";
import { BrandLogo } from "@/components/brand-logo";

export const metadata: Metadata = { title: "Fontes", description: "Referências usadas nas experiências do ENTRE." };

export default function Sources() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><BrandLogo compact/><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">fontes</p>
      <h1>De onde vieram <em>as ideias.</em></h1>
      <p className="info-lead">Algumas experiências usam conceitos conhecidos de ciência, percepção, linguagem e matemática. Aqui ficam as referências e as simplificações principais.</p>
      <div className="credits-box">
        <p><strong>Ilustrações e colagens.</strong> A linguagem visual usa recortes de gravuras e ilustrações históricas, principalmente do Old Book Illustrations, com composição própria em papel, fita, halftone e recortes. O site do OBI não limita o uso das ilustrações e sinaliza obras que considera provavelmente em domínio público; os trabalhos usados aqui são antigos e cada página mantém a referência de origem. A pesquisa visual também passou pela Heritage Library, da Heritage Type Co., que oferece bundles vintage gratuitos para projetos criativos, e pelas coleções públicas da NYPL.</p>
        <p><a href="https://www.oldbookillustrations.com/" target="_blank" rel="noreferrer">Old Book Illustrations ↗</a> · <a href="https://www.heritagetype.com/pages/free-vintage-illustrations" target="_blank" rel="noreferrer">Heritage Library ↗</a> · <a href="https://digitalcollections.nypl.org/" target="_blank" rel="noreferrer">NYPL Digital Collections ↗</a></p>
      </div>
      <div className="sources-list">
        <section><span>01</span><div><h2>A árvore que viu tudo</h2><p>A árvore de 1500 é imaginária. Os anéis de crescimento inspiram a ideia de usar uma árvore como régua de tempo.</p><a href="https://www.usgs.gov/media/images/tree-ring-illustration" target="_blank" rel="noreferrer">U.S. Geological Survey ↗</a></div></section>
        <section><span>02</span><div><h2>O mundo que seu cérebro inventa</h2><p>As imagens usam ilusões clássicas de tamanho, comprimento e contraste. A primeira permite alterar apenas o contexto externo mantendo os centros iguais.</p></div></section>
        <section><span>03</span><div><h2>Anatomia de uma música</h2><p>O som é sintetizado na hora dentro da própria página. Nenhuma gravação é usada.</p></div></section>
        <section><span>04</span><div><h2>Por onde uma conversa vai?</h2><p>A conversa é fictícia e existe para mostrar como detalhes diferentes abrem assuntos diferentes.</p></div></section>
        <section><span>05</span><div><h2>Quanto cabe em uma vida?</h2><p>Semanas aparecem como unidade visual para deixar alguns anos menos abstratos.</p></div></section>
        <section><span>06</span><div><h2>Do grão ao planeta</h2><p>Os tamanhos são aproximados. A rolagem mantém a escala verdadeira entre uma pulga, uma joaninha, um denário, uma figura, uma locomotiva, um carvalho, um monte e Saturno. As gravuras são do Old Book Illustrations.</p></div></section>
        <section><span>07</span><div><h2>Onde o acaso vai parar?</h2><p>Cada passo escolhe entre dois lados com a mesma chance. Repetir a experiência produz desenhos diferentes.</p></div></section>
        <section><span>08</span><div><h2>Apague a cidade</h2><p>A experiência simplifica um efeito real: luz artificial no céu reduz o contraste e dificulta enxergar estrelas mais fracas.</p></div></section>
        <section><span>09</span><div><h2>Até onde uma pequena mudança consegue chegar?</h2><p>As duas trajetórias usam a mesma recorrência logística em um regime caótico. Uma pequena diferença inicial pode crescer com as iterações sem que exista aleatoriedade na regra.</p></div></section>
        <section><span>10</span><div><h2>Tente ser aleatório</h2><p>Humanos costumam introduzir regularidades ao tentar produzir sequências aleatórias, incluindo evitar repetições que parecem “pouco aleatórias”. A comparação da página é ilustrativa.</p><a href="https://pubmed.ncbi.nlm.nih.gov/37681229/" target="_blank" rel="noreferrer">estudo sobre geração humana de sequências ↗</a></div></section>
        <section><span>11</span><div><h2>Qual pergunta vale mais?</h2><p>A experiência usa uma versão simples de ganho de informação: perguntas que dividem melhor as possibilidades tendem a reduzir mais a incerteza.</p></div></section>
        <section><span>12</span><div><h2>Quanto dura um intervalo?</h2><p>Não é um teste psicológico. Ele apenas contrasta um intervalo medido pelo navegador com uma estimativa subjetiva feita sem contador visível.</p></div></section>
        <section><span>13</span><div><h2>Leia menos. Veja mais.</h2><p>Inspirado na tarefa de Stroop: nomear a cor pode sofrer interferência quando a palavra escrita indica uma cor incompatível.</p><a href="https://pubmed.ncbi.nlm.nih.gov/7302571/" target="_blank" rel="noreferrer">PubMed: Stroop effect ↗</a></div></section>
      </div>
    </article>
  </main>;
}
