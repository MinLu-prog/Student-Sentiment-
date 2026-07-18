import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { deletePost, fetchPosts } from '@/services/postsApi'

export function AdminPostsPage() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts() {
    setIsLoading(true)
    setError('')

    try {
      const data = await fetchPosts({})
      setPosts(data)
    } catch {
      setError('Unable to load posts right now.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleDelete(post) {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return

    try {
      await deletePost(post.id)
      setPosts((current) => current.filter((item) => item.id !== post.id))
    } catch {
      window.alert('Unable to delete this post right now.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#1a2b5a]">Posts</h1>
        <Button asChild className="rounded-lg">
          <Link to="/admin/posts/new">
            <Plus className="h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading posts...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Campus</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3">Reads</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="max-w-xs truncate px-4 py-3 font-medium text-[#1a2b5a]">
                    {post.title}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{post.category}</td>
                  <td className="px-4 py-3 text-slate-600">{post.campus}</td>
                  <td className="px-4 py-3 text-slate-600">{post.date}</td>
                  <td className="px-4 py-3">
                    {post.featured && (
                      <Badge className="rounded-md border-0 bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-[#1a2b5a] hover:bg-blue-100">
                        Featured
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{post.reads}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <Button asChild type="button" variant="ghost" size="icon" className="h-8 w-8">
                        <Link to={`/admin/posts/${post.id}/edit`} aria-label="Edit post">
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
                        onClick={() => handleDelete(post)}
                        aria-label="Delete post"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No posts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
