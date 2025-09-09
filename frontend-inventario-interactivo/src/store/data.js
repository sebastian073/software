
import { create } from 'zustand'
import { uid } from '../utils/helpers'

const init = ()=>{
  const raw = localStorage.getItem('inventory_data')
  if(raw) return JSON.parse(raw)
  const seed = { products:[
    { id: uid(), name:'iPhone 13 128GB', sku:'IP13-128', price:2500000, stock:5 },
    { id: uid(), name:'Xiaomi Redmi Note 12', sku:'RN12-128', price:900000, stock:12 },
    { id: uid(), name:'Samsung A34 5G', sku:'A34-128', price:1200000, stock:8 },
  ], sales:[], expenses:[] }
  localStorage.setItem('inventory_data', JSON.stringify(seed)); return seed
}
const persist = (d)=> localStorage.setItem('inventory_data', JSON.stringify(d))

export const useData = create((set,get)=>({
  ...init(),
  lastAction: null,
  addProduct: (p)=>{ const d={...get()}; const created={ id:uid(), ...p, price:Number(p.price), stock:Number(p.stock) }
    d.products.push(created); persist(d); set({ ...d, lastAction:{ type:'addProduct', payload: created } }) },
  updateProduct: (id,patch)=>{ const d={...get()}; const before=get().products.find(x=>x.id===id)
    d.products = d.products.map(x=> x.id===id ? { ...x, ...patch, price:Number(patch.price ?? x.price), stock:Number(patch.stock ?? x.stock) } : x)
    persist(d); set({ ...d, lastAction:{ type:'updateProduct', payload:{ before, after:d.products.find(x=>x.id===id) } } }) },
  deleteProduct: (id)=>{ const d={...get()}; const removed=get().products.find(x=>x.id===id)
    d.products = d.products.filter(x=>x.id!==id); persist(d); set({ ...d, lastAction:{ type:'deleteProduct', payload: removed } }) },
  createSale: ({productId, qty})=>{ const d={...get()}; const p=d.products.find(x=>x.id===productId); const n=Number(qty)
    if(!p) throw new Error('Producto no encontrado'); if(p.stock < n) throw new Error('Stock insuficiente')
    p.stock -= n; const total = n * p.price; const sale={ id:uid(), productId, qty:n, total, date:new Date().toISOString() }
    d.sales.push(sale); persist(d); set({ ...d, lastAction:{ type:'createSale', payload: sale } }); return total },
  addExpense: ({concept, amount})=>{ const d={...get()}; const exp={ id:uid(), concept, amount:Number(amount), date:new Date().toISOString() }
    d.expenses.push(exp); persist(d); set({ ...d, lastAction:{ type:'addExpense', payload: exp } }) },
  undo: ()=>{ const { lastAction } = get(); if(!lastAction) return; const d={...get()}
    switch(lastAction.type){
      case 'addProduct': d.products = d.products.filter(p=>p.id!==lastAction.payload.id); break
      case 'deleteProduct': d.products = [...d.products, lastAction.payload]; break
      case 'updateProduct': d.products = d.products.map(p=> p.id===lastAction.payload.after.id ? lastAction.payload.before : p); break
      case 'createSale': { const s=lastAction.payload; d.sales = d.sales.filter(x=>x.id!==s.id); const prod=d.products.find(p=>p.id===s.productId); if(prod) prod.stock += s.qty; break }
      case 'addExpense': d.expenses = d.expenses.filter(e=> e.id!==lastAction.payload.id); break
    }
    persist(d); set({ ...d, lastAction:null })
  }
}))
