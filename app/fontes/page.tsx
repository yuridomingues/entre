import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Fontes", description: "Referências usadas nas experiências do ENTRE." };

export default function Sources() {
  return <main id="conteudo" className="info-page">
    <header className="info-nav"><Link href="/" className="mini-brand">ENTRE</Link><Link href="/">← voltar</Link></header>
    <article>
      <p className="info-kicker">fontes</p>
      <h1>De onde vieram <em>as ideias.</em></h1>
      <p className="info-lead">Algumas experiências usam conceitos conhecidos de ciência, percepção e música. Aqui ficam as referências principais.</p>
      <div className="sources-list">
        <section><span>01</span><div><h2>A árvore que viu tudo</h2><p>A árvore de 1500 é imaginária. Os anéis de crescimento e o estudo de árvores antigas inspiram a ideia de usar uma árvore como régua de tempo.</p><a href="https://www.usgs.gov/media/images/tree-ring-illustration" target="_blank" rel="noreferrer">U.S. Geological Survey ↗</a></div></section>
        <section><span>02</span><div><h2>O mundo que seu cérebro inventa</h2><p>As imagens usam ilusões clássicas de tamanho, comprimento e contraste. Elas mostram como contexto e comparação influenciam o que percebemos.</p></div></section>
        <section><span>03</span><div><h2>Anatomia de uma música</h2><p>O som é criado na hora dentro da própria página. Nenhuma gravação é usada.</p></div></section>
        <section><span>04</span><div><h2>Por onde uma conversa vai?</h2><p>A experiência usa uma conversa fictícia para mostrar como uma única frase oferece vários assuntos possíveis.</p></div></section>
        <section><span>05</span><div><h2>Quanto cabe em uma vida?</h2><p>Semanas aparecem apenas como uma unidade visual para deixar alguns anos menos abstratos.</p></div></section>
      </div>
    </article>
  </main>;
}
