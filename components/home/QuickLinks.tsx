import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Book, Video, FileText, Calendar, Users, MessageCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'

interface QuickLinksProps {
  locale: string
}

export default function QuickLinks({ locale }: QuickLinksProps) {
  const t = useTranslations('nav')

  const links = [
    { href: `/${locale}/resources/lessons`, icon: Book, label: t('lessons') },
    { href: `/${locale}/resources/videos`, icon: Video, label: t('videos') },
    { href: `/${locale}/resources/library`, icon: FileText, label: t('library') },
    { href: `/${locale}/events`, icon: Calendar, label: t('events') },
    { href: `/${locale}/about`, icon: Users, label: t('about') },
    { href: `/${locale}/contact`, icon: MessageCircle, label: t('contact') },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Links</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <Link key={link.href} href={link.href}>
                <Button
                  variant="outline"
                  className="w-full justify-start h-14 text-lg"
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {link.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

