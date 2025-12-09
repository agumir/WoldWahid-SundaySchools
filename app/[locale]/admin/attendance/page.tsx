import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AttendanceForm from '@/components/admin/AttendanceForm'
import { formatDate } from '@/lib/utils'
import { Calendar } from 'lucide-react'

export default async function AttendancePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const students = await prisma.student.findMany({
    include: {
      user: {
        select: {
          name: true
        }
      },
      attendance: {
        where: {
          date: {
            gte: today
          }
        },
        take: 1
      }
    },
    orderBy: {
      user: {
        name: 'asc'
      }
    }
  })

  const todayAttendance = await prisma.attendance.findMany({
    where: {
      date: {
        gte: today
      }
    },
    include: {
      student: {
        include: {
          user: {
            select: {
              name: true
            }
          }
        }
      }
    }
  })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Attendance Tracking</h1>
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="h-5 w-5" />
          <span className="text-lg">{formatDate(new Date(), locale)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Mark Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <AttendanceForm students={students} todayAttendance={todayAttendance} />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Today's Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">
                    {todayAttendance.filter(a => a.present).length}
                  </div>
                  <div className="text-sm text-gray-600">Present</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-red-600">
                    {todayAttendance.filter(a => !a.present).length}
                  </div>
                  <div className="text-sm text-gray-600">Absent</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">
                    {students.length}
                  </div>
                  <div className="text-sm text-gray-600">Total Students</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

