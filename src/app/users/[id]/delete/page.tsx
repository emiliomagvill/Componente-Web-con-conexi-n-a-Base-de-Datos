'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DeleteUserPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  useEffect(() => {
    async function deleteUser() {
      const res = await fetch(`/api/users/${params.id}`, { method: 'DELETE' })
      if (res.ok) {
        router.push('/users')
      } else {
        alert('❌ Error al eliminar usuario')
      }
    }

    deleteUser()
  }, [params.id, router])

  return <p>Eliminando usuario...</p>
}