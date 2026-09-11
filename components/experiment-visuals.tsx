const C={
  ink:"#171714",
  paper:"#fffaf0",
  purple:"#8466d7",
  green:"#8ecb78",
  blue:"#7ab9da",
  yellow:"#f1cd65",
  coral:"#ef8a70",
  pink:"#ed89b1",
  clay:"#bd8156",
  night:"#24273c",
  pale:"#f5ead8",
  grey:"#d8d5cb"
};

function Person({x,y,scale=1,shirt=C.purple,flip=false}:{x:number;y:number;scale?:number;shirt?:string;flip?:boolean}){
  return <g transform={`translate(${x} ${y}) scale(${flip?-scale:scale} ${scale})`}>
    <circle cx="0" cy="-34" r="12" fill={C.paper} stroke={C.ink} strokeWidth="3"/>
    <path d="M-12-18Q0-26 12-18L15 16Q0 24-15 16Z" fill={shirt} stroke={C.ink} strokeWidth="3" strokeLinejoin="round"/>
    <path d="M-8 17-16 47M8 17 18 47M-14-6-33 13M14-6 33 12" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
    <path d="M-10-42q10-9 20 0" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/>
  </g>;
}

function Ground(){return <path d="M36 220c92 4 171-2 252 1 45 2 81 2 98-1" className="ev-rough" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>}

