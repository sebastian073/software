
import { create } from 'zustand'
export const useAuth = create((set)=>({
  user: JSON.parse(localStorage.getItem('auth_user')||'null'),
  login: ({email,password})=>{ const user={id:'u1',email,name:email.split('@')[0]}; localStorage.setItem('auth_user', JSON.stringify(user)); set({user}); return user },
  logout: ()=>{ localStorage.removeItem('auth_user'); set({ user:null }) }
}))
