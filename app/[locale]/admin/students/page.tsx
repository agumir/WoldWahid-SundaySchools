import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Edit, Eye } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function StudentsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
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

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Students</h1>
        <Link href={`/${locale}/admin/students/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Add New Student
          </Button>
        </Link>
      </div>

      {students.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No students registered yet.</p>
            <Link href={`/${locale}/admin/students/new`}>
              <Button size="lg">Add Your First Student</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {students.map((student) => (
            <Card key={student.id} className="hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {student.user.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Student ID:</span> {student.studentId}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {student.user.email}
                      </div>
                      {student.grade && (
                        <div>
                          <span className="font-medium">Grade:</span> {student.grade}
                        </div>
                      )}
                      {student.class && (
                        <div>
                          <span className="font-medium">Class:</span> {student.class}
                        </div>
                      )}
                    </div>
                    {student.parentName && (
                      <div className="mt-2 text-sm text-gray-600">
                        <span className="font-medium">Parent:</span> {student.parentName}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/${locale}/admin/students/${student.id}`}>
                      <Button variant="outline" size="lg" className="h-12">
                        <Eye className="h-5 w-5 mr-2" />
                        View
                      </Button>
                    </Link>
                    <Link href={`/${locale}/admin/students/${student.id}/edit`}>
                      <Button size="lg" className="h-12">
                        <Edit className="h-5 w-5 mr-2" />
                        Edit
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

