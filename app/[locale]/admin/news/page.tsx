import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Edit, Trash2 } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import NewsActions from '@/components/admin/NewsActions'

export default async function NewsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const news = await prisma.news.findMany({
    include: {
      author: {
        select: {
          name: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">News Management</h1>
        <Link href={`/${locale}/admin/news/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Create News
          </Button>
        </Link>
      </div>

      {news.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No news articles yet.</p>
            <Link href={`/${locale}/admin/news/new`}>
              <Button size="lg">Create Your First News Article</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {news.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {locale === 'am' ? item.titleAm || item.title : item.title}
                      </h3>
                      {item.published && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          Published
                        </span>
                      )}
                      {item.featured && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {formatDate(item.createdAt, locale)} • {item.author.name} • {item.views} views
                    </div>
                    <p className="text-gray-700 line-clamp-2">
                      {locale === 'am' ? item.excerptAm || item.excerpt : item.excerpt}
                    </p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href={`/${locale}/admin/news/${item.id}/edit`}>
                      <Button variant="outline" size="lg" className="h-12">
                        <Edit className="h-5 w-5 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <NewsActions newsId={item.id} />
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

