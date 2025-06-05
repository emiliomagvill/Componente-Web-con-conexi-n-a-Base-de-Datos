import Link from 'next/link'

interface User {
  id: number
  name: string
  email: string
}

async function getUsers(): Promise<User[]> {
  try {
    const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' })
    if (!res.ok) throw new Error('Error al obtener usuarios')
    return await res.json()
  } catch (err) {
    console.error('❌ ERROR EN getUsers:', err)
    return []
  }
}

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Usuarios</h1>
      <Link href="/users/new" className="text-blue-500">➕ Crear Usuario</Link>
      <ul className="mt-4 space-y-2">
        {users.length === 0 && <p>No hay usuarios aún.</p>}
        {users.map((user: User) => (
          <li key={user.id} className="border p-2 rounded">
            {user.name} — {user.email}
            <div className="flex gap-4 mt-1">
              <Link href={`/users/${user.id}/edit`} className="text-green-500 underline">Editar</Link>
              <Link href={`/users/${user.id}/delete`} className="text-red-500 underline">Eliminar</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}