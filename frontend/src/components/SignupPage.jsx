import { useState } from 'react'
import { ArrowLeft, GraduationCap } from 'lucide-react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/context/AuthContext'
import { UNIVERSITY_NAME } from '@/data/mockDb'

const MIN_PASSWORD_LENGTH = 8

export function SignupPage() {
  const { signup, token } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (token) {
    return <Navigate to="/blog" replace />
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Password must be at least ${MIN_PASSWORD_LENGTH} characters.`)
      return
    }

    setIsSubmitting(true)

    try {
      await signup(name.trim(), email.trim(), password)
      navigate('/blog')
    } catch (err) {
      setError(err.message || 'Unable to sign up. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex min-h-svh flex-col bg-[#1a2b5a] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(26, 43, 90, 0.96) 0%, rgba(26, 43, 90, 0.84) 48%, rgba(26, 43, 90, 0.58) 100%), linear-gradient(180deg, rgba(10, 18, 42, 0.1) 0%, rgba(10, 18, 42, 0.72) 100%), url('/campus/main2.jpg')",
      }}
    >
      <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="text-left">
            <p className="text-base font-semibold leading-tight">{UNIVERSITY_NAME}</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
              Campus Activities
            </p>
          </div>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-blue-100 hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
        <form onSubmit={handleSubmit} className="w-full max-w-sm text-left">
          <h1 className="mb-2 text-2xl font-bold tracking-tight sm:text-3xl">Sign Up</h1>
          <p className="mb-8 text-sm text-blue-100/80">
            Create an account to like posts and join the discussion.
          </p>

          <div className="space-y-4">
            <div>
              <label htmlFor="signup-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-blue-200/80">
                Name
              </label>
              <Input
                id="signup-name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your full name"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-blue-200/80">
                Email
              </label>
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@miit.edu.mm"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.1em] text-blue-200/80">
                Password
              </label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
              />
            </div>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/15 px-3 py-2 text-sm font-medium text-red-200">
              {error}
            </p>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 h-11 w-full rounded-lg bg-white text-sm font-semibold text-[#1a2b5a] hover:bg-blue-50"
          >
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>

          <p className="mt-6 text-center text-sm text-blue-100/80">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold text-white underline-offset-2 hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </main>
    </div>
  )
}
