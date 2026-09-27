"use client";
import { useEffect, useRef } from "react";
import { preload } from "react-dom";

const WM="https://upload.wikimedia.org/wikipedia/commons/thumb/";
const INK="#2a2119";

type Scene="open"|"sun"|"apple"|"branch"|"voice"|"net"|"you";
type Beat={year:number,season:number,who:string,title:string,line:string,scene:Scene,img?:string,pos?:string};

// season: 0 spring, 1 summer, 2 autumn, 3 winter (unwrapped, always forward)
const beats:Beat[]=[
  {year:1500,season:.2,who:"uma colina",title:"Uma árvore, numa colina.",line:"Ela vai ficar aqui enquanto a história passa. Role.",scene:"open"},
  {year:1543,season:1,who:"Copérnico",title:"A Terra sai do centro.",line:"O Sol fica no meio, e a Terra passa a girar em volta dele.",scene:"sun",img:WM+"f/f2/Nikolaus_Kopernikus.jpg/500px-Nikolaus_Kopernikus.jpg",pos:"50% 30%"},
  {year:1687,season:1.3,who:"Newton",title:"A maçã e a Lua caem pela mesma força.",line:"A gravidade que derruba a fruta é a mesma que prende a Lua à Terra.",scene:"apple",img:WM+"3/39/GodfreyKneller-IsaacNewton-1689.jpg/500px-GodfreyKneller-IsaacNewton-1689.jpg",pos:"50% 22%"},
  {year:1859,season:2.3,who:"Darwin",title:"Todas as espécies são parentes.",line:"Em A Origem das Espécies, a vida vira galhos de um mesmo tronco.",scene:"branch",img:WM+"3/3c/Charles_Darwin_01.jpg/500px-Charles_Darwin_01.jpg",pos:"50% 25%"},
  {year:1877,season:3.05,who:"o fonógrafo",title:"Uma voz fica gravada.",line:"Edison recita uma cantiga num cilindro de estanho, e a máquina repete.",scene:"voice",img:WM+"0/03/Edison_and_phonograph_edit1.jpg/500px-Edison_and_phonograph_edit1.jpg",pos:"30% 40%"},
  {year:1969,season:4.2,who:"a ARPANET",title:"Dois computadores se falam.",line:"A primeira mensagem ia ser LOGIN. A rede caiu depois de LO.",scene:"net"},
  {year:2026,season:5,who:"você",title:"Você, agora.",line:"Lendo isto numa tela, ao lado da mesma árvore.",scene:"you"}
];
const N=beats.length;
{let extra=0;for(let i=1;i<N;i++){if(beats[i].year-beats[i-1].year>50)extra+=4;beats[i].season+=extra}}
const END=N-.4;
// display cap: about 0.45 s per season
const RATE=1/450;

const palette=[
  {leaf:"#8fb347",ground:"#bccd84",amount:.72,sun:.55},
  {leaf:"#2f6a2d",ground:"#98a857",amount:1,sun:1},
  {leaf:"#c0561e",ground:"#c9a060",amount:.82,sun:.6},
  {leaf:"#a99474",ground:"#ebe8de",amount:0,sun:.25}
];

const clamp=(v:number)=>v<0?0:v>1?1:v;
const smooth=(k:number)=>k*k*(3-2*k);
const ramp=(v:number,a:number,b:number)=>smooth(clamp((v-a)/(b-a)));
const hex=(h:string)=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mixHex=(a:string,b:string,t:number)=>{const x=hex(a),y=hex(b);return `rgb(${x.map((v,i)=>Math.round(v+(y[i]-v)*t)).join(" ")})`};
const mixHex2=(a:string,b:string,t:number)=>"#"+hex(a).map((v,i)=>Math.round(v+(hex(b)[i]-v)*t).toString(16).padStart(2,"0")).join("");
const f1=(v:number)=>(Math.round(v*10)/10).toString();

