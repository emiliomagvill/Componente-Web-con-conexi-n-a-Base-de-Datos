import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const users = await prisma.user.findMany()
    return NextResponse.json(users)
  } catch (err) {
    console.error('❌ ERROR GET /api/users:', err)
    return NextResponse.json({ error: 'Error al obtener usuarios' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { name, email } = await req.json()

    if (!name || !email) {
      return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
    }

    const user = await prisma.user.create({ data: { name, email } })

    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    console.error('❌ ERROR POST /api/users:', err)
    return NextResponse.json({ error: 'Error al crear usuario' }, { status: 500 })
  }
}