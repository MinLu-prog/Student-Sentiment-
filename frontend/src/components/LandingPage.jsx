import { BookOpen, GraduationCap } from 'lucide-react'
import { Link, Navigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { UNIVERSITY_NAME } from '@/data/mockDb'

export function LandingPage() {
  const { token } = useAuth()

  if (token) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div
      className="flex min-h-svh flex-col bg-[#1a2b5a] bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(26, 43, 90, 0.96) 0%, rgba(26, 43, 90, 0.84) 48%, rgba(26, 43, 90, 0.58) 100%), linear-gradient(180deg, rgba(10, 18, 42, 0.1) 0%, rgba(10, 18, 42, 0.72) 100%), url('/campus/main2.jpg')",
      }}
    >
      <header className="flex items-center gap-3 border-b border-white/10 px-5 py-4 sm:px-8">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20">
          <GraduationCap className="h-5 w-5" />
        </div>
        <div className="text-left">
          <p className="text-base font-semibold leading-tight">{UNIVERSITY_NAME}</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-blue-200/80">
            Campus Activities
          </p>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-5 py-16 text-center sm:px-8">
        <p className="mb-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/70">
          <BookOpen className="h-3.5 w-3.5" />
          Student Sentiment
        </p>
        <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          See what your campus is really talking about
        </h1>
        <p className="mb-10 max-w-xl text-base leading-relaxed text-blue-100/90 sm:text-lg">
          News, events, and stories from across the {UNIVERSITY_NAME} community — plus
          the real sentiment behind every comment.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            asChild
            className="h-11 rounded-lg bg-white px-6 text-sm font-semibold text-[#1a2b5a] hover:bg-blue-50"
          >
            <Link to="/login">Log In</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 rounded-lg border-white/30 bg-white/10 px-6 text-sm font-semibold text-white hover:bg-white/20"
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="h-11 rounded-lg px-6 text-sm font-semibold text-blue-100 hover:bg-white/10 hover:text-white"
          >
            <Link to="/blog">Continue as Guest</Link>
          </Button>
        </div>

        <p className="mt-6 max-w-md text-xs text-blue-200/70">
          Guests can browse every story and discussion — log in to like posts and join the conversation.
        </p>
      </main>
    </div>
  )
}
