
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar.jsx'
import Toasts from './components/Toasts.jsx'
import FAB from './components/FAB.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Sales from './pages/Sales.jsx'
import Expenses from './pages/Expenses.jsx'
import Products from './pages/Products.jsx'
import { useAuth } from './store/auth.js'

function Protected({children}){
  const { user } = useAuth()
  const loc = useLocation()
  if(!user) return <Navigate to="/login" state={{from:loc}} replace />
  return children
}

export default function App(){
  return <div>
    <NavBar />
    <div className="container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Protected><Dashboard /></Protected>} />
        <Route path="/ventas" element={<Protected><Sales /></Protected>} />
        <Route path="/gastos" element={<Protected><Expenses /></Protected>} />
        <Route path="/productos" element={<Protected><Products /></Protected>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
    <Toasts />
    <FAB label="+" onClick={()=> window.scrollTo({top:0, behavior:'smooth'})} />
    <div className="footer">Demo local con LocalStorage. Fácil de migrar a Firebase / Supabase.</div>
  </div>
}
