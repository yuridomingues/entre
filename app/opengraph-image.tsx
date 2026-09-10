import { ImageResponse } from "next/og";
export const alt="ENTRE | coisas para pensar com as mãos";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fffdf8",color:"#111",padding:"70px",border:"18px solid #111",fontFamily:"Arial, sans-serif"}}>
    <div style={{display:"flex",flexDirection:"column",width:"68%"}}>
      <div style={{display:"flex",fontWeight:900,fontSize:104,letterSpacing:"-7px",lineHeight:.9}}>ENTRE</div>
      <div style={{display:"flex",fontSize:34,marginTop:28}}>coisas para pensar com as mãos</div>
      <div style={{display:"flex",fontSize:22,marginTop:42}}>mente · natureza · música · conversa · tempo</div>
    </div>
    <div style={{display:"flex",position:"relative",width:"260px",height:"360px",alignItems:"flex-end",justifyContent:"center"}}>
      <div style={{display:"flex",position:"absolute",left:"36px",top:"50px",width:"88px",height:"245px",background:"#8d5cf6",border:"8px solid #111",borderRadius:"10px"}}></div>
      <div style={{display:"flex",position:"absolute",left:"111px",top:"50px",width:"98px",height:"245px",background:"#111",clipPath:"polygon(0 0,100% 12%,100% 100%,0 78%)"}}></div>
      <div style={{display:"flex",position:"absolute",left:"50px",bottom:"20px",width:"190px",height:"105px",background:"#a6ec62",clipPath:"polygon(0 100%,32% 0,100% 100%)",borderBottom:"8px solid #111"}}></div>
    </div>
  </div>,size);
}
