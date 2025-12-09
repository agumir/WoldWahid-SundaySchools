import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { Calendar, MapPin } from 'lucide-react'

interface UpcomingEventsProps {
  events: any[]
  locale: string
}

export default function UpcomingEvents({ events, locale }: UpcomingEventsProps) {
  if (events.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Upcoming Events</h2>
      <div className="space-y-4">
        {events.slice(0, 5).map((event) => (
          <Card key={event.id} className="hover:shadow-md transition">
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
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {locale === 'am' ? event.descriptionAm || event.description : event.description}
              </p>
              <Link href={`/${locale}/events/${event.id}`}>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

