import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || (session.user.role !== 'ADMIN' && session.user.role !== 'HR' && session.user.role !== 'TEACHER')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { attendance } = await req.json()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Upsert attendance for each student
    const results = await Promise.all(
      attendance.map(async ({ studentId, present }: { studentId: string; present: boolean }) => {
        return prisma.attendance.upsert({
          where: {
            studentId_date: {
              studentId,
              date: today
            }
          },
          update: {
            present
          },
          create: {
            studentId,
            present,
            date: today
          }
        })
      })
    )

    return NextResponse.json({ attendance: results }, { status: 200 })
  } catch (error: any) {
    console.error('Error saving attendance:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to save attendance' },
      { status: 500 }
    )
  }
}

