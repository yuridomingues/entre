import { ImageResponse } from "next/og";
export const alt="ENTRE | coisas para pensar com as mãos";
export const size={width:1200,height:630};
export const contentType="image/png";
export default function Image(){
 return new ImageResponse(
  <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#ffd45b",color:"#111",padding:"64px",fontFamily:"sans-serif",border:"18px solid #111"}}>
   <div style={{display:"flex",fontWeight:900,fontSize:40}}>ENTRE</div>
   <div style={{display:"flex",flexDirection:"column"}}>
    <div style={{display:"flex",fontWeight:900,fontSize:88,lineHeight:.9}}>coisas para pensar<br/>com as mãos.</div>
    <div style={{display:"flex",fontSize:24,marginTop:30}}>mente · natureza · música · conversa · tempo</div>
   </div>
  </div>,size);
}
