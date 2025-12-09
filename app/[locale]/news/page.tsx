import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function NewsPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('news')
  
  const news = await prisma.news.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    include: { author: { select: { name: true } } }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      
      {news.length === 0 ? (
        <p className="text-center text-gray-500 py-12">{t('noNews')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition">
              {item.image && (
                <div className="relative h-48 w-full">
                  <Image
                    src={item.image}
                    alt={locale === 'am' ? item.titleAm || item.title : item.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  {locale === 'am' ? item.titleAm || item.title : item.title}
                </CardTitle>
                <CardDescription>
                  {formatDate(item.createdAt, locale)} • {item.author.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                  {locale === 'am' ? item.excerptAm || item.excerpt : item.excerpt}
                </p>
                <Link href={`/${locale}/news/${item.slug}`}>
                  <Button variant="outline" size="sm">
                    {t('readMore')}
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

