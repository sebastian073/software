
import { useState } from 'react'
import { useData } from '../store/data'
import { currency } from '../utils/helpers'
import { toast } from '../components/Toasts'

export default function Expenses(){
  const { expenses, addExpense, undo } = useData()
  const [concept, setConcept] = useState('Arriendo')
  const [amount, setAmount] = useState(100000)
  const [msg, setMsg] = useState('')

  const submit = (e) => {
    e.preventDefault()
    addExpense({ concept, amount })
    setMsg('Gasto registrado')
    toast('Gasto registrado', { action:{ label:'Deshacer', onClick: ()=> undo() } })
  }

  return <div className="grid cols-2">
    <div className="card">
      <h3>Registrar gasto</h3>
      <form className="grid" onSubmit={submit}>
        <div><label>Concepto</label><input className="input" value={concept} onChange={e=>setConcept(e.target.value)} /></div>
        <div><label>Valor</label><input className="input" type="number" value={amount} onChange={e=>setAmount(e.target.value)} /></div>
        <button className="button danger" type="submit">Guardar gasto</button>
        {msg && <div className="badge">{msg}</div>}
      </form>
    </div>

    <div className="card">
      <h3>Últimos gastos</h3>
      <table className="table">
        <thead><tr><th>Fecha</th><th>Concepto</th><th>Valor</th></tr></thead>
        <tbody>
          {expenses.slice().reverse().map(e =>
            <tr key={e.id}>
              <td>{new Date(e.date).toLocaleString()}</td>
              <td>{e.concept}</td>
              <td>{currency(e.amount)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
}
