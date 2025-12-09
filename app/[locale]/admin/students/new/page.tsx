'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewStudentPage() {
  const router = useRouter()
  const locale = useLocale()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    nameAm: '',
    email: '',
    phone: '',
    password: '',
    studentId: '',
    grade: '',
    class: '',
    dateOfBirth: '',
    address: '',
    parentName: '',
    parentPhone: '',
    parentEmail: '',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create student')
      }

      toast({
        title: 'Success',
        description: 'Student created successfully'
      })

      router.push(`/${locale}/admin/students`)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create student',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/${locale}/admin/students`}>
          <Button variant="ghost" size="lg" className="mb-4">
            <ArrowLeft className="mr-2 h-5 w-5" />
            Back to Students
          </Button>
        </Link>
        <h1 className="text-4xl font-bold">Add New Student</h1>
        <p className="text-gray-600 mt-2">Fill in the student information below</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Student Information</CardTitle>
          <CardDescription>
            Enter the required information to register a new student
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-lg">Full Name (English) *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="nameAm" className="text-lg">Full Name (Amharic)</Label>
                <Input
                  id="nameAm"
                  value={formData.nameAm}
                  onChange={(e) => setFormData({ ...formData, nameAm: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-lg">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="phone" className="text-lg">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="password" className="text-lg">Password *</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="studentId" className="text-lg">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  required
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="grade" className="text-lg">Grade</Label>
                <Input
                  id="grade"
                  value={formData.grade}
                  onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="class" className="text-lg">Class</Label>
                <Input
                  id="class"
                  value={formData.class}
                  onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth" className="text-lg">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="address" className="text-lg">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="h-12 text-lg"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Parent/Guardian Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="parentName" className="text-lg">Parent/Guardian Name</Label>
                  <Input
                    id="parentName"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="parentPhone" className="text-lg">Parent/Guardian Phone</Label>
                  <Input
                    id="parentPhone"
                    type="tel"
                    value={formData.parentPhone}
                    onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="parentEmail" className="text-lg">Parent/Guardian Email</Label>
                  <Input
                    id="parentEmail"
                    type="email"
                    value={formData.parentEmail}
                    onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-lg">Notes</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={4}
                className="text-lg"
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
                {loading ? 'Saving...' : 'Save Student'}
              </Button>
              <Link href={`/${locale}/admin/students`}>
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

