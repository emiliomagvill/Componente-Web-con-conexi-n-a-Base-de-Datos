'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(`/api/users/${params.id}`)
      if (!res.ok) return
      const data = await res.json()
      setName(data.name)
      setEmail(data.email)
      setLoading(false)
    }

    fetchUser()
  }, [params.id])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const res = await fetch(`/api/users/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    if (res.ok) {
      router.push('/users')
    } else {
      alert('❌ Error al actualizar')
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Editar Usuario</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
          className="border p-2 w-full"
        />
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Guardar
        </button>
      </form>
    </div>
  )
}