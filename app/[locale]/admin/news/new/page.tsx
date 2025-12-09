'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewNewsPage() {
  const router = useRouter()
  const locale = useLocale()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    titleAm: '',
    excerpt: '',
    excerptAm: '',
    content: '',
    contentAm: '',
    image: '',
    published: false,
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/news', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create news')
      }

      toast({
        title: 'Success',
        description: 'News created successfully'
      })

      router.push(`/${locale}/admin/news`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create news',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/${locale}/admin/news`}>
          <Button variant="ghost" size="lg" className="mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to News
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Create News Article</h1>
        <p className="text-gray-600 mt-2">Create a new news article or announcement</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">News Information</CardTitle>
          <CardDescription>
            Fill in the details for your news article
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title" className="text-lg">Title (English) *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="titleAm" className="text-lg">Title (Amharic)</Label>
                <Input
                  id="titleAm"
                  value={formData.titleAm}
                  onChange={(e) => setFormData({ ...formData, titleAm: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="excerpt" className="text-lg">Excerpt (English)</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  rows={3}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="excerptAm" className="text-lg">Excerpt (Amharic)</Label>
                <Textarea
                  id="excerptAm"
                  value={formData.excerptAm}
                  onChange={(e) => setFormData({ ...formData, excerptAm: e.target.value })}
                  rows={3}
                  className="text-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="image" className="text-lg">Image URL</Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://example.com/image.jpg"
                className="h-12 text-lg"
              />
            </div>

            <div>
              <Label className="text-lg">Content (English) *</Label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
                className="bg-white"
              />
            </div>

            <div>
              <Label className="text-lg">Content (Amharic)</Label>
              <ReactQuill
                theme="snow"
                value={formData.contentAm}
                onChange={(value) => setFormData({ ...formData, contentAm: value })}
                className="bg-white"
              />
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, published: checked === true })
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor="published" className="text-lg cursor-pointer">
                  Publish immediately
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) =>
                    setFormData({ ...formData, featured: checked === true })
                  }
                  className="h-5 w-5"
                />
                <Label htmlFor="featured" className="text-lg cursor-pointer">
                  Feature on homepage
                </Label>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg"
                disabled={loading}
              >
                <Save className="mr-2 h-5 w-5" />
                {loading ? 'Saving...' : 'Save News'}
              </Button>
              <Link href={`/${locale}/admin/news`}>
                <Button type="button" variant="outline" size="lg" className="h-14 px-8 text-lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

