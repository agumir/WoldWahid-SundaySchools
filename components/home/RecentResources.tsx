import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Download, Play, Headphones, FileText } from 'lucide-react'
import { formatDate } from '@/lib/utils'

interface RecentResourcesProps {
  resources: any[]
  locale: string
}

export default function RecentResources({ resources, locale }: RecentResourcesProps) {
  if (resources.length === 0) {
    return null
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return Play
      case 'AUDIO':
        return Headphones
      case 'PDF':
        return FileText
      default:
        return FileText
    }
  }

  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">Recent Resources</h2>
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
                        Download
                      </Button>
                    </Link>
                  )}
                  {resource.type === 'VIDEO' && resource.videoUrl && (
                    <Link href={resource.videoUrl} target="_blank">
                      <Button variant="outline" size="sm">
                        <Icon className="h-4 w-4 mr-2" />
                        Watch
                      </Button>
                    </Link>
                  )}
                  {resource.type === 'AUDIO' && resource.audioUrl && (
                    <Link href={resource.audioUrl} target="_blank">
                      <Button variant="outline" size="sm">
                        <Icon className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    </Link>
                  )}
                  <Link href={`/${locale}/resources/${resource.id}`}>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

