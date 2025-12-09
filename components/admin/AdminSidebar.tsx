'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLocale } from 'next-intl'
import { 
  LayoutDashboard, 
  Users, 
  UserCheck, 
  Newspaper, 
  BookOpen, 
  Calendar,
  ClipboardCheck,
  GraduationCap,
  Settings,
  LogOut,
  FileText,
  Video,
  Headphones,
  File
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { cn } from '@/lib/utils'

export default function AdminSidebar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const locale = useLocale()

  const menuItems = [
    {
      title: 'Dashboard',
      href: `/${locale}/admin`,
      icon: LayoutDashboard,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'Students',
      href: `/${locale}/admin/students`,
      icon: Users,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'Teachers',
      href: `/${locale}/admin/teachers`,
      icon: GraduationCap,
      roles: ['ADMIN', 'HR']
    },
    {
      title: 'Attendance',
      href: `/${locale}/admin/attendance`,
      icon: ClipboardCheck,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'News',
      href: `/${locale}/admin/news`,
      icon: Newspaper,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'Resources',
      href: `/${locale}/admin/resources`,
      icon: BookOpen,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'Events',
      href: `/${locale}/admin/events`,
      icon: Calendar,
      roles: ['ADMIN', 'HR', 'TEACHER']
    },
    {
      title: 'Users',
      href: `/${locale}/admin/users`,
      icon: UserCheck,
      roles: ['ADMIN']
    },
  ]

  const userRole = session?.user?.role || 'STUDENT'
  const filteredItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  )

  return (
    <aside className="w-64 bg-white shadow-lg min-h-screen p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-primary">Admin Panel</h2>
        <p className="text-sm text-gray-500 mt-1">
          {session?.user?.name}
        </p>
      </div>

      <nav className="space-y-2">
        {filteredItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start h-14 text-lg',
                  isActive && 'bg-primary text-white'
                )}
              >
                <Icon className="mr-3 h-6 w-6" />
                {item.title}
              </Button>
            </Link>
          )
        })}
      </nav>

      <div className="mt-8 pt-8 border-t">
        <Button
          variant="ghost"
          className="w-full justify-start h-14 text-lg text-red-600 hover:text-red-700 hover:bg-red-50"
          onClick={() => signOut()}
        >
          <LogOut className="mr-3 h-6 w-6" />
          Logout
        </Button>
      </div>
    </aside>
  )
}

