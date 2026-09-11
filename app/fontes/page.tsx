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
      <p className="info-lead">Algumas experiências usam conceitos conhecidos de ciência, percepção e música. Aqui ficam as referências principais.</p>
      <div className="sources-list">
        <section><span>01</span><div><h2>A árvore que viu tudo</h2><p>A árvore de 1500 é imaginária. Os anéis de crescimento inspiram a ideia de usar uma árvore como régua de tempo.</p><a href="https://www.usgs.gov/media/images/tree-ring-illustration" target="_blank" rel="noreferrer">U.S. Geological Survey ↗</a></div></section>
        <section><span>02</span><div><h2>O mundo que seu cérebro inventa</h2><p>As imagens usam ilusões clássicas de tamanho, comprimento e contraste.</p></div></section>
        <section><span>03</span><div><h2>Anatomia de uma música</h2><p>O som é criado na hora dentro da própria página. Nenhuma gravação é usada.</p></div></section>
        <section><span>04</span><div><h2>Por onde uma conversa vai?</h2><p>A conversa é fictícia e existe para mostrar como detalhes diferentes abrem assuntos diferentes.</p></div></section>
        <section><span>05</span><div><h2>Quanto cabe em uma vida?</h2><p>Semanas aparecem como unidade visual para deixar alguns anos menos abstratos.</p></div></section>
        <section><span>06</span><div><h2>Do grão ao planeta</h2><p>Os tamanhos são aproximados e servem para comparar ordens de grandeza.</p></div></section>
        <section><span>07</span><div><h2>Onde o acaso vai parar?</h2><p>Cada passo escolhe entre dois lados com a mesma chance. Repetir a experiência produz desenhos diferentes.</p></div></section>
        <section><span>08</span><div><h2>Apague a cidade</h2><p>A experiência simplifica um efeito real: luz artificial no céu reduz o contraste e dificulta enxergar estrelas mais fracas.</p></div></section>
        <section><span>09</span><div><h2>Como uma ideia se espalha?</h2><p>A rede usa alcance por conexões: uma pessoa informada passa a ideia pelos caminhos disponíveis. É uma simplificação deliberada para tornar a estrutura da rede visível.</p></div></section>
        <section><span>10</span><div><h2>Quando cooperar deixa de valer a pena?</h2><p>Os ganhos são inspirados no dilema do prisioneiro repetido. Os três parceiros seguem regras simples diferentes para mostrar que a mesma decisão pode ter efeitos distintos quando a relação continua.</p></div></section>
        <section><span>11</span><div><h2>Uma memória muda toda vez que você olha para ela</h2><p>A experiência trata memória como reconstrução: depois de uma exposição curta, você recompõe posições e compara com a cena original. Ela não mede capacidade clínica de memória.</p></div></section>
        <section><span>12</span><div><h2>Até onde uma pequena mudança consegue chegar?</h2><p>As duas trajetórias usam a mesma recorrência logística em um regime caótico. Uma pequena diferença inicial pode crescer com as iterações, sem que exista aleatoriedade na regra.</p></div></section>
        <section><span>13</span><div><h2>Onde está o centro?</h2><p>O mapa compara objetivos clássicos de localização: reduzir a soma das distâncias, reduzir a pior distância e colocar mais casas dentro de um raio fixo.</p></div></section>
        <section><span>14</span><div><h2>O que a atenção apaga?</h2><p>A experiência é uma versão abstrata de tarefas de atenção seletiva e cegueira por desatenção: concentrar recursos em uma tarefa pode tornar outros eventos menos perceptíveis.</p></div></section>
        <section><span>15</span><div><h2>Quando você muda de ideia?</h2><p>As duas caixas têm proporções conhecidas de cores. As pistas são amostras de uma caixa escondida e servem para experimentar atualização de crenças sem exigir cálculo probabilístico.</p></div></section>

      </div>
    </article>
  </main>;
}
