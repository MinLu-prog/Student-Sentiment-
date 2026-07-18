import { Navigate, Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/components/LandingPage'
import { LoginPage } from '@/components/LoginPage'
import { SignupPage } from '@/components/SignupPage'
import { AppShell } from '@/components/AppShell'
import { AdminRoute } from '@/components/AdminRoute'
import { AdminShell } from '@/components/AdminShell'
import { BlogFeedPage } from '@/pages/BlogFeedPage'
import { PostDetailPage } from '@/pages/PostDetailPage'
import { CampusTourPage } from '@/pages/CampusTourPage'
import { SentimentPage } from '@/pages/SentimentPage'
import { AdminPostsPage } from '@/pages/admin/AdminPostsPage'
import { AdminPostFormPage } from '@/pages/admin/AdminPostFormPage'
import { AdminUsersPage } from '@/pages/admin/AdminUsersPage'
import { AdminTourStopsPage } from '@/pages/admin/AdminTourStopsPage'
import { AdminTourStopFormPage } from '@/pages/admin/AdminTourStopFormPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route element={<AppShell />}>
        <Route path="/blog" element={<BlogFeedPage />} />
        <Route path="/blog/:postId" element={<PostDetailPage />} />
        <Route path="/campus-tour" element={<CampusTourPage />} />
        <Route path="/sentiment" element={<SentimentPage />} />
      </Route>
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminShell />}>
          <Route index element={<Navigate to="posts" replace />} />
          <Route path="posts" element={<AdminPostsPage />} />
          <Route path="posts/new" element={<AdminPostFormPage />} />
          <Route path="posts/:postId/edit" element={<AdminPostFormPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="tour-stops" element={<AdminTourStopsPage />} />
          <Route path="tour-stops/new" element={<AdminTourStopFormPage />} />
          <Route path="tour-stops/:stopId/edit" element={<AdminTourStopFormPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
