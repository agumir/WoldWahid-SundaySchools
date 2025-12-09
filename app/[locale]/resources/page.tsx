import { prisma } from '@/lib/db'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Play, Headphones, FileText, Book } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { getTranslations } from 'next-intl/server'
import { ResourceType } from '@prisma/client'

export default async function ResourcesPage({
  params: { locale },
  searchParams
}: {
  params: { locale: string }
  searchParams: { type?: string }
}) {
  const t = await getTranslations('resources')
  
  const where = searchParams.type 
    ? { type: searchParams.type as ResourceType }
    : {}

  const resources = await prisma.resource.findMany({
    where,
    orderBy: { createdAt: 'desc' }
  })

  const getIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return Play
      case 'AUDIO':
        return Headphones
      case 'PDF':
        return FileText
      case 'LESSON':
        return Book
      default:
        return FileText
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('title')}</h1>
      
      <div className="flex gap-4 mb-8">
        <Link href={`/${locale}/resources`}>
          <Button variant={!searchParams.type ? 'default' : 'outline'}>
            All
          </Button>
        </Link>
        <Link href={`/${locale}/resources?type=LESSON`}>
          <Button variant={searchParams.type === 'LESSON' ? 'default' : 'outline'}>
            {t('lessons')}
          </Button>
        </Link>
        <Link href={`/${locale}/resources?type=BLOG`}>
          <Button variant={searchParams.type === 'BLOG' ? 'default' : 'outline'}>
            {t('blogs')}
          </Button>
        </Link>
        <Link href={`/${locale}/resources?type=VIDEO`}>
          <Button variant={searchParams.type === 'VIDEO' ? 'default' : 'outline'}>
            {t('videos')}
          </Button>
        </Link>
        <Link href={`/${locale}/resources?type=AUDIO`}>
          <Button variant={searchParams.type === 'AUDIO' ? 'default' : 'outline'}>
            {t('audio')}
          </Button>
        </Link>
        <Link href={`/${locale}/resources?type=PDF`}>
          <Button variant={searchParams.type === 'PDF' ? 'default' : 'outline'}>
            {t('pdfs')}
          </Button>
        </Link>
      </div>

      {resources.length === 0 ? (
        <p className="text-center text-gray-500 py-12">{t('noResources')}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => {
            const Icon = getIcon(resource.type)
            return (
              <Card key={resource.id} className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="line-clamp-2">
                    {locale === 'am' ? resource.titleAm || resource.title : resource.title}
                  </CardTitle>
                  <CardDescription>
                    {formatDate(resource.createdAt, locale)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                    {locale === 'am' ? resource.descriptionAm || resource.description : resource.description}
                  </p>
                  <div className="flex gap-2">
                    {resource.type === 'PDF' && resource.fileUrl && (
                      <Link href={resource.fileUrl} target="_blank">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          {t('download')}
                        </Button>
                      </Link>
                    )}
                    {resource.type === 'VIDEO' && resource.videoUrl && (
                      <Link href={resource.videoUrl} target="_blank">
                        <Button variant="outline" size="sm">
                          <Icon className="h-4 w-4 mr-2" />
                          {t('watch')}
                        </Button>
                      </Link>
                    )}
                    {resource.type === 'AUDIO' && resource.audioUrl && (
                      <Link href={resource.audioUrl} target="_blank">
                        <Button variant="outline" size="sm">
                          <Icon className="h-4 w-4 mr-2" />
                          {t('listen')}
                        </Button>
                      </Link>
                    )}
                    <Link href={`/${locale}/resources/${resource.id}`}>
                      <Button variant="ghost" size="sm">
                        {t('read')}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}

