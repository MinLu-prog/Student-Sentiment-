import { useEffect, useState } from 'react'
import { loginRequest, signupRequest, setAuthToken, setUnauthorizedHandler } from '@/services/postsApi'
import { AuthContext } from './auth-context'

const STORAGE_KEY = 'studentSentimentAuth'

function readStoredAuth() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.token || !parsed?.user) return null
    return parsed
  } catch {
    return null
  }
}

// localStorage reads are synchronous, so the session hydrates directly in
// useState's lazy initializer — no loading flag, no post-mount flash.
function initialSession() {
  const stored = readStoredAuth()
  if (!stored) {
    localStorage.removeItem(STORAGE_KEY)
    return { user: null, token: null }
  }
  setAuthToken(stored.token)
  return stored
}

export function AuthProvider({ children }) {
  const [{ user, token }, setSession] = useState(initialSession)

  function persistSession(session) {
    const { token: nextToken, name, email, role } = session
    const nextUser = { name, email, role }

    setSession({ user: nextUser, token: nextToken })
    setAuthToken(nextToken)
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: nextToken, user: nextUser }))
  }

  async function login(email, password) {
    const session = await loginRequest(email, password)
    persistSession(session)
  }

  async function signup(name, email, password) {
    const session = await signupRequest(name, email, password)
    persistSession(session)
  }

  function logout() {
    setSession({ user: null, token: null })
    setAuthToken(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // A 401 from a stale/invalid token (wrong JWT_SECRET, a reset database,
  // an expired token, ...) clears the session the same way logout() does,
  // so the UI falls back to guest state instead of silently failing forever.
  useEffect(() => {
    setUnauthorizedHandler(() => {
      setSession({ user: null, token: null })
      setAuthToken(null)
      localStorage.removeItem(STORAGE_KEY)
    })
  }, [])

  const value = {
    user,
    token,
    isGuest: !token,
    login,
    signup,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
