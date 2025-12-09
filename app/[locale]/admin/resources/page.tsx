import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, FileText, Video, Headphones, Book } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { ResourceType } from '@prisma/client'

export default async function ResourcesPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const resources = await prisma.resource.findMany({
    orderBy: { createdAt: 'desc' }
  })

  const getIcon = (type: ResourceType) => {
    switch (type) {
      case 'VIDEO':
        return Video
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
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resources Management</h1>
        <div className="flex gap-2">
          <Link href={`/${locale}/admin/resources/new?type=PDF`}>
            <Button size="lg" className="h-14 px-6 text-lg">
              <FileText className="mr-2 h-5 w-5" />
              Upload PDF
            </Button>
          </Link>
          <Link href={`/${locale}/admin/resources/new?type=VIDEO`}>
            <Button size="lg" className="h-14 px-6 text-lg">
              <Video className="mr-2 h-5 w-5" />
              Add Video
            </Button>
          </Link>
          <Link href={`/${locale}/admin/resources/new?type=AUDIO`}>
            <Button size="lg" className="h-14 px-6 text-lg">
              <Headphones className="mr-2 h-5 w-5" />
              Add Audio
            </Button>
          </Link>
          <Link href={`/${locale}/admin/resources/new?type=BLOG`}>
            <Button size="lg" className="h-14 px-6 text-lg">
              <Book className="mr-2 h-5 w-5" />
              Add Blog
            </Button>
          </Link>
        </div>
      </div>

      {resources.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No resources yet.</p>
            <Link href={`/${locale}/admin/resources/new`}>
              <Button size="lg">Add Your First Resource</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {resources.map((resource) => {
            const Icon = getIcon(resource.type)
            return (
              <Card key={resource.id} className="hover:shadow-md transition">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">
                          {locale === 'am' ? resource.titleAm || resource.title : resource.title}
                        </h3>
                        <div className="text-sm text-gray-600 mb-2">
                          {formatDate(resource.createdAt, locale)} • {resource.type}
                        </div>
                        <p className="text-gray-700 line-clamp-2">
                          {locale === 'am' ? resource.descriptionAm || resource.description : resource.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link href={`/${locale}/admin/resources/${resource.id}/edit`}>
                        <Button variant="outline" size="lg" className="h-12">
                          Edit
                        </Button>
                      </Link>
                    </div>
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

