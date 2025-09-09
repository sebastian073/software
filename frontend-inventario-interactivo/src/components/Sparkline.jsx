
import { useEffect, useRef } from 'react'
export default function Sparkline({ data=[], height=36 }){
  const ref = useRef(null)
  useEffect(()=>{
    const el=ref.current; if(!el) return; const w = el.clientWidth; el.width = w*devicePixelRatio; el.height = height*devicePixelRatio
    const ctx = el.getContext('2d'); ctx.scale(devicePixelRatio, devicePixelRatio); ctx.clearRect(0,0,w,height)
    ctx.globalAlpha=.4; ctx.beginPath(); ctx.moveTo(0,height-1); ctx.lineTo(w,height-1); ctx.stroke(); ctx.globalAlpha=1
    if(data.length<2) return; const max=Math.max(...data)||1, min=Math.min(...data), pad=4, step=(w-pad*2)/(data.length-1)
    ctx.beginPath(); data.forEach((v,i)=>{ const x=pad+i*step; const y=height-pad-((v-min)/(max-min||1))*(height-pad*2); i? ctx.lineTo(x,y) : ctx.moveTo(x,y) })
    ctx.lineWidth=2; ctx.stroke(); const grad=ctx.createLinearGradient(0,0,0,height); grad.addColorStop(0,'rgba(76,201,240,.35)'); grad.addColorStop(1,'rgba(76,201,240,0)')
    ctx.lineTo(w-pad,height-pad); ctx.lineTo(pad,height-pad); ctx.closePath(); ctx.fillStyle=grad; ctx.fill()
  }, [data, height])
  return <canvas ref={ref} style={{width:'100%',height}}/>
}
