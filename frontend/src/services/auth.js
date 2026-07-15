import { api } from '@/services/api'

const AUTH_USER_KEY = 'authUser'
const AUTH_TOKEN_KEY = 'authToken'

const DEMO_CREDENTIALS = {
  email: 'thiri@miit.edu.mm',
  password: 'password1',
}

export function getStoredUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function getCurrentUserId() {
  return getStoredUser()?.id ?? null
}

export function clearSession() {
  localStorage.removeItem(AUTH_TOKEN_KEY)
  localStorage.removeItem(AUTH_USER_KEY)
}

export async function login(email, password) {
  const data = await api.post(
    '/login',
    { email, password },
    { auth: false },
  )

  localStorage.setItem(AUTH_TOKEN_KEY, data.token)
  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify({
      id: getUserIdFromToken(data.token),
      name: data.name,
      email: data.email,
      role: data.role,
    }),
  )

  return getStoredUser()
}

function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return payload.id
  } catch {
    return null
  }
}

export async function ensureSession() {
  const existing = getStoredUser()
  const token = localStorage.getItem(AUTH_TOKEN_KEY)

  if (existing?.id && token) {
    return existing
  }

  return login(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password)
}
