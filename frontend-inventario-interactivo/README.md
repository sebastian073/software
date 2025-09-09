
# Frontend Inventario Interactivo

SPA en React + Vite con **inicio de sesión**, **ventas**, **gastos** y **productos**.
Ahora con interactividad mejorada: toasts con *deshacer*, modales, buscador/ordenamiento,
sparklines de ventas y tema claro/oscuro.

## ▶️ Ejecutar
```bash
npm i
npm run dev
```

## ✅ Funcionalidades
- Login de demostración (cualquier correo/clave).
- Dashboard con KPIs y sparkline (últimos 7 días).
- Ventas: control de cantidad con teclas `+`/`-`, modal resumen, *Deshacer*.
- Gastos: notificación con *Deshacer*.
- Productos: buscar (`/`), ordenar, agregar/editar/eliminar con confirmación y *Deshacer*.
- Botón flotante (FAB) para volver arriba.
- Tema claro/oscuro.

## 🔁 Migrable a Firebase/Supabase
Reemplaza `store/data.js` por CRUD en Firestore/Supabase y `store/auth.js` por Auth.
