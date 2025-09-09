
import { useEffect, useMemo, useState } from 'react'
import { useData } from '../store/data'
import { currency } from '../utils/helpers'
import Modal from '../components/Modal'
import { toast } from '../components/Toasts'

export default function Products(){
  const { products, addProduct, updateProduct, deleteProduct, undo } = useData()
  const [form, setForm] = useState({ name:'', sku:'', price: 0, stock: 0 })
  const [editing, setEditing] = useState(null)
  const [confirm, setConfirm] = useState(null)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState({ by:'name', dir:'asc' })

  const submit = (e) => {
    e.preventDefault()
    if(editing){
      updateProduct(editing, form)
      toast('Producto actualizado')
      setEditing(null)
    } else {
      addProduct(form)
      toast('Producto agregado', { action:{ label:'Deshacer', onClick: ()=> undo() } })
    }
    setForm({ name:'', sku:'', price: 0, stock: 0 })
  }

  const onEdit = (p) => {
    setEditing(p.id)
    setForm({ name:p.name, sku:p.sku, price:p.price, stock:p.stock })
  }

  const filtered = useMemo(()=>{
    const t = q.trim().toLowerCase()
    const arr = t ? products.filter(p => [p.name, p.sku].some(x => x.toLowerCase().includes(t))) : products.slice()
    arr.sort((a,b)=>{
      const A = a[sort.by], B = b[sort.by]
      if(A < B) return sort.dir==='asc' ? -1 : 1
      if(A > B) return sort.dir==='asc' ? 1 : -1
      return 0
    })
    return arr
  }, [products, q, sort])

  useEffect(()=>{
    const onKey=(e)=>{ if(e.key==='/'){ e.preventDefault(); document.getElementById('searchProducts')?.focus() } if(e.key.toLowerCase()==='n') setEditing(null) }
    window.addEventListener('keydown', onKey); return ()=> window.removeEventListener('keydown', onKey)
  }, [])

  return <div className="grid cols-2">
    <div className="card">
      <h3>{editing? 'Editar producto' : 'Agregar producto'}</h3>
      <form className="grid" onSubmit={submit}>
        <div><label>Nombre</label><input className="input" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required/></div>
        <div><label>SKU</label><input className="input" value={form.sku} onChange={e=>setForm({...form, sku:e.target.value})} required/></div>
        <div><label>Precio</label><input className="input" type="number" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} required/></div>
        <div><label>Stock</label><input className="input" type="number" value={form.stock} onChange={e=>setForm({...form, stock:e.target.value})} required/></div>
        <div style={{display:'flex', gap:8}}>
          <button className="button primary" type="submit">{editing? 'Guardar cambios' : 'Agregar'}</button>
          {editing && <button className="button" type="button" onClick={()=>{ setEditing(null); setForm({ name:'', sku:'', price:0, stock:0 })}}>Cancelar</button>}
        </div>
      </form>
    </div>

    <div className="card">
      <h3>Listado de productos</h3>
      <div style={{display:'flex', gap:8, margin:'8px 0'}}>
        <input id='searchProducts' className='input' placeholder='Buscar por nombre o SKU (atajo: /)' value={q} onChange={e=>setQ(e.target.value)} />
        <select className='select' value={sort.by} onChange={e=>setSort(s=>({...s, by:e.target.value}))}>
          <option value='name'>Nombre</option>
          <option value='sku'>SKU</option>
          <option value='price'>Precio</option>
          <option value='stock'>Stock</option>
        </select>
        <button className='button' onClick={()=> setSort(s=> ({...s, dir: s.dir==='asc'?'desc':'asc'}))}>Orden: {sort.dir}</button>
      </div>
      <table className="table">
        <thead><tr><th>Nombre</th><th>SKU</th><th>Precio</th><th>Stock</th><th></th></tr></thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td><span className="badge">{p.sku}</span></td>
              <td>{currency(p.price)}</td>
              <td>{p.stock}</td>
              <td style={{display:'flex', gap:8}}>
                <button className="button" onClick={()=>onEdit(p)}>Editar</button>
                <button className="button danger" onClick={()=> setConfirm(p)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <Modal open={!!confirm} onClose={()=>setConfirm(null)} title="Confirmar eliminación">
      <p>¿Eliminar <b>{confirm?.name}</b>?</p>
      <div style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
        <button className="button" onClick={()=>setConfirm(null)}>Cancelar</button>
        <button className="button danger" onClick={()=>{ deleteProduct(confirm.id); setConfirm(null); toast('Producto eliminado', { action:{ label:'Deshacer', onClick: ()=> undo() } }) }}>Eliminar</button>
      </div>
    </Modal>
  </div>
}