export function ExperimentVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const cls = compact ? "tile-art compact editorial-art" : "tile-art editorial-art";

  if(slug==="arvore") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma árvore atravessando séculos">
    <path d="M53 202c57-45 86-119 91-160 6 42 44 95 91 118 51 25 93 40 132 42" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 7" opacity=".25"/>
    <g transform="translate(71 170)">
      <path d="M0 45V9M0 19-14 4M0 26 15 11" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
      <ellipse cx="-14" cy="1" rx="13" ry="7" transform="rotate(-25 -14 1)" fill={C.green} stroke={C.ink} strokeWidth="3"/>
      <ellipse cx="15" cy="9" rx="13" ry="7" transform="rotate(24 15 9)" fill={C.green} stroke={C.ink} strokeWidth="3"/>
    </g>
    <g transform="translate(246 12)">
      <path d="M-17 201c9-57 10-107 7-152M20 201C9 140 8 94 11 49" fill={C.clay} stroke={C.ink} strokeWidth="5" strokeLinecap="round"/>
      <path d="M0 107c-30-31-62-48-96-51M7 87c31-34 57-48 88-57M-3 132c-38-14-72-16-107-8M8 143c31 0 59 13 82 34" fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="round"/>
      {[[0,35,52,31],[-64,57,41,25],[61,45,44,28],[-93,103,35,23],[83,94,37,23],[-45,126,44,28],[48,130,47,29]].map(([cx,cy,rx,ry],i)=><ellipse key={i} cx={cx} cy={cy} rx={rx} ry={ry} fill={i%2?C.green:"#aad78f"} stroke={C.ink} strokeWidth="3"/>)}
      <ellipse cx="1" cy="188" rx="26" ry="10" fill={C.paper} stroke={C.ink} strokeWidth="3"/>
      <path d="M-12 188c5-4 18-4 25 0M-8 184c4 4 13 5 18 1" fill="none" stroke={C.clay} strokeWidth="2"/>
    </g>
    <Ground/>
    <g fill={C.paper} stroke={C.ink} strokeWidth="2">{[98,152,210,286,348].map((x,i)=><g key={i}><circle cx={x} cy={224} r="6"/><path d={`M${x} 230v10`}/></g>)}</g>
  </svg>;

  if(slug==="mente") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Percepção e contexto">
    <path d="M108 213c-18-39-24-88-7-125 17-38 53-58 96-54 47 4 78 32 84 76 3 25-2 40-14 57l25 44h-72l-15 25H102Z" fill={C.paper} stroke={C.ink} strokeWidth="4" strokeLinejoin="round"/>
    <path d="M127 117c17-31 47-45 80-37 27 6 47 25 55 51-18 26-43 39-73 38-29-1-50-17-62-52Z" fill={C.blue} stroke={C.ink} strokeWidth="3"/>
    <circle cx="195" cy="124" r="28" fill={C.paper} stroke={C.ink} strokeWidth="3"/><circle cx="195" cy="124" r="10" fill={C.ink}/>
    <g transform="translate(334 70)">{[0,45,90,135,180,225,270,315].map((a,i)=>{const rad=a*Math.PI/180;return <circle key={i} cx={Math.cos(rad)*34} cy={Math.sin(rad)*34} r={i%2?7:13} fill={i%2?C.yellow:C.pink} stroke={C.ink} strokeWidth="2"/>})}<circle r="12" fill={C.paper} stroke={C.ink} strokeWidth="3"/></g>
    <path d="M302 172c27-17 55-14 81 7" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6"/>
    <path d="M324 203l18-10 10 19 17-8" fill="none" stroke={C.purple} strokeWidth="5" strokeLinecap="round"/>
  </svg>;

  if(slug==="musica") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Camadas de uma música">
    <rect x="45" y="39" width="330" height="177" rx="20" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <g transform="translate(76 66)">
      {[[C.yellow,92],[C.purple,66],[C.green,118],[C.pink,49]].map(([color,h],i)=><g key={i} transform={`translate(${i*70} 0)`}><rect x="0" y="0" width="46" height="124" rx="12" fill={color as string} stroke={C.ink} strokeWidth="3"/><path d={`M23 18v${Number(h)-18}`} stroke={C.ink} strokeWidth="4"/><circle cx="23" cy={h as number} r="10" fill={C.paper} stroke={C.ink} strokeWidth="3"/></g>)}
    </g>
    <path d="M62 231c25-31 44-31 68 0s43 31 67 0 43-31 67 0 43 31 68 0 43-31 68 0" fill="none" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
    <circle cx="72" cy="53" r="7" fill={C.coral} stroke={C.ink} strokeWidth="2"/>
  </svg>;

  if(slug==="conversa") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma conversa abrindo caminhos">
    <Person x={82} y={185} scale={.78} shirt={C.blue}/>
    <Person x={338} y={185} scale={.78} shirt={C.green} flip/>
    <path d="M119 69c18-26 48-36 79-27 27 8 46 29 48 51-4 28-26 47-59 50l-30 22 6-26c-25-6-42-24-44-45Z" fill={C.paper} stroke={C.ink} strokeWidth="3"/>
    <circle cx="163" cy="92" r="7" fill={C.purple}/><circle cx="187" cy="92" r="7" fill={C.yellow}/><circle cx="211" cy="92" r="7" fill={C.coral}/>
    <path d="M222 141c18 5 36 14 51 28M231 133c14-13 31-22 53-25M218 148c5 18 7 32 2 49" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/>
    {[["M285 171c19 0 31 9 36 25",C.green],["M287 106c19-8 36-4 49 10",C.purple],["M218 200c14 5 23 17 25 31",C.yellow]].map(([d,c],i)=><path key={i} d={d as string} fill="none" stroke={c as string} strokeWidth="7" strokeLinecap="round"/>)}
  </svg>;

  if(slug==="vida") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Semanas formando uma vida">
    <path d="M35 199c59-13 98-53 128-98 26-40 52-57 91-58 52-1 91 38 131 72" fill="none" stroke={C.ink} strokeWidth="4" strokeDasharray="7 7" opacity=".26"/>
    <g transform="translate(44 55)">{Array.from({length:84}).map((_,i)=><rect key={i} x={(i%14)*22} y={Math.floor(i/14)*24} width="13" height="13" rx="3" fill={i<53?(i%5===0?C.purple:C.green):C.paper} stroke={C.ink} strokeWidth="1.6"/>)}</g>
    <Person x={347} y={190} scale={.72} shirt={C.coral}/>
    <path d="M318 219c20-4 45-3 69 2" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
    <path d="M339 105c12-17 26-31 41-41" fill="none" stroke={C.yellow} strokeWidth="8" strokeLinecap="round"/>
  </svg>;

  if(slug==="escala") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Objetos comparados em escala">
    <Ground/>
    <circle cx="46" cy="213" r="4" fill={C.ink}/>
    <circle cx="78" cy="205" r="12" fill={C.yellow} stroke={C.ink} strokeWidth="3"/>
    <rect x="108" y="173" width="26" height="43" rx="5" fill={C.blue} stroke={C.ink} strokeWidth="3"/>
    <Person x={176} y={182} scale={.55} shirt={C.purple}/>
    <g transform="translate(221 164)"><rect width="76" height="51" rx="9" fill={C.coral} stroke={C.ink} strokeWidth="3"/><rect x="9" y="9" width="46" height="17" rx="3" fill={C.paper} stroke={C.ink} strokeWidth="2"/><circle cx="18" cy="53" r="8" fill={C.ink}/><circle cx="59" cy="53" r="8" fill={C.ink}/></g>
    <g transform="translate(318 111)"><rect x="0" y="26" width="44" height="79" fill={C.paper} stroke={C.ink} strokeWidth="3"/>{[0,1,2].map(i=><rect key={i} x="8" y={36+i*19} width="9" height="9" fill={C.yellow} stroke={C.ink} strokeWidth="1.5"/>)}<path d="M-15 105 24 14l41 91Z" fill={C.green} stroke={C.ink} strokeWidth="3"/></g>
    <circle cx="386" cy="73" r="42" fill={C.blue} stroke={C.ink} strokeWidth="3"/><path d="M366 54c14-10 28-7 37 2l-5 13 14 12-11 18-18-4-10 10-13-17 8-10Z" fill={C.green} stroke={C.ink} strokeWidth="2"/>
  </svg>;

  if(slug==="acaso") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Bolinhas aleatórias formando um padrão">
    <path d="M62 36h296v177H62Z" fill={C.paper} stroke={C.ink} strokeWidth="4" rx="16"/>
    <g fill={C.grey} stroke={C.ink} strokeWidth="1.5">{Array.from({length:28}).map((_,i)=><circle key={i} cx={104+(i%7)*36} cy={73+Math.floor(i/7)*29} r="5"/>)}</g>
    <path d="M209 37v29" stroke={C.ink} strokeWidth="3"/>
    {[[91,200,C.purple],[118,192,C.pink],[145,179,C.green],[172,162,C.yellow],[199,143,C.purple],[226,151,C.blue],[253,174,C.coral],[280,192,C.green],[307,202,C.pink]].map(([x,y,c],i)=><g key={i}>{Array.from({length:Math.max(1,5-Math.abs(4-i))}).map((_,j)=><circle key={j} cx={x as number} cy={(y as number)-j*13} r="6" fill={c as string} stroke={C.ink} strokeWidth="1.5"/>)}</g>)}
    <path d="M74 215h272" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
  </svg>;

  if(slug==="noite") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Cidade apagando luzes e revelando estrelas">
    <path d="M37 37h346v178H37Z" fill={C.night} stroke={C.ink} strokeWidth="4"/>
    <g fill={C.paper}>{[[73,62],[108,88],[146,50],[191,74],[236,47],[274,84],[321,58],[354,101],[95,126],[245,119]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%3===0?4:2.5} opacity={i<4?.35:1}/>)}</g>
    <path d="M48 211v-64h48v64M89 211v-91h59v91M141 211v-45h51v45M188 211v-81h62v81M244 211v-54h55v54M292 211v-103h72v103" fill={C.ink}/>
    <g fill={C.yellow}>{[[65,165],[109,140],[124,164],[210,151],[269,176],[323,133],[344,160]].map(([x,y],i)=><rect key={i} x={x} y={y} width="9" height="13" rx="2" opacity={i<3?.95:.25}/>)}</g>
    <path d="M53 228h314" stroke={C.ink} strokeWidth="4"/><circle cx="215" cy="228" r="10" fill={C.paper} stroke={C.ink} strokeWidth="3"/>
  </svg>;

  if(slug==="rede") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma ideia atravessando uma rede de pessoas">
    <g stroke={C.ink} strokeWidth="3" opacity=".28">{[[72,78,126,53],[72,78,105,134],[126,53,174,95],[105,134,174,95],[174,95,199,178],[199,178,264,185],[264,185,300,111],[300,111,354,76],[300,111,352,156],[264,185,352,156]].map((v,i)=><line key={i} x1={v[0]} y1={v[1]} x2={v[2]} y2={v[3]}/>)}</g>
    <path d="M200 178 264 185" stroke={C.purple} strokeWidth="8" strokeLinecap="round" strokeDasharray="10 7"/>
    {[[72,78],[126,53],[105,134],[174,95],[199,178],[264,185],[300,111],[354,76],[352,156]].map(([x,y],i)=><g key={i}><circle cx={x} cy={y} r="17" fill={i<5?C.purple:i===5?C.yellow:C.paper} stroke={C.ink} strokeWidth="3"/><circle cx={x} cy={y} r="5" fill={i<6?C.paper:C.ink}/></g>)}
    <g opacity=".6"><circle cx="264" cy="185" r="30" fill="none" stroke={C.yellow} strokeWidth="4"/><circle cx="264" cy="185" r="42" fill="none" stroke={C.yellow} strokeWidth="2"/></g>
    <path d="M223 45c26-11 50-8 68 4" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6"/>
    <path d="M260 47l13-15 11 16" fill={C.green} stroke={C.ink} strokeWidth="2"/>
  </svg>;

  if(slug==="cooperar") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Duas pessoas escolhendo cooperar ou guardar">
    <Person x={92} y={184} scale={.72} shirt={C.coral}/>
    <Person x={328} y={184} scale={.72} shirt={C.green} flip/>
    <rect x="132" y="116" width="156" height="91" rx="18" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <g>{[0,1,2,3,4,5].map(i=><circle key={i} cx={166+(i%3)*44} cy={145+Math.floor(i/3)*34} r="12" fill={i<3?C.yellow:C.purple} stroke={C.ink} strokeWidth="2"/>)}</g>
    <path d="M71 96c22-15 45-14 64 4M285 100c20-17 43-18 65-6" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/>
    <g transform="translate(183 43)"><rect x="-31" y="-13" width="62" height="27" rx="13" fill={C.green} stroke={C.ink} strokeWidth="2"/><path d="M-12 1-2 8 15-7" fill="none" stroke={C.ink} strokeWidth="3"/></g>
    <g transform="translate(252 52)"><rect x="-27" y="-13" width="54" height="27" rx="13" fill={C.coral} stroke={C.ink} strokeWidth="2"/><path d="M-9-6 9 7M9-6-9 7" stroke={C.ink} strokeWidth="3"/></g>
  </svg>;

  if(slug==="memoria") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma sala com quatro objetos para lembrar">
    <rect x="45" y="35" width="330" height="184" rx="18" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <path d="M155 35v184M265 35v184M45 127h330" stroke={C.ink} strokeWidth="2" strokeDasharray="6 7" opacity=".2"/>
    <g transform="translate(101 82)"><rect x="-22" y="-18" width="44" height="36" rx="4" fill={C.purple} stroke={C.ink} strokeWidth="3"/><path d="M-11-18v36M-4-6h17" stroke={C.ink} strokeWidth="2"/></g>
    <g transform="translate(210 176)"><path d="M-19-16h34v31c0 6-5 10-10 10h-14c-6 0-10-4-10-10Z" fill={C.yellow} stroke={C.ink} strokeWidth="3"/><path d="M15-8h8c12 0 12 19 0 19h-8" fill="none" stroke={C.ink} strokeWidth="3"/></g>
    <g transform="translate(322 79)"><path d="M-13 14h26l-4 22H-9Z" fill={C.coral} stroke={C.ink} strokeWidth="3"/><path d="M0 14V-20M0-6c-17 1-23-10-23-18 15-1 23 7 23 18ZM1 1c16 1 23-11 23-20-15-1-23 8-23 20Z" fill={C.green} stroke={C.ink} strokeWidth="3"/></g>
    <g transform="translate(100 175)"><circle r="25" fill={C.blue} stroke={C.ink} strokeWidth="3"/><path d="M0-13V1l10 7" fill="none" stroke={C.ink} strokeWidth="3" strokeLinecap="round"/></g>
    <path d="M286 168c25-10 54-6 73 11" fill="none" stroke={C.purple} strokeWidth="3" strokeDasharray="7 6" opacity=".55"/>
    <circle cx="342" cy="190" r="21" fill="none" stroke={C.purple} strokeWidth="3" strokeDasharray="5 5"/>
  </svg>;

  if(slug==="mudanca") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Duas trajetórias quase iguais que se separam">
    <path d="M45 217C87 202 103 174 127 156c24-19 48-27 72-21 24 7 42 35 67 25 26-10 39-57 63-86 20-24 39-30 54-25" fill="none" stroke={C.purple} strokeWidth="7" strokeLinecap="round"/>
    <path d="M45 218C87 203 103 176 128 158c26-18 50-22 72-10 23 13 36 56 61 59 28 3 48-20 68-37 19-15 38-20 54-17" fill="none" stroke={C.green} strokeWidth="7" strokeLinecap="round"/>
    <circle cx="45" cy="217" r="10" fill={C.yellow} stroke={C.ink} strokeWidth="3"/>
    <path d="M45 217h53" stroke={C.ink} strokeWidth="2" strokeDasharray="5 5"/>
    <g transform="translate(337 65)"><path d="M-14 2c-24-16-34-3-26 14 7 14 25 7 26-14ZM14 2c24-16 34-3 26 14-7 14-25 7-26-14Z" fill={C.yellow} stroke={C.ink} strokeWidth="2"/><path d="M0-10v34" stroke={C.ink} strokeWidth="3"/></g>
    <path d="M287 29c26-12 48-12 66 2" fill="none" stroke={C.ink} strokeWidth="2" strokeDasharray="5 6"/>
  </svg>;

  if(slug==="atencao") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Atenção focada em alguns elementos enquanto outro passa">
    <path d="M46 41h328v178H46Z" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <path d="M210 41v178" stroke={C.ink} strokeWidth="3" strokeDasharray="8 8" opacity=".25"/>
    <circle cx="101" cy="92" r="17" fill={C.blue} stroke={C.ink} strokeWidth="3"/><circle cx="310" cy="172" r="17" fill={C.blue} stroke={C.ink} strokeWidth="3"/>
    <circle cx="118" cy="173" r="17" fill={C.pink} stroke={C.ink} strokeWidth="3"/><circle cx="306" cy="87" r="17" fill={C.pink} stroke={C.ink} strokeWidth="3"/>
    <path d="M172 78 262 169 169 169Z" fill={C.yellow} stroke={C.ink} strokeWidth="4"/>
    <path d="M76 68c20-23 48-34 78-29M345 199c-19 16-43 22-69 20" fill="none" stroke={C.purple} strokeWidth="4" strokeLinecap="round"/>
    <g opacity=".23"><ellipse cx="105" cy="131" rx="72" ry="100" fill={C.blue}/></g>
  </svg>;

  if(slug==="aleatorio") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma pessoa tentando escolher aleatoriamente esquerda e direita">
    <Person x={210} y={188} scale={.64} shirt={C.yellow}/>
    <g transform="translate(53 45)">{Array.from({length:14}).map((_,i)=><rect key={i} x={(i%7)*25} y={Math.floor(i/7)*27} width="17" height="17" rx="4" fill={i%3===0?C.green:C.purple} stroke={C.ink} strokeWidth="1.5"/>)}</g>
    <g transform="translate(245 45)">{Array.from({length:14}).map((_,i)=><rect key={i} x={(i%7)*25} y={Math.floor(i/7)*27} width="17" height="17" rx="4" fill={[C.green,C.purple,C.purple,C.green,C.green,C.green,C.purple][i%7]} stroke={C.ink} strokeWidth="1.5"/>)}</g>
    <path d="M110 145 74 169l36 24M310 145l36 24-36 24" fill={C.paper} stroke={C.ink} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M174 62c18-14 34-14 51 0" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="5 5"/>
    <circle cx="199" cy="52" r="4" fill={C.ink}/><circle cx="213" cy="47" r="4" fill={C.ink}/><circle cx="227" cy="52" r="4" fill={C.ink}/>
  </svg>;

  if(slug==="teseu") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Um barco tendo peças substituídas">
    <path d="M73 149h276l-37 67H112Z" fill={C.clay} stroke={C.ink} strokeWidth="4" strokeLinejoin="round"/>
    {Array.from({length:8}).map((_,i)=><path key={i} d={`M${105+i*31} 151l7 61`} stroke={C.ink} strokeWidth="2" opacity=".75"/>)}
    {[[105,C.green],[136,C.green],[167,C.clay],[198,C.clay],[229,C.green],[260,C.clay],[291,C.clay],[322,C.clay]].map(([x,c],i)=><rect key={i} x={(x as number)-12} y="159" width="25" height="44" fill={c as string} opacity=".9"/>)}
    <path d="M209 149V47l93 83h-93Z" fill={C.paper} stroke={C.ink} strokeWidth="4" strokeLinejoin="round"/>
    <path d="M209 47v102" stroke={C.ink} strokeWidth="5"/>
    <g transform="translate(46 53)"><rect x="0" y="0" width="91" height="76" rx="12" fill={C.paper} stroke={C.ink} strokeWidth="3"/><path d="M15 22h60M15 39h42M15 56h50" stroke={C.clay} strokeWidth="8" strokeLinecap="round"/></g>
    <path d="M136 104c20 13 35 21 53 24" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6"/>
    <circle cx="143" cy="220" r="7" fill={C.green} stroke={C.ink} strokeWidth="2"/>
  </svg>;

  if(slug==="perguntas") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Perguntas eliminando possibilidades">
    <g transform="translate(48 44)">{Array.from({length:12}).map((_,i)=>{const x=(i%4)*64,y=Math.floor(i/4)*62;return <g key={i} transform={`translate(${x} ${y})`} opacity={i<7?1:.18}><rect width="44" height="44" rx={i%2?22:8} fill={i%3===0?C.purple:i%3===1?C.green:C.yellow} stroke={C.ink} strokeWidth="2"/>{i%4===0&&<path d="M15-3v-9M29-3v-9" stroke={C.ink} strokeWidth="2"/>}</g>})}</g>
    <circle cx="332" cy="103" r="49" fill={C.paper} stroke={C.ink} strokeWidth="4"/><circle cx="332" cy="103" r="17" fill={C.coral} stroke={C.ink} strokeWidth="3"/>
    <path d="M300 141 263 190" stroke={C.ink} strokeWidth="10" strokeLinecap="round"/>
    <path d="M307 198c21-27 45-38 73-37" fill="none" stroke={C.purple} strokeWidth="3" strokeDasharray="6 6"/>
    <path d="M333 203c18-16 31-17 48-4" fill="none" stroke={C.ink} strokeWidth="3"/>
  </svg>;

  if(slug==="regra") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Sequências sendo testadas para descobrir uma regra">
    <g transform="translate(41 52)">{[2,4,6].map((n,i)=><g key={n} transform={`translate(${i*95} 0)`}><rect width="72" height="75" rx="12" fill={i===1?C.green:C.paper} stroke={C.ink} strokeWidth="3"/><text x="36" y="52" textAnchor="middle" fontSize="40" fontWeight="900" fill={C.ink}>{n}</text></g>)}</g>
    <path d="M77 151c50 23 122 22 178 0" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6"/>
    <g transform="translate(291 51)"><rect width="87" height="140" rx="15" fill={C.paper} stroke={C.ink} strokeWidth="3"/><circle cx="44" cy="42" r="21" fill={C.yellow} stroke={C.ink} strokeWidth="3"/><path d="M33 42h22M44 31v22" stroke={C.ink} strokeWidth="3"/><path d="M18 84h53M18 104h40M18 124h49" stroke={C.purple} strokeWidth="6" strokeLinecap="round"/></g>
    <path d="M265 116c17-10 23-10 35-1" fill="none" stroke={C.ink} strokeWidth="3"/>
    <circle cx="207" cy="212" r="7" fill={C.coral}/><path d="M45 215h314" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
  </svg>;

  if(slug==="minuto") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Uma pessoa tentando sentir a passagem do tempo">
    <Person x={210} y={194} scale={.75} shirt={C.blue}/>
    <circle cx="210" cy="81" r="49" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <path d="M210 81V49M210 81l28 16" stroke={C.ink} strokeWidth="5" strokeLinecap="round"/>
    <path d="M154 72c-21 11-35 29-40 53M266 72c21 11 35 29 40 53" fill="none" stroke={C.purple} strokeWidth="3" strokeDasharray="6 7"/>
    <g opacity=".85">{[[87,61],[333,55],[82,188],[344,180]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r={i%2?9:6} fill={i%2?C.yellow:C.green} stroke={C.ink} strokeWidth="2"/>)}</g>
    <path d="M83 222c86 5 166 4 253 0" stroke={C.ink} strokeWidth="4" strokeLinecap="round"/>
  </svg>;

  if(slug==="stroop") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Palavras e cores em conflito">
    <rect x="43" y="40" width="334" height="180" rx="19" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <g fontFamily="Arial, sans-serif" fontWeight="900">
      <text x="70" y="100" fontSize="44" fill={C.coral}>AZUL</text>
      <text x="219" y="100" fontSize="44" fill={C.green}>ROSA</text>
      <text x="70" y="164" fontSize="44" fill={C.purple}>VERDE</text>
      <text x="232" y="164" fontSize="44" fill={C.yellow}>AZUL</text>
    </g>
    <g transform="translate(159 198)">{[C.blue,C.green,C.pink,C.yellow].map((c,i)=><circle key={i} cx={i*35} cy="0" r="10" fill={c} stroke={C.ink} strokeWidth="2"/>)}</g>
  </svg>;

  if(slug==="mapa") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Um globo e um mapa mostrando distorção">
    <circle cx="119" cy="131" r="78" fill={C.blue} stroke={C.ink} strokeWidth="4"/>
    <path d="M88 80c22-13 48-10 64 3l-7 16 18 13-13 23-21-4-13 13-16-21 8-13Z" fill={C.green} stroke={C.ink} strokeWidth="2"/>
    <path d="M201 68h174v126H201Z" fill={C.paper} stroke={C.ink} strokeWidth="4"/>
    <g stroke={C.ink} strokeWidth="1" opacity=".2">{[230,259,288,317,346].map(x=><line key={"v"+x} x1={x} y1="69" x2={x} y2="193"/>)}{[88,111,134,157,180].map(y=><line key={"h"+y} x1="202" y1={y} x2="374" y2={y}/>)}</g>
    <rect x="265" y="120" width="46" height="29" fill={C.green} stroke={C.ink} strokeWidth="3"/>
    <rect x="237" y="78" width="102" height="27" fill={C.green} stroke={C.ink} strokeWidth="3" opacity=".76"/>
    <path d="M186 111c24-16 38-19 60-19" fill="none" stroke={C.purple} strokeWidth="4" strokeDasharray="7 6"/>
    <path d="M230 84l16 8-15 10" fill="none" stroke={C.purple} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;

  if(slug==="profundidade") return <svg className={cls} viewBox="0 0 420 260" role="img" aria-label="Corte da Terra com uma viagem até o centro">
    <circle cx="209" cy="132" r="102" fill={C.clay} stroke={C.ink} strokeWidth="4"/>
    <circle cx="209" cy="132" r="76" fill="#d96f4b" stroke={C.ink} strokeWidth="3"/>
    <circle cx="209" cy="132" r="49" fill="#efa94f" stroke={C.ink} strokeWidth="3"/>
    <circle cx="209" cy="132" r="23" fill="#ffe07b" stroke={C.ink} strokeWidth="3"/>
    <path d="M209 30v204" stroke={C.paper} strokeWidth="3" strokeDasharray="6 6" opacity=".75"/>
    <path d="M209 34 209 166" stroke={C.ink} strokeWidth="5" strokeLinecap="round"/>
    <circle cx="209" cy="166" r="11" fill={C.paper} stroke={C.ink} strokeWidth="3"/>
    <g transform="translate(78 38)"><Person x={0} y={58} scale={.48} shirt={C.green}/><path d="M25 65c27 2 48 10 65 24" fill="none" stroke={C.ink} strokeWidth="3" strokeDasharray="6 6"/></g>
    <path d="M319 62c22 16 36 38 42 63M329 195c-18 12-39 18-62 18" fill="none" stroke={C.purple} strokeWidth="3" strokeDasharray="6 6"/>
    <circle cx="350" cy="144" r="7" fill={C.green}/><circle cx="342" cy="180" r="7" fill={C.yellow}/>
  </svg>;

  return null;
}
