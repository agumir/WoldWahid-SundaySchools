import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'
import { UserRole } from '@prisma/client'

export default async function UsersPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const users = await prisma.user.findMany({
    include: {
      student: true,
      teacher: true
    },
    orderBy: { createdAt: 'desc' }
  })

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-red-100 text-red-800'
      case 'HR':
        return 'bg-blue-100 text-blue-800'
      case 'TEACHER':
        return 'bg-green-100 text-green-800'
      case 'STUDENT':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">User Management</h1>

      {users.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg">No users found.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {users.map((user) => (
            <Card key={user.id} className="hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {user.name}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Email:</span> {user.email}
                      </div>
                      {user.phone && (
                        <div>
                          <span className="font-medium">Phone:</span> {user.phone}
                        </div>
                      )}
                      {user.student && (
                        <div>
                          <span className="font-medium">Student ID:</span> {user.student.studentId}
                        </div>
                      )}
                      {user.teacher && (
                        <div>
                          <span className="font-medium">Teacher ID:</span> {user.teacher.teacherId}
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Created: {formatDate(user.createdAt, locale)}
                    </div>
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

