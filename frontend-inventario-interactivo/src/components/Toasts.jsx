
import { create } from 'zustand'
import { useEffect } from 'react'

const useToasts = create((set)=>({ list:[], push:(t)=>set(s=>({list:[...s.list,{ id:Math.random().toString(36).slice(2), ...t }]})), remove:(id)=>set(s=>({list:s.list.filter(x=>x.id!==id)})) }))
export function toast(message, opts={}){ useToasts.getState().push({ message, ...opts }) }
export default function Toasts(){
  const list = useToasts(s=>s.list), remove = useToasts(s=>s.remove)
  useEffect(()=>{ const timers = list.map(t=> setTimeout(()=> remove(t.id), t.duration||3500)); return ()=> timers.forEach(clearTimeout) }, [list])
  return <div style={{position:'fixed',right:16,bottom:16,display:'flex',flexDirection:'column',gap:8,zIndex:9999}}>
    {list.map(t=> <div key={t.id} className="card" style={{minWidth:260, background:'rgba(17,24,39,.9)', borderColor:'rgba(255,255,255,.15)'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',gap:12}}>
        <div>{t.message}</div>
        {t.action && <button className="button" onClick={()=>{ t.action.onClick?.(); remove(t.id) }}>{t.action.label}</button>}
      </div>
    </div>)}
  </div>
}
