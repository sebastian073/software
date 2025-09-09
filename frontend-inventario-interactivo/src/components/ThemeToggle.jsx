
import { useEffect, useState } from 'react'
export default function ThemeToggle(){
  const [theme,setTheme] = useState(localStorage.getItem('theme')||'dark')
  useEffect(()=>{ localStorage.setItem('theme', theme); if(theme==='light') document.documentElement.classList.add('light'); else document.documentElement.classList.remove('light') }, [theme])
  return <button className="button" onClick={()=> setTheme(t=> t==='dark'?'light':'dark')}>Tema: {theme==='dark'?'🌙':'🌤️'}</button>
}
