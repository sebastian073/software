
export function uid(){ return Math.random().toString(36).slice(2) + Date.now().toString(36) }
export function currency(n){ return new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP', maximumFractionDigits:0}).format(Number(n||0)) }
