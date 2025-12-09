import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Edit } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function TeachersPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const teachers = await prisma.teacher.findMany({
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
        <h1 className="text-4xl font-bold">Teachers</h1>
        <Link href={`/${locale}/admin/teachers/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Add New Teacher
          </Button>
        </Link>
      </div>

      {teachers.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No teachers registered yet.</p>
            <Link href={`/${locale}/admin/teachers/new`}>
              <Button size="lg">Add Your First Teacher</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {teachers.map((teacher) => (
            <Card key={teacher.id} className="hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {teacher.user.name}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Teacher ID:</span> {teacher.teacherId}
                      </div>
                      <div>
                        <span className="font-medium">Email:</span> {teacher.user.email}
                      </div>
                      {teacher.department && (
                        <div>
                          <span className="font-medium">Department:</span> {teacher.department}
                        </div>
                      )}
                      {teacher.specialization && (
                        <div>
                          <span className="font-medium">Specialization:</span> {teacher.specialization}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/${locale}/admin/teachers/${teacher.id}/edit`}>
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

