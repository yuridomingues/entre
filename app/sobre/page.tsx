import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sobre", description: "O manifesto do ENTRE e os princípios por trás das experiências." };

export default function About() {
  return (
    <article className="essay-page">
      <p className="overline">manifesto</p>
      <h1>A internet ainda pode ser um lugar estranho, bonito e curioso.</h1>
      <p className="lead">ENTRE nasceu de uma ideia simples: algumas coisas são entendidas melhor quando deixam de ser texto e viram experiência.</p>
      <div className="essay-columns">
        <section><h2>Não explicar antes da hora.</h2><p>Primeiro você desce, escuta, escolhe, erra, percebe. A explicação vem depois. Conhecimento gruda melhor quando encontra uma experiência para morar.</p></section>
        <section><h2>Sem recompensa artificial.</h2><p>Não há pontos, sequência diária, ranking ou cadastro. A recompensa é descobrir alguma coisa que você não sabia — ou perceber uma coisa conhecida de outro jeito.</p></section>
        <section><h2>Humano, não solene.</h2><p>Filosofia pode brincar. Ciência pode ser bonita. Arte pode explicar. O projeto não trata curiosidade como matéria escolar nem inteligência como performance.</p></section>
        <section><h2>Aberto por princípio.</h2><p>O site não precisa saber quem você é. As experiências rodam no navegador, não exigem conta e não guardam as respostas que você dá.</p></section>
      </div>
      <aside className="author-note"><p>ENTRE é um projeto autoral de <strong>Yuri Domingues</strong>, construído como um jardim que pode continuar recebendo ideias.</p></aside>
    </article>
  );
}
