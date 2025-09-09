
import { useEffect, useState } from 'react'
import { useData } from '../store/data'
import { currency } from '../utils/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toasts'

export default function Sales(){
  const { products, createSale, undo } = useData()
  const [productId, setProductId] = useState(products[0]?.id || '')
  const [qty, setQty] = useState(1)
  const [msg, setMsg] = useState('')
  const [open, setOpen] = useState(false)

  const product = products.find(p => p.id === productId)

  const submit = (e) => {
    e.preventDefault()
    try{
      const total = createSale({ productId, qty })
      setMsg(`Venta registrada por ${currency(total)}`)
      setOpen(true)
      toast('Venta registrada', { action:{ label:'Deshacer', onClick: ()=> undo() } })
    }catch(err){
      setMsg(err.message)
    }
  }

  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='+') setQty(q=> Number(q)+1); if(e.key==='-') setQty(q=> Math.max(1, Number(q)-1)) }
    window.addEventListener('keydown', onKey); return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return <div className="grid">
    <div className="card" style={{maxWidth:560}}>
      <h3>Registrar venta</h3>
      <form className="grid" onSubmit={submit}>
        <div>
          <label>Producto</label>
          <select className="select" value={productId} onChange={e=>setProductId(e.target.value)}>
            {products.map(p => <option key={p.id} value={p.id}>{p.name} — {currency(p.price)} (stock {p.stock})</option>)}
          </select>
        </div>
        <div>
          <label>Cantidad</label>
          <div style={{display:'flex', gap:8}}>
            <button type="button" className="button" onClick={()=> setQty(q=> Math.max(1, Number(q)-1))}>−</button>
            <input className="input" type="number" min="1" value={qty} onChange={e=>setQty(e.target.value)} />
            <button type="button" className="button" onClick={()=> setQty(q=> Number(q)+1)}>+</button>
          </div>
        </div>
        <div className="badge">Stock actual: {product?.stock ?? 0}</div>
        <div className="badge">Total: {currency((product?.price||0) * qty)}</div>
        <button className="button success" type="submit">Confirmar venta</button>
        {msg && <div className="badge">{msg}</div>}
      </form>
    </div>

    <Modal open={open} onClose={()=>setOpen(false)} title="Resumen de venta">
      <p><b>Producto:</b> {product?.name}</p>
      <p><b>Cantidad:</b> {qty}</p>
      <p><b>Total:</b> {currency((product?.price||0) * qty)}</p>
      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button className="button" onClick={()=>setOpen(false)}>Cerrar</button>
        <button className="button" onClick={()=>{ undo(); setOpen(false) }}>Deshacer</button>
      </div>
    </Modal>
  </div>
}
