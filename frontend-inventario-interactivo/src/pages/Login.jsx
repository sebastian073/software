
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Login(){
  const [email,setEmail]=useState('admin@demo.com')
  const [password,setPassword]=useState('123456')
  const [error,setError]=useState('')
  const { login } = useAuth()
  const nav = useNavigate(), loc = useLocation()

  const onSubmit=(e)=>{
    e.preventDefault()
    try{ login({email,password}); nav(loc.state?.from?.pathname || '/', {replace:true}) } catch(err){ setError(err.message) }
  }

  return <div className="container" style={{maxWidth:420}}>
    <div className="card">
      <h2>Iniciar sesión</h2>
      <p style={{color:'var(--muted)'}}>Usa cualquier correo y clave para entrar (demo).</p>
      <form className="grid" onSubmit={onSubmit}>
        <div><label>Correo</label><input className="input" value={email} onChange={e=>setEmail(e.target.value)} type="email" required/></div>
        <div><label>Contraseña</label><input className="input" value={password} onChange={e=>setPassword(e.target.value)} type="password" required/></div>
        {error && <div className="badge" style={{background:'rgba(239,68,68,.2)', borderColor:'rgba(239,68,68,.4)'}}>{error}</div>}
        <button className="button primary" type="submit">Entrar</button>
      </form>
    </div>
  </div>
}
