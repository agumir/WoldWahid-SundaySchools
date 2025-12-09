import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'HR')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()
    const { password, ...studentData } = data

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user first
    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
        nameAm: data.nameAm || null,
        phone: data.phone || null,
        role: 'STUDENT'
      }
    })

    // Create student record
    const student = await prisma.student.create({
      data: {
        userId: user.id,
        studentId: data.studentId,
        grade: data.grade || null,
        class: data.class || null,
        dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : null,
        address: data.address || null,
        parentName: data.parentName || null,
        parentPhone: data.parentPhone || null,
        parentEmail: data.parentEmail || null,
        notes: data.notes || null
      }
    })

    return NextResponse.json({ student }, { status: 201 })
  } catch (error: any) {
    console.error('Error creating student:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create student' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const students = await prisma.student.findMany({
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ students })
  } catch (error: any) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch students' },
      { status: 500 }
    )
  }
}

