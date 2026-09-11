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

        <section><span>16</span><div><h2>Tente ser aleatório</h2><p>Humanos costumam produzir sequências com padrões próprios ao tentar imitar aleatoriedade, incluindo evitar certas repetições. A comparação da página é ilustrativa e não diagnostica o usuário.</p><a href="https://pubmed.ncbi.nlm.nih.gov/37681229/" target="_blank" rel="noreferrer">estudo sobre geração humana de sequências ↗</a></div></section>
        <section><span>17</span><div><h2>Quando deixa de ser o mesmo?</h2><p>Inspirado no problema do Navio de Teseu e nas discussões filosóficas sobre identidade ao longo do tempo.</p><a href="https://plato.stanford.edu/entries/identity-time/" target="_blank" rel="noreferrer">Stanford Encyclopedia of Philosophy ↗</a></div></section>
        <section><span>18</span><div><h2>Qual pergunta vale mais?</h2><p>A experiência usa uma ideia simples de ganho de informação: perguntas que dividem melhor as possibilidades tendem a reduzir mais a incerteza.</p></div></section>
        <section><span>19</span><div><h2>Você percebe quando algo muda?</h2><p>Inspirado em demonstrações de cegueira à mudança, nas quais alterações podem passar despercebidas quando a comparação visual é interrompida.</p><a href="https://dictionary.apa.org/change-blindness" target="_blank" rel="noreferrer">APA Dictionary of Psychology ↗</a></div></section>
        <section><span>20</span><div><h2>Quando exatamente virou outra coisa?</h2><p>O paradoxo sorites explora termos vagos como “monte”, cujas fronteiras não parecem possuir um ponto naturalmente preciso.</p><a href="https://plato.stanford.edu/entries/sorites-paradox/" target="_blank" rel="noreferrer">Stanford Encyclopedia of Philosophy ↗</a></div></section>
        <section><span>21</span><div><h2>Quando a média engana?</h2><p>A página demonstra a estrutura do paradoxo de Simpson: uma tendência agregada pode diferir das tendências observadas dentro dos grupos quando as composições são diferentes.</p></div></section>
        <section><span>22</span><div><h2>Fica ou troca?</h2><p>Versão interativa do problema de Monty Hall. O apresentador sempre revela uma alternativa vazia sabendo onde está o símbolo, portanto a informação não é equivalente a remover uma porta ao acaso.</p><a href="https://instructional-resources.physics.uiowa.edu/1a2022-statistics-and-probability-monty-hall-problem" target="_blank" rel="noreferrer">University of Iowa ↗</a></div></section>
        <section><span>23</span><div><h2>Quem ganhou a eleição?</h2><p>O ciclo apresentado é uma forma do paradoxo de Condorcet: preferências individuais consistentes podem produzir uma preferência coletiva cíclica em comparações par a par.</p></div></section>
        <section><span>24</span><div><h2>Qual é a regra?</h2><p>Inspirado na tarefa 2-4-6 de Peter Wason, usada para estudar como as pessoas testam hipóteses e procuram confirmação.</p><a href="https://www.cognitivepsychology.com/Confirmation_Bias" target="_blank" rel="noreferrer">referência sobre viés de confirmação e tarefa 2-4-6 ↗</a></div></section>
        <section><span>25</span><div><h2>O que não voltou?</h2><p>A experiência ilustra viés de sobrevivência: observar apenas casos que chegaram à amostra pode esconder precisamente os casos que falharam antes de serem observados.</p></div></section>
        <section><span>26</span><div><h2>Quanto dura um intervalo?</h2><p>Não é um teste psicológico. Ele apenas contrasta um intervalo medido pelo navegador com a estimativa subjetiva feita sem contador visível.</p></div></section>
        <section><span>27</span><div><h2>Leia menos. Veja mais.</h2><p>Inspirado na tarefa de Stroop: nomear a cor pode sofrer interferência quando a palavra escrita indica uma cor incompatível.</p><a href="https://pubmed.ncbi.nlm.nih.gov/7302571/" target="_blank" rel="noreferrer">PubMed: Stroop effect ↗</a></div></section>
        <section><span>28</span><div><h2>Quantas pessoas até uma coincidência?</h2><p>Assumindo 365 aniversários igualmente prováveis e ignorando anos bissextos, 23 pessoas já levam a probabilidade de pelo menos uma coincidência para mais de 50%.</p><a href="https://courses.cs.washington.edu/courses/cse312/26sp/files/notes/birthday_paradox.html" target="_blank" rel="noreferrer">University of Washington ↗</a></div></section>
        <section><span>29</span><div><h2>Um mapa pode contar a verdade inteira?</h2><p>A projeção de Mercator preserva propriedades úteis à navegação, mas seu fator de escala cresce com a latitude. A experiência usa uma aproximação esférica para tornar a distorção visível.</p><a href="https://proj.org/en/stable/operations/projections/merc.html" target="_blank" rel="noreferrer">documentação PROJ: Mercator ↗</a></div></section>
        <section><span>30</span><div><h2>Abaixo dos seus pés</h2><p>As profundidades são aproximadas. A crosta continental tem dezenas de quilômetros, o manto se estende por cerca de 2.900 km e o núcleo possui regiões externa líquida e interna sólida. A escala de rolagem é deliberadamente comprimida.</p><a href="https://pubs.usgs.gov/gip/dynamic/inside.html" target="_blank" rel="noreferrer">U.S. Geological Survey: Inside the Earth ↗</a></div></section>

      </div>
    </article>
  </main>;
}
