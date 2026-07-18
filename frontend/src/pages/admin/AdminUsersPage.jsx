import { useEffect, useState } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAuth } from '@/context/AuthContext'
import { createUserAdmin, deleteUser, fetchUsers, updateUser } from '@/services/postsApi'

const LIGHT_INPUT = 'border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus-visible:ring-[#1a2b5a]/20'

const EMPTY_NEW_USER = { name: '', email: '', password: '', role: 'USER' }

export function AdminUsersPage() {
  const { user: currentUser } = useAuth()
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNewUserForm, setShowNewUserForm] = useState(false)
  const [newUser, setNewUser] = useState(EMPTY_NEW_USER)
  const [newUserError, setNewUserError] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    setIsLoading(true)
    setError('')

    try {
      const data = await fetchUsers()
      setUsers(data)
    } catch {
      setError('Unable to load users right now.')
    } finally {
      setIsLoading(false)
    }
  }

  async function handleRoleChange(targetUser, role) {
    try {
      const updated = await updateUser(targetUser.id, { role })
      setUsers((current) => current.map((item) => (item.id === updated.id ? updated : item)))
    } catch (err) {
      window.alert(err.message || 'Unable to update this user.')
    }
  }

  async function handleDelete(targetUser) {
    if (!window.confirm(`Delete ${targetUser.name}? This cannot be undone.`)) return

    try {
      await deleteUser(targetUser.id)
      setUsers((current) => current.filter((item) => item.id !== targetUser.id))
    } catch (err) {
      window.alert(err.message || 'Unable to delete this user.')
    }
  }

  async function handleCreateUser(event) {
    event.preventDefault()
    setNewUserError('')
    setIsCreating(true)

    try {
      const created = await createUserAdmin(newUser)
      setUsers((current) => [...current, created])
      setNewUser(EMPTY_NEW_USER)
      setShowNewUserForm(false)
    } catch (err) {
      setNewUserError(err.message || 'Unable to create this user.')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-[#1a2b5a]">Users</h1>
        <Button type="button" className="rounded-lg" onClick={() => setShowNewUserForm((v) => !v)}>
          <Plus className="h-4 w-4" />
          New User
        </Button>
      </div>

      {showNewUserForm && (
        <form
          onSubmit={handleCreateUser}
          className="grid gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-2"
        >
          <Input
            required
            placeholder="Name"
            value={newUser.name}
            onChange={(event) => setNewUser((f) => ({ ...f, name: event.target.value }))}
            className={LIGHT_INPUT}
          />
          <Input
            required
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(event) => setNewUser((f) => ({ ...f, email: event.target.value }))}
            className={LIGHT_INPUT}
          />
          <Input
            required
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(event) => setNewUser((f) => ({ ...f, password: event.target.value }))}
            className={LIGHT_INPUT}
          />
          <Select value={newUser.role} onValueChange={(value) => setNewUser((f) => ({ ...f, role: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USER">USER</SelectItem>
              <SelectItem value="ADMIN">ADMIN</SelectItem>
            </SelectContent>
          </Select>

          {newUserError && (
            <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              {newUserError}
            </p>
          )}

          <div className="flex items-center gap-3 sm:col-span-2">
            <Button type="submit" disabled={isCreating} className="rounded-lg">
              {isCreating ? 'Creating...' : 'Create User'}
            </Button>
            <Button type="button" variant="outline" className="rounded-lg" onClick={() => setShowNewUserForm(false)}>
              Cancel
            </Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
          Loading users...
        </div>
      ) : error ? (
        <div className="rounded-xl border border-red-100 bg-red-50 p-8 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {users.map((row) => {
                const isSelf = row.email === currentUser?.email
                return (
                  <tr key={row.id}>
                    <td className="px-4 py-3 font-medium text-[#1a2b5a]">
                      {row.name}
                      {isSelf && (
                        <Badge className="ml-2 rounded-md border-0 bg-blue-100 px-2 py-0.5 text-[11px] font-semibold text-[#1a2b5a] hover:bg-blue-100">
                          You
                        </Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{row.email}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={row.role}
                        disabled={isSelf}
                        onValueChange={(value) => handleRoleChange(row, value)}
                      >
                        <SelectTrigger className="h-8 w-28">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={isSelf}
                          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700 disabled:text-slate-300"
                          onClick={() => handleDelete(row)}
                          aria-label="Delete user"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
