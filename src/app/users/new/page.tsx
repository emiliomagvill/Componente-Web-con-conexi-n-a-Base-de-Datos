'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewUserPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    if (!res.ok) {
      setError('No se pudo crear el usuario')
      return
    }

    router.push('/users')
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Nuevo Usuario</h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <input
          className="border p-2"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nombre"
        />
        <input
          className="border p-2"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Correo"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Crear
        </button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}