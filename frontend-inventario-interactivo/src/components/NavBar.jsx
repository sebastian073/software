
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth'
import ThemeToggle from './ThemeToggle'

export default function NavBar(){
  const { user, logout } = useAuth()
  const nav = useNavigate()
  return <nav className="nav container">
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <span className="badge">Inventario Interactivo</span>
    </div>
    {user && <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <NavLink to="/" end>Inicio</NavLink>
      <NavLink to="/ventas">Ventas</NavLink>
      <NavLink to="/gastos">Gastos</NavLink>
      <NavLink to="/productos">Productos</NavLink>
      <span className="badge">👤 {user.name}</span>
      <ThemeToggle />
      <button className="button" onClick={()=>{ logout(); nav('/login') }}>Salir</button>
    </div>}
  </nav>
}
