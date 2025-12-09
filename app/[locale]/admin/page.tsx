import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, GraduationCap, Newspaper, Calendar, ClipboardCheck, BookOpen } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function AdminDashboard({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('admin')

  const [
    studentCount,
    teacherCount,
    newsCount,
    eventCount,
    resourceCount,
    attendanceToday
  ] = await Promise.all([
    prisma.student.count(),
    prisma.teacher.count(),
    prisma.news.count(),
    prisma.event.count({ where: { startDate: { gte: new Date() } } }),
    prisma.resource.count(),
    prisma.attendance.count({ where: { date: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } } })
  ])

  const stats = [
    {
      title: 'Students',
      value: studentCount,
      icon: Users,
      color: 'bg-blue-500',
      href: `/${locale}/admin/students`
    },
    {
      title: 'Teachers',
      value: teacherCount,
      icon: GraduationCap,
      color: 'bg-green-500',
      href: `/${locale}/admin/teachers`
    },
    {
      title: 'News Articles',
      value: newsCount,
      icon: Newspaper,
      color: 'bg-purple-500',
      href: `/${locale}/admin/news`
    },
    {
      title: 'Upcoming Events',
      value: eventCount,
      icon: Calendar,
      color: 'bg-orange-500',
      href: `/${locale}/admin/events`
    },
    {
      title: 'Resources',
      value: resourceCount,
      icon: BookOpen,
      color: 'bg-pink-500',
      href: `/${locale}/admin/resources`
    },
    {
      title: 'Today\'s Attendance',
      value: attendanceToday,
      icon: ClipboardCheck,
      color: 'bg-teal-500',
      href: `/${locale}/admin/attendance`
    }
  ]

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="hover:shadow-lg transition cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">{stat.title}</CardTitle>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <a href={`/${locale}/admin/students/new`}>
            <Card className="hover:shadow-lg transition cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold">Add Student</h3>
              </CardContent>
            </Card>
          </a>
          <a href={`/${locale}/admin/news/new`}>
            <Card className="hover:shadow-lg transition cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <Newspaper className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold">Create News</h3>
              </CardContent>
            </Card>
          </a>
          <a href={`/${locale}/admin/events/new`}>
            <Card className="hover:shadow-lg transition cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold">Add Event</h3>
              </CardContent>
            </Card>
          </a>
          <a href={`/${locale}/admin/attendance`}>
            <Card className="hover:shadow-lg transition cursor-pointer h-full">
              <CardContent className="p-8 text-center">
                <ClipboardCheck className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-xl font-semibold">Mark Attendance</h3>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  )
}

