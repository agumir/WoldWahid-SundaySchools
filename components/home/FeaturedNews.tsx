import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { useTranslations } from 'next-intl'

interface FeaturedNewsProps {
  news: any[]
  locale: string
}

export default function FeaturedNews({ news, locale }: FeaturedNewsProps) {
  const t = useTranslations('news')

  if (news.length === 0) {
    return null
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">{t('title')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                {formatDate(item.createdAt, locale)}
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
    </section>
  )
}

