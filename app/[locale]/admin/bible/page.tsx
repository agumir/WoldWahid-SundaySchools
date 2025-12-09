import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, BookOpen } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function BibleReadingPlanPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const plans = await prisma.bibleReadingPlan.findMany({
    where: { active: true },
    orderBy: { startDate: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Bible Reading Plans</h1>
        <Link href={`/${locale}/admin/bible/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Create Reading Plan
          </Button>
        </Link>
      </div>

      {plans.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No reading plans yet.</p>
            <Link href={`/${locale}/admin/bible/new`}>
              <Button size="lg">Create Your First Reading Plan</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {plans.map((plan) => (
            <Card key={plan.id} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {locale === 'am' ? plan.titleAm || plan.title : plan.title}
                    </h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {formatDate(plan.startDate, locale)} - {formatDate(plan.endDate, locale)}
                    </div>
                    <p className="text-gray-700 line-clamp-3">
                      {locale === 'am' ? plan.descriptionAm || plan.description : plan.description}
                    </p>
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