// one ink tree, drawn once
const tree=(()=>{
  let seed=11;
  const rnd=()=>{seed=seed*16807%2147483647;return (seed-1)/2147483646};
  const limbs:{d:string,w:number}[]=[];
  const spots:{x:number,y:number,r:number}[]=[];
  const grow=(x:number,y:number,a:number,len:number,w:number,depth:number)=>{
    const x2=x+Math.cos(a)*len,y2=y+Math.sin(a)*len;
    const bend=(rnd()-.5)*len*.3;
    const cx=(x+x2)/2+Math.cos(a+Math.PI/2)*bend,cy=(y+y2)/2+Math.sin(a+Math.PI/2)*bend;
    limbs.push({d:`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}`,w});
    if(depth<=2)spots.push({x:x2,y:y2,r:depth===2?40+rnd()*8:depth?32+rnd()*8:24+rnd()*8});
    if(!depth)return;
    const n=depth>4?2:rnd()<.3?3:2;
    for(let k=0;k<n;k++){
      const wide=depth>=5?.62:.4;
      const side=n===2?(k?1:-1)*(wide+rnd()*.16):(k-1)*(wide+.1+rnd()*.1);
      const up=(-Math.PI/2-a)*.1;
      grow(x2,y2,a+side+up+(rnd()-.5)*.14,len*(.72+rnd()*.1),Math.max(1.6,w*.64),depth-1);
    }
  };
  grow(200,474,-Math.PI/2-.03,104,26,6);
  const blob=(x:number,y:number,r:number)=>{
    const pts=Array.from({length:8},(_,i)=>{const a=i/8*Math.PI*2+rnd()*.3,k=r*(.78+rnd()*.36);return [x+Math.cos(a)*k,y+Math.sin(a)*k*.9]});
    const mid=(i:number)=>{const p=pts[i%8],q=pts[(i+1)%8];return [(p[0]+q[0])/2,(p[1]+q[1])/2]};
    let d=`M${f1(mid(0)[0])} ${f1(mid(0)[1])}`;
    for(let i=1;i<=8;i++){const p=pts[i%8],m=mid(i);d+=`Q${f1(p[0])} ${f1(p[1])} ${f1(m[0])} ${f1(m[1])}`}
    return d+"Z";
  };
  const cx=spots.reduce((s,p)=>s+p.x,0)/spots.length,cy=spots.reduce((s,p)=>s+p.y,0)/spots.length;
  const sorted=[...spots].sort((a,b)=>Math.atan2(a.y-cy,a.x-cx)-Math.atan2(b.y-cy,b.x-cx));
  const G=12,size=Math.ceil(sorted.length/G);
  const groups=Array.from({length:G},(_,g)=>({d:sorted.slice(g*size,(g+1)*size).map(p=>blob(p.x,p.y,p.r)).join(""),th:rnd()*.7}));
  const low=spots.filter(p=>p.x<cx-20).sort((a,b)=>b.y-a.y)[0];
  const x0=Math.floor(Math.min(...spots.map(p=>p.x-p.r*1.15))-6),x1=Math.ceil(Math.max(...spots.map(p=>p.x+p.r*1.15))+10);
  const y0=Math.floor(Math.min(...spots.map(p=>p.y-p.r*1.05))-6);
  return {limbs,groups,apple:{x:low.x+4,y:low.y+10},box:`${x0} ${y0} ${x1-x0} ${482-y0}`,origin:`${f1((200-x0)/(x1-x0)*100)}% 98.8%`};
})();

const leaves=[[70,210],[130,160],[250,200],[320,150],[180,250],[300,260]];

