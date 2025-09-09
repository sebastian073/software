
import { useEffect } from 'react'
export default function Modal({ open, title, children, onClose }){
  useEffect(()=>{ const f=(e)=> e.key==='Escape' && onClose?.(); if(open) window.addEventListener('keydown', f); return ()=> window.removeEventListener('keydown', f) }, [open])
  if(!open) return null
  return <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,.4)',display:'grid',placeItems:'center',zIndex:1000}} onClick={onClose}>
    <div className="card" style={{width:'min(92vw,560px)'}} onClick={(e)=>e.stopPropagation()}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
        <h3 style={{margin:0}}>{title}</h3>
        <button className="button" onClick={onClose}>✕</button>
      </div>
      {children}
    </div>
  </div>
}
