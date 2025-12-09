import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { prisma } from '@/lib/db'
import Hero from '@/components/home/Hero'
import FeaturedNews from '@/components/home/FeaturedNews'
import UpcomingEvents from '@/components/home/UpcomingEvents'
import QuickLinks from '@/components/home/QuickLinks'
import RecentResources from '@/components/home/RecentResources'

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('home')

  // Fetch featured news
  const featuredNews = await prisma.news.findMany({
    where: { published: true, featured: true },
    take: 3,
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  })

  // Fetch upcoming events
  const upcomingEvents = await prisma.event.findMany({
    where: {
      startDate: { gte: new Date() }
    },
    take: 5,
    orderBy: { startDate: 'asc' }
  })

  // Fetch recent resources
  const recentResources = await prisma.resource.findMany({
    take: 6,
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="flex flex-col">
      <Hero />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <FeaturedNews news={featuredNews} locale={locale} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <UpcomingEvents events={upcomingEvents} locale={locale} />
          </div>
          <div>
            <QuickLinks locale={locale} />
          </div>
        </div>
        <RecentResources resources={recentResources} locale={locale} />
      </div>
    </div>
  )
}

