import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'

export default async function NewsDetailPage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string }
}) {
  const t = await getTranslations('news')
  
  const news = await prisma.news.findUnique({
    where: { slug },
    include: { author: { select: { name: true } } }
  })

  if (!news || !news.published) {
    notFound()
  }

  // Increment views
  await prisma.news.update({
    where: { id: news.id },
    data: { views: { increment: 1 } }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        {news.image && (
          <div className="relative h-96 w-full mb-8 rounded-lg overflow-hidden">
            <Image
              src={news.image}
              alt={locale === 'am' ? news.titleAm || news.title : news.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <h1 className="text-4xl font-bold mb-4">
          {locale === 'am' ? news.titleAm || news.title : news.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-600 mb-8">
          <span>{formatDate(news.createdAt, locale)}</span>
          <span>•</span>
          <span>{t('author')}: {news.author.name}</span>
          <span>•</span>
          <span>{t('views')}: {news.views}</span>
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ 
            __html: locale === 'am' ? news.contentAm || news.content : news.content 
          }}
        />
      </article>
    </div>
  )
}

