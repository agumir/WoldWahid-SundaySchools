import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Edit, Calendar } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function EventsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const events = await prisma.event.findMany({
    orderBy: { startDate: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Events Management</h1>
        <Link href={`/${locale}/admin/events/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Create Event
          </Button>
        </Link>
      </div>

      {events.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No events yet.</p>
            <Link href={`/${locale}/admin/events/new`}>
              <Button size="lg">Create Your First Event</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition">
              {event.banner && (
                <div className="relative h-48 w-full">
                  <img
                    src={event.banner}
                    alt={locale === 'am' ? event.titleAm || event.title : event.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-start gap-2 mb-2">
                  <Calendar className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold">
                      {locale === 'am' ? event.titleAm || event.title : event.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {formatDate(event.startDate, locale)}
                      {event.endDate && ` - ${formatDate(event.endDate, locale)}`}
                    </p>
                    {event.location && (
                      <p className="text-sm text-gray-600">{event.location}</p>
                    )}
                  </div>
                </div>
                <p className="text-gray-700 line-clamp-3 mb-4">
                  {locale === 'am' ? event.descriptionAm || event.description : event.description}
                </p>
                <Link href={`/${locale}/admin/events/${event.id}/edit`}>
                  <Button variant="outline" size="lg" className="w-full h-12">
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Event
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

