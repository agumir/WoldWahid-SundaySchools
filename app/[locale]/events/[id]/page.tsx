import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, MapPin, Clock } from 'lucide-react'

export default async function EventDetailPage({
  params: { locale, id }
}: {
  params: { locale: string; id: string }
}) {
  const t = await getTranslations('events')
  
  const event = await prisma.event.findUnique({
    where: { id }
  })

  if (!event) {
    notFound()
  }

  const title = locale === 'am' ? event.titleAm || event.title : event.title
  const description = locale === 'am' ? event.descriptionAm || event.description : event.description

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {event.banner && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={event.banner}
              alt={title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-6">{title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Start Date
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-semibold">{formatDate(event.startDate, locale)}</p>
            </CardContent>
          </Card>

          {event.endDate && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  End Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{formatDate(event.endDate, locale)}</p>
              </CardContent>
            </Card>
          )}

          {event.location && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-600 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{event.location}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {description && (
          <Card>
            <CardHeader>
              <CardTitle>{t('details')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </CardContent>
          </Card>
        )}
      </article>
    </div>
  )
}