function Visual({scene}:{scene:Scene}){
  if(scene==="sun")return <svg viewBox="0 0 320 220" className="arv-diagram">
    <ellipse cx="160" cy="112" rx="118" ry="66" className="arv-orbit"/>
    <circle cx="160" cy="112" r="3" fill={INK} opacity=".35"/>
    <g data-a="sun"><g className="arv-rays">{Array.from({length:12},(_,i)=><line key={i} x1="0" y1="-30" x2="0" y2="-38" transform={`rotate(${i*30})`}/>)}</g><circle r="24" className="arv-sunball"/><text y="52" className="arv-tag">Sol</text></g>
    <g data-a="earth"><circle r="12" className="arv-earth"/><path d="M-6 -4q4 -5 8 0t5 5M-8 5q5 2 9 -1" className="arv-land"/><text y="30" className="arv-tag">Terra</text></g>
  </svg>;
  if(scene==="apple")return <svg viewBox="0 0 320 220" className="arv-diagram">
    <path d="M0 90.6A120 120 0 0 1 210 170" className="arv-orbit"/>
    <circle cx="90" cy="170" r="42" className="arv-earth"/>
    <path d="M74 150q10 -12 22 -2t18 8M62 178q14 6 28 -2t24 4" className="arv-land"/>
    <path d="M90 128v-16" stroke={INK} strokeWidth="3"/><circle cx="90" cy="106" r="9" className="arv-minicrown"/>
    <g data-a="miniapple"><circle cx="100" cy="112" r="3.5" className="arv-apple"/></g>
    <path d="M110 104v14" className="arv-pull" data-a="applepull"/>
    <g data-a="moon" style={{transformOrigin:"90px 170px"}}><circle cx="90" cy="50" r="11" className="arv-moon"/><path d="M90 66v26m-6 -7l6 7 6 -7" className="arv-pull"/><text x="90" y="30" className="arv-tag">Lua</text></g>
  </svg>;
  if(scene==="branch"){
    const lines:[string,number][]=[["M60 206V176",0],["M60 176Q40 150 36 120",1],["M60 176Q76 150 88 124",1],["M36 120Q28 90 30 60",2],["M36 120Q50 100 54 88",2],["M88 124Q84 96 74 72",2],["M88 124Q108 96 118 70",2],["M30 60Q24 40 26 18",3],["M118 70Q112 44 106 18",3],["M118 70Q134 46 146 20",3],["M220 206V170",0],["M220 170Q200 140 196 110",1],["M220 170Q244 140 252 112",1],["M196 110Q190 80 184 56",2],["M252 112Q246 80 240 50",2],["M252 112Q274 84 286 60",2],["M240 50Q236 32 234 18",3],["M286 60Q294 40 296 18",3]];
    const dead=[[54,88],[74,72],[184,56]];
    const tips=[[26,18],[106,18],[146,20],[234,18],[296,18]];
    return <svg viewBox="0 0 320 220" className="arv-diagram">
      {[18,60,110,160].map(y=><line key={y} x1="8" x2="312" y1={y} y2={y} className="arv-gen"/>)}
      <line x1="8" x2="312" y1="206" y2="206" stroke={INK} strokeWidth="2"/>
      {lines.map(([d,lv],i)=><path key={i} d={d} pathLength={1} className="arv-draw" data-a="grow" data-lv={lv}/>)}
      {dead.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="3" fill={INK} data-a="dead"/>)}
      {tips.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" className="arv-tip" data-a="tip"/>)}
    </svg>;
  }
  if(scene==="voice")return <svg viewBox="0 0 320 220" className="arv-diagram">
    {[0,1,2].map(i=><path key={i} d={`M${46-i*14} ${84-i*10}q-${14+i*6} ${26+i*10} 0 ${52+i*20}`} className="arv-pull" data-a="wave"/>)}
    <path d="M52 76L118 102V118L52 144Z" className="arv-horn"/>
    <rect x="118" y="88" width="132" height="44" rx="6" className="arv-drum"/>
    <path d="M124 110q6 -14 12 0t12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0 12 0" pathLength={1} className="arv-draw arv-groove" data-a="groove"/>
    <path d="M250 110h30v-26" stroke={INK} strokeWidth="4" fill="none" strokeLinecap="round"/>
    <path d="M100 152h170" stroke={INK} strokeWidth="3"/>
    <text x="175" y="186" className="arv-quote" data-a="quote">“Mary had a little lamb…”</text>
  </svg>;
  if(scene==="net")return <svg viewBox="0 0 320 220" className="arv-diagram">
    <path d="M100 132C140 176 180 176 220 132" className="arv-cable"/>
    <g className="arv-term"><rect x="14" y="62" width="86" height="64" rx="6"/><rect x="24" y="72" width="66" height="44" className="arv-screen"/><path d="M40 126l-6 16h46l-6 -16"/></g>
    <g className="arv-term"><rect x="220" y="62" width="86" height="64" rx="6"/><rect x="230" y="72" width="66" height="44" className="arv-screen"/><path d="M246 126l-6 16h46l-6 -16"/></g>
    <text x="57" y="164" className="arv-tag">UCLA</text><text x="263" y="164" className="arv-tag">Stanford</text>
    <text x="244" y="102" className="arv-letter arv-onscreen" data-a="gotL">L</text>
    <text x="262" y="102" className="arv-letter arv-onscreen" data-a="gotO">O</text>
    {["L","O","G"].map(c=><g key={c} data-a={"fly"+c}><circle cx="0" cy="0" r="12" className="arv-packet"/><text y="5" className="arv-letter">{c}</text></g>)}
    <path d="M150 150l8 -8 4 10 8 -10" className="arv-break" data-a="break"/>
  </svg>;
  if(scene==="you")return <svg viewBox="0 0 320 220" className="arv-diagram">
    <circle cx="160" cy="110" r="96" className="arv-glow" data-a="glow"/>
    <defs><clipPath id="arv-phone"><rect x="126" y="30" width="68" height="152" rx="6"/></clipPath></defs>
    <rect x="118" y="18" width="84" height="178" rx="14" className="arv-phone"/>
    <g clipPath="url(#arv-phone)"><rect x="126" y="30" width="68" height="152" fill="#fbf7ec"/>
      <g data-a="feed">{Array.from({length:9},(_,i)=><g key={i} transform={`translate(0 ${i*34})`}><rect x="134" y="38" width="52" height="14" rx="2" fill={i%3===1?"#c9b8d3":"#ddd2bd"}/><rect x="134" y="56" width="36" height="4" rx="2" fill="#bcae95"/></g>)}</g>
    </g>
  </svg>;
  return null;
}

