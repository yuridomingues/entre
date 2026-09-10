import type { Metadata } from "next";
export const metadata: Metadata = { title: "Sobre", description: "Por que o ENTRE existe e como as experiências são pensadas." };

export default function About() {
  return <article className="essay-page">
    <p className="overline">sobre o ENTRE</p>
    <h1>Uma coleção de ideias que você pode experimentar.</h1>
    <p className="lead">O ENTRE parte de uma regra simples: quando uma interface consegue transformar uma ideia abstrata em ação, vale tentar antes de explicar.</p>
    <div className="essay-columns">
      <section><span>01</span><h2>Experiência antes da explicação.</h2><p>Você rola, escuta, escolhe ou compara. Depois o site dá nome ao que acabou de acontecer.</p></section>
      <section><span>02</span><h2>Curiosidade, não desempenho.</h2><p>Não há pontos, ranking, sequência diária ou resultado para compartilhar. Nada aqui mede se você é “bom” em alguma coisa.</p></section>
      <section><span>03</span><h2>Visual com função.</h2><p>Ilustração, movimento e som entram quando ajudam a entender. Se não ajudam, saem. A estética não deve esconder a ideia.</p></section>
      <section><span>04</span><h2>Privacidade por padrão.</h2><p>Você não precisa criar conta. As escolhas feitas dentro das experiências não são enviadas para um perfil ou banco de respostas.</p></section>
    </div>
    <aside className="author-note"><p>Projeto autoral de <strong>Yuri Domingues</strong>. Feito para crescer como uma pequena biblioteca de experiências independentes.</p></aside>
  </article>;
}
