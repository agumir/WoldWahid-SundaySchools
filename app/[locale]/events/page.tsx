import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, MapPin } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

export default async function EventsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('events')
  
  const now = new Date()
  const upcomingEvents = await prisma.event.findMany({
    where: { startDate: { gte: now } },
    orderBy: { startDate: 'asc' }
  })

  const pastEvents = await prisma.event.findMany({
    where: { startDate: { lt: now } },
    orderBy: { startDate: 'desc' },
    take: 10
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">{t('upcoming')}</h2>
        {upcomingEvents.length === 0 ? (
          <p className="text-center text-gray-500 py-12">{t('noEvents')}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-lg transition">
                {event.banner && (
                  <div className="relative h-48 w-full">
                    <img
                      src={event.banner}
                      alt={locale === 'am' ? event.titleAm || event.title : event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle>
                    {locale === 'am' ? event.titleAm || event.title : event.title}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(event.startDate, locale)}
                    </span>
                    {event.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {locale === 'am' ? event.descriptionAm || event.description : event.description}
                  </p>
                  <Link href={`/${locale}/events/${event.id}`}>
                    <Button variant="outline" size="sm">
                      {t('details')}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {pastEvents.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-6">{t('past')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pastEvents.map((event) => (
              <Card key={event.id} className="opacity-75">
                <CardHeader>
                  <CardTitle>
                    {locale === 'am' ? event.titleAm || event.title : event.title}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(event.startDate, locale)}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