export function TreeExperience(){
  preload(beats[1].img!,{as:"image",fetchPriority:"high"});
  preload(beats[2].img!,{as:"image"});
  const track=useRef<HTMLDivElement>(null);
  const stage=useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const root=stage.current;
    if(!root)return;
    const memo=new WeakMap<Element,Record<string,string>>();
    const put=(el:Element|null|undefined,name:string,value:string)=>{
      if(!el)return;
      let m=memo.get(el);
      if(!m){m={};memo.set(el,m)}
      if(m[name]===value)return;
      m[name]=value;
      (el as HTMLElement).style.setProperty(name,value);
    };
    const q=<T extends Element>(s:string)=>root.querySelector<T>(s);
    const layers=[...root.querySelectorAll<HTMLElement>(".arv-beat")];
    const anim=layers.map(l=>{
      const m:Record<string,Element[]>={};
      l.querySelectorAll("[data-a]").forEach(el=>{const k=el.getAttribute("data-a")!;(m[k]||=[]).push(el)});
      return m;
    });
    const faces=layers.map(l=>l.querySelector<HTMLImageElement>("img[data-src]"));
    const year=q<HTMLElement>(".arv-year b");
    const groups=[...root.querySelectorAll(".arv-leafgroup")];
    const apple=q(".arv-treeapple"),fall=q(".arv-falling"),sun=q(".arv-sun"),snow=q(".arv-snow"),art=q(".arv-tree"),soil=q(".arv-ground");
    const reduce=matchMedia("(prefers-reduced-motion: reduce)");

    const load=(i:number)=>{const img=faces[i];if(img&&!img.src)img.src=img.dataset.src!};

    const drawScene=(k:number,p:number)=>{
      const a=anim[k];
      const one=(n:string,prop:string,v:string)=>a[n]?.forEach(el=>put(el,prop,v));
      switch(beats[k].scene){
        case "sun":{
          const s=ramp(p,.05,.45),t=ramp(p,.45,1)*Math.PI*1.7;
          one("sun","transform",`translate(${f1(42+118*s)}px,112px)`);
          const ex=160+(118*Math.cos(-t))*s,ey=112+(66*Math.sin(-t))*s;
          one("earth","transform",`translate(${f1(ex)}px,${f1(ey)}px)`);
          break;
        }
        case "apple":{
          one("moon","transform",`rotate(${f1(8+ramp(p,0,1)*62)}deg)`);
          const d=ramp(p,.3,.6);
          one("miniapple","transform",`translateY(${f1(d*d*10)}px)`);
          one("applepull","opacity",ramp(p,.2,.35).toFixed(2));
          break;
        }
        case "branch":{
          a.grow?.forEach(el=>{const lv=Number(el.getAttribute("data-lv"));put(el,"stroke-dashoffset",(1-ramp(p,.05+lv*.13,.22+lv*.13)).toFixed(3))});
          one("dead","opacity",ramp(p,.55,.65).toFixed(2));
          one("tip","opacity",ramp(p,.68,.8).toFixed(2));
          break;
        }
        case "voice":{
          one("groove","stroke-dashoffset",(1-ramp(p,.05,.55)).toFixed(3));
          a.wave?.forEach((el,i)=>put(el,"opacity",(ramp(p,.45+i*.08,.55+i*.08)*(.55+.45*Math.sin(p*18-i)**2)).toFixed(2)));
          one("quote","opacity",ramp(p,.6,.8).toFixed(2));
          break;
        }
        case "net":{
          const at=(t:number)=>`translate(${f1(112+96*t)}px,${f1(96-Math.sin(t*Math.PI)*22)}px)`;
          const L=ramp(p,.05,.3),O=ramp(p,.3,.55),G=ramp(p,.55,.72)*.5;
          one("flyL","transform",at(L));one("flyL","opacity",(ramp(p,0,.05)*(1-ramp(p,.3,.34))).toFixed(2));
          one("flyO","transform",at(O));one("flyO","opacity",(ramp(p,.25,.3)*(1-ramp(p,.55,.59))).toFixed(2));
          one("flyG","transform",at(G));one("flyG","opacity",(ramp(p,.5,.55)*(1-ramp(p,.78,.88))).toFixed(2));
          one("gotL","opacity",ramp(p,.29,.32).toFixed(2));
          one("gotO","opacity",ramp(p,.54,.57).toFixed(2));
          one("break","opacity",ramp(p,.74,.8).toFixed(2));
          break;
        }
        case "you":{
          one("feed","transform",`translateY(${f1(-ramp(p,.05,1)*140)}px)`);
          one("glow","opacity",(.25+ramp(p,0,.4)*.55).toFixed(2));
          break;
        }
      }
    };

    const paint=(pos:number,season:number)=>{
      const i=Math.min(N-1,Math.floor(pos)),u=pos-i;
      const cur=beats[i],nxt=beats[Math.min(N-1,i+1)];
      load(i);load(i+1);
      layers.forEach((el,k)=>{
        let o=0,p=0,y=0;
        if(k===i){o=i<N-1?1-ramp(u,.6,.72):1;p=ramp(u,.03,.55);y=-(1-o)*14}
        else if(k===i+1){o=ramp(u,.86,1);y=(1-o)*18}
        put(el,"opacity",o.toFixed(3));
        put(el,"visibility",o>.001?"visible":"hidden");
        put(el,"transform",`translate3d(0,${f1(y)}px,0)`);
        if(o>.001)drawScene(k,p);
      });
      const yr=String(Math.round(cur.year+(nxt.year-cur.year)*(i<N-1?ramp(u,.62,.98):0)));
      if(year&&year.textContent!==yr)year.textContent=yr;

      const sf=((season%4)+4)%4,a=Math.floor(sf),b=(a+1)%4;
      const t=smooth(clamp((sf-a-.35)/.65));
      const A=palette[a],B=palette[b];
      put(art,"--leaf",mixHex(A.leaf,B.leaf,t));
      put(art,"--leaf-shade",mixHex(mixHex2(A.leaf,B.leaf,t),INK,.5));
      put(soil,"--ground",mixHex(A.ground,B.ground,t));
      const amount=A.amount+(B.amount-A.amount)*t;
      groups.forEach((g,j)=>{
        const k=j%tree.groups.length,th=tree.groups[k].th,s=smooth(clamp((amount-th*.9)/.3));
        put(g,"transform",`scale(${(.2+.8*s).toFixed(3)})`);
        put(g,"opacity",clamp(s*5).toFixed(3));
      });
      const fo=ramp(sf,1.55,1.9)*(1-ramp(sf,2.65,2.95));
      put(fall,"opacity",fo.toFixed(2));
      put(fall,"--fall-play",fo>.01?"running":"paused");
      put(snow,"opacity",(ramp(sf,2.75,3)*(1-ramp(sf,3.7,3.95))).toFixed(2));
      put(sun,"opacity",(A.sun+(B.sun-A.sun)*t).toFixed(2));
      put(sun,"transform",`translate3d(0,${f1((1-(A.sun+(B.sun-A.sun)*t))*18)}svh,0)`);

      const ai=beats.findIndex(x=>x.scene==="apple");
      const ao=Number(memo.get(layers[ai])?.opacity??0);
      const ap=i===ai?ramp(u,.03,.55):0;
      const d=ramp(ap,.3,.62);
      put(apple,"opacity",ao.toFixed(3));
      put(apple,"transform",`translateY(${f1(d*d*(474-tree.apple.y-7))}px)`);
    };

    const seasonAt=(pos:number)=>{
      const i=Math.min(N-1,Math.floor(pos)),u=pos-i;
      if(i>=N-1)return beats[N-1].season;
      return beats[i].season+(beats[i+1].season-beats[i].season)*ramp(u,.6,1);
    };
    const viewH=()=>window.visualViewport?.height??window.innerHeight;
    const read=()=>{
      const el=track.current;
      if(!el)return 0;
      const total=Math.max(1,el.offsetHeight-viewH());
      return clamp(-el.getBoundingClientRect().top/total)*END;
    };

    let target=0,shown=0,seen=0,raf=0,last=0;
    const tick=(now:number)=>{
      const dt=Math.max(1,Math.min(64,now-last));
      last=now;
      shown+=(target-shown)*(1-Math.exp(-dt/110));
      if(Math.abs(target-shown)<.0005)shown=target;
      const want=seasonAt(shown);
      let gap=want-seen;
      if(Math.abs(gap)>4){seen+=Math.trunc(gap/4)*4;gap=want-seen}
      const step=RATE*dt*(shown===target?1.6:1);
      seen=Math.abs(gap)<=step?want:seen+Math.sign(gap)*step;
      paint(shown,seen);
      raf=shown===target&&seen===want?0:requestAnimationFrame(tick);
    };
    const onScroll=()=>{
      if(reduce.matches)return;
      target=read();
      if(!raf){last=performance.now();raf=requestAnimationFrame(tick)}
    };
    const settle=()=>{
      cancelAnimationFrame(raf);raf=0;
      target=shown=reduce.matches?END:read();
      seen=seasonAt(shown);
      paint(shown,seen);
    };

    settle();
    const ro=new ResizeObserver(settle);
    if(track.current)ro.observe(track.current);
    addEventListener("scroll",onScroll,{passive:true});
    addEventListener("resize",settle);
    window.visualViewport?.addEventListener("resize",settle);
    window.visualViewport?.addEventListener("scroll",onScroll);
    reduce.addEventListener("change",settle);
    return()=>{
      cancelAnimationFrame(raf);
      ro.disconnect();
      removeEventListener("scroll",onScroll);
      removeEventListener("resize",settle);
      window.visualViewport?.removeEventListener("resize",settle);
      window.visualViewport?.removeEventListener("scroll",onScroll);
      reduce.removeEventListener("change",settle);
    };
  },[]);

  const finaleRings=()=>Array.from({length:9}).map((_,i)=><i key={i} style={{inset:(6+i*3.5)+"%"}}/>);

  return <div className="tree-experience">
  <div className="tree-story arv-track" ref={track}>
    <div className="tree-story-stage arv-stage" ref={stage} role="img" aria-label="Uma árvore fica no mesmo lugar enquanto a história passa ao lado dela: Copérnico tira a Terra do centro em 1543, Newton liga a maçã e a Lua em 1687, Darwin mostra que as espécies são parentes em 1859, Edison grava a voz em 1877, a ARPANET manda a primeira mensagem em 1969 e, em 2026, você.">
      <i className="arv-sun"/>
      <svg className="arv-ground" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 22Q120 8 260 18T520 14T780 20T1000 12V100H0Z" className="arv-soil"/>
        <path d="M0 22Q120 8 260 18T520 14T780 20T1000 12" className="arv-horizon"/>
      </svg>
      <svg className="arv-tree" viewBox={tree.box} preserveAspectRatio="xMidYMax meet" style={{transformOrigin:tree.origin}} aria-hidden="true">
        <defs><pattern id="arv-dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill={INK}/></pattern></defs>
        <ellipse cx="200" cy="476" rx="120" ry="7" fill={INK} opacity=".12"/>
        <path className="arv-snow" d="M60 474q70 -8 140 -6t140 6z" fill="#fbfaf5" opacity="0"/>
        <g>
          <path d="M184 474q10 -8 14 -30M216 474q-10 -8 -14 -30M170 476q20 -4 28 -18M232 476q-20 -4 -28 -18" stroke={INK} strokeWidth="5" fill="none" strokeLinecap="round"/>
          <g className="arv-limbs">{tree.limbs.map((l,i)=><path key={i} d={l.d} strokeWidth={f1(l.w)}/>)}</g>
          <g transform="translate(4 5)">{tree.groups.map((g,i)=><path key={i} d={g.d} className="arv-leafgroup arv-shade"/>)}</g>
          {tree.groups.map((g,i)=><g key={i} className="arv-leafgroup"><path d={g.d} className="arv-leaf"/><path d={g.d} className="arv-leafdots"/></g>)}
          <g className="arv-treeapple" opacity="0"><circle cx={f1(tree.apple.x)} cy={f1(tree.apple.y)} r="7" className="arv-apple"/><path d={`M${f1(tree.apple.x)} ${f1(tree.apple.y-7)}l2 -5`} stroke={INK} strokeWidth="1.6"/></g>
        </g>
        <g className="arv-falling" opacity="0">{leaves.map(([x,y],i)=><path key={i} d={`M${x} ${y}q5 -6 10 0q-5 6 -10 0z`} className={"arv-fall arv-fall-"+i}/>)}</g>
      </svg>
      <p className="arv-year" aria-hidden="true"><b>1500</b></p>
      <p className="arv-scroll-hint" aria-hidden="true">role para avançar</p>
      <p className="arv-scroll-hint" aria-hidden="true">role para avançar</p>
      {beats.map((b,i)=><div key={b.year} className={"arv-beat arv-beat-"+b.scene} aria-hidden="true" style={{opacity:i?0:1,visibility:i?"hidden":"visible"}}>
        <div className="arv-col">
          <div className="arv-copy">
            <small>{b.who}</small>
            <h2>{b.title}</h2>
            <p>{b.line}</p>
          </div>
          {b.scene!=="open"&&<div className="arv-example">
            {b.img&&<figure className="arv-face"><img alt="" draggable={false} decoding="async" data-src={b.img} src={i<3?b.img:undefined} style={{objectPosition:b.pos}}/></figure>}
            <div className="arv-visual"><Visual scene={b.scene}/></div>
          </div>}
        </div>
      </div>)}
      <i className="arv-halftone"/>
      <p className="arv-credit">retratos e foto: Wikimedia Commons · domínio público</p>
    </div>
  </div>
    <section className="tree-finale">
      <div className="tree-rings-stage">
        <div className="tree-rings collage-rings" aria-hidden="true">
          {finaleRings()}
          <span>526</span>
        </div>
        <div className="tree-rings collage-rings is-reflection" aria-hidden="true">{finaleRings()}</div>
      </div>
      <div>
        <small>uma árvore imaginária</small>
        <h2>A história parece diferente quando a régua está viva.</h2>
        <p>Para nós foram descobertas, máquinas, redes e séculos. Para a árvore foram estações, água, luz e crescimento.</p>
      </div>
    </section>
  </div>;
}
