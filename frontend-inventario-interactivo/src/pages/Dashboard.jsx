
import { useData } from '../store/data'
import { currency } from '../utils/helpers'
import Sparkline from '../components/Sparkline'

export default function Dashboard(){
  const { products, sales, expenses } = useData()
  const totalStock = products.reduce((a,b)=>a+b.stock,0)
  const invValue = products.reduce((a,b)=>a + (b.price*b.stock), 0)
  const today = new Date().toISOString().slice(0,10)
  const daySales = sales.filter(s => s.date.slice(0,10) === today)
  const dayIncome = daySales.reduce((a,b)=>a + b.total,0)
  const dayExpenses = expenses.filter(e => e.date.slice(0,10) === today).reduce((a,b)=>a + b.amount,0)
  const series = Array.from({length:7}).map((_,i)=>{ const d=new Date(); d.setDate(d.getDate()-(6-i)); const k=d.toISOString().slice(0,10); return sales.filter(s=> s.date.slice(0,10)===k).reduce((a,b)=>a+b.total,0) })

  return <div className="grid cols-3">
    <div className="card">
      <h3>Ventas de hoy</h3>
      <div style={{fontSize:28, fontWeight:700}}>{currency(dayIncome)}</div>
      <div className="badge">Movimientos: {daySales.length}</div>
    </div>
    <div className="card">
      <h3>Gastos de hoy</h3>
      <div style={{fontSize:28, fontWeight:700}}>{currency(dayExpenses)}</div>
      <div className="badge">Registros: {expenses.filter(e => e.date.slice(0,10)===today).length}</div>
    </div>
    <div className="card">
      <h3>Inventario</h3>
      <div style={{fontSize:28, fontWeight:700}}>{totalStock} unidades</div>
      <div className="badge">Valor aprox: {currency(invValue)}</div>
    </div>

    <div className="card" style={{gridColumn:'1 / -1'}}>
      <h3>Tendencia de ventas (7 días)</h3>
      <Sparkline data={series} />
    </div>
  </div>
}
