import { createContext } from 'react'

// Kept in its own file (no component, no hook) so both AuthContext.jsx
// (the provider component) and useAuth.js (the hook) can import it without
// either file mixing a component/hook export with a plain value export —
// that mix is what breaks Vite's Fast Refresh for context+hook modules.
export const AuthContext = createContext(null)
