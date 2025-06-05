import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(params.id) },
    })

    if (!user) {
      return NextResponse.json({ error: 'Usuario no encontrado' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { name, email } = await req.json()

    const user = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { name, email },
    })

    return NextResponse.json(user)
  } catch (err) {
    return NextResponse.json({ error: 'Error al actualizar' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.user.delete({ where: { id: Number(params.id) } })
    return NextResponse.json({ message: 'Usuario eliminado' })
  } catch (err) {
    return NextResponse.json({ error: 'Error al eliminar' }, { status: 500 })
  }
}