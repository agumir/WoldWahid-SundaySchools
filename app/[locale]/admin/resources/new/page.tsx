'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function NewResourcePage() {
  const router = useRouter()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const resourceType = searchParams.get('type') || 'PDF'
  
  const [formData, setFormData] = useState({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    type: resourceType,
    fileUrl: '',
    videoUrl: '',
    audioUrl: '',
    content: '',
    contentAm: '',
    thumbnail: '',
    category: '',
    tags: ''
  })

  useEffect(() => {
    setFormData(prev => ({ ...prev, type: resourceType }))
  }, [resourceType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/resources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean)
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create resource')
      }

      toast({
        title: 'Success',
        description: 'Resource created successfully'
      })

      router.push(`/${locale}/admin/resources`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create resource',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/${locale}/admin/resources`}>
          <Button variant="ghost" size="lg" className="mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Resources
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Add Resource</h1>
        <p className="text-gray-600 mt-2">Add a new resource to the library</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Resource Information</CardTitle>
          <CardDescription>
            Fill in the details for your resource
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="type" className="text-lg">Resource Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PDF">PDF Document</SelectItem>
                  <SelectItem value="VIDEO">Video</SelectItem>
                  <SelectItem value="AUDIO">Audio</SelectItem>
                  <SelectItem value="LESSON">Weekly Lesson</SelectItem>
                  <SelectItem value="BLOG">Blog/Teaching</SelectItem>
                </SelectContent>
              </Select>
            </div>

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

            {formData.type === 'PDF' && (
              <div>
                <Label htmlFor="fileUrl" className="text-lg">PDF File URL *</Label>
                <Input
                  id="fileUrl"
                  type="url"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                  placeholder="https://example.com/document.pdf"
                  required
                  className="h-12 text-lg"
                />
              </div>
            )}

            {formData.type === 'VIDEO' && (
              <div>
                <Label htmlFor="videoUrl" className="text-lg">Video URL (YouTube/Vimeo) *</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                  className="h-12 text-lg"
                />
              </div>
            )}

            {formData.type === 'AUDIO' && (
              <div>
                <Label htmlFor="audioUrl" className="text-lg">Audio File URL *</Label>
                <Input
                  id="audioUrl"
                  type="url"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  placeholder="https://example.com/audio.mp3"
                  required
                  className="h-12 text-lg"
                />
              </div>
            )}

            {(formData.type === 'LESSON' || formData.type === 'BLOG') && (
              <>
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
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="description" className="text-lg">Description (English)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="descriptionAm" className="text-lg">Description (Amharic)</Label>
                <Textarea
                  id="descriptionAm"
                  value={formData.descriptionAm}
                  onChange={(e) => setFormData({ ...formData, descriptionAm: e.target.value })}
                  rows={3}
                  className="text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="category" className="text-lg">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="tags" className="text-lg">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="tag1, tag2, tag3"
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="thumbnail" className="text-lg">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                type="url"
                value={formData.thumbnail}
                onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                placeholder="https://example.com/thumbnail.jpg"
                className="h-12 text-lg"
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg"
                disabled={loading}
              >
                <Save className="mr-2 h-5 w-5" />
                {loading ? 'Saving...' : 'Save Resource'}
              </Button>
              <Link href={`/${locale}/admin/resources`}>
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

