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

export default function NewEventPage() {
  const router = useRouter()
  const locale = useLocale()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    titleAm: '',
    description: '',
    descriptionAm: '',
    startDate: '',
    endDate: '',
    location: '',
    banner: '',
    featured: false
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create event')
      }

      toast({
        title: 'Success',
        description: 'Event created successfully'
      })

      router.push(`/${locale}/admin/events`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create event',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/${locale}/admin/events`}>
          <Button variant="ghost" size="lg" className="mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Events
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Create Event</h1>
        <p className="text-gray-600 mt-2">Add a new event to the calendar</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Event Information</CardTitle>
          <CardDescription>
            Fill in the details for your event
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
                <Label htmlFor="startDate" className="text-lg">Start Date *</Label>
                <Input
                  id="startDate"
                  type="datetime-local"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-lg">End Date</Label>
                <Input
                  id="endDate"
                  type="datetime-local"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="location" className="text-lg">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="h-12 text-lg"
              />
            </div>

            <div>
              <Label htmlFor="banner" className="text-lg">Banner Image URL</Label>
              <Input
                id="banner"
                type="url"
                value={formData.banner}
                onChange={(e) => setFormData({ ...formData, banner: e.target.value })}
                placeholder="https://example.com/banner.jpg"
                className="h-12 text-lg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="description" className="text-lg">Description (English)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="text-lg"
                />
              </div>
              <div>
                <Label htmlFor="descriptionAm" className="text-lg">Description (Amharic)</Label>
                <Textarea
                  id="descriptionAm"
                  value={formData.descriptionAm}
                  onChange={(e) => setFormData({ ...formData, descriptionAm: e.target.value })}
                  rows={4}
                  className="text-lg"
                />
              </div>
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

            <div className="flex gap-4">
              <Button
                type="submit"
                size="lg"
                className="h-14 px-8 text-lg"
                disabled={loading}
              >
                <Save className="mr-2 h-5 w-5" />
                {loading ? 'Saving...' : 'Save Event'}
              </Button>
              <Link href={`/${locale}/admin/events`}>
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

