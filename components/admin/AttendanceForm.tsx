'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { Save } from 'lucide-react'

interface AttendanceFormProps {
  students: any[]
  todayAttendance: any[]
}

export default function AttendanceForm({ students, todayAttendance }: AttendanceFormProps) {
  const router = useRouter()
  const locale = useLocale()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  
  // Initialize attendance state from today's records
  const initialAttendance: Record<string, boolean> = {}
  todayAttendance.forEach(att => {
    initialAttendance[att.studentId] = att.present
  })
  
  const [attendance, setAttendance] = useState<Record<string, boolean>>(
    initialAttendance
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendance: Object.entries(attendance).map(([studentId, present]) => ({
            studentId,
            present
          }))
        })
      })

      if (!response.ok) {
        throw new Error('Failed to save attendance')
      }

      toast({
        title: 'Success',
        description: 'Attendance saved successfully'
      })

      router.refresh()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save attendance',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="max-h-[600px] overflow-y-auto space-y-3">
        {students.map((student) => (
          <div
            key={student.id}
            className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50"
          >
            <Checkbox
              id={`student-${student.id}`}
              checked={attendance[student.id] ?? false}
              onCheckedChange={(checked) =>
                setAttendance({ ...attendance, [student.id]: checked === true })
              }
              className="h-6 w-6"
            />
            <Label
              htmlFor={`student-${student.id}`}
              className="flex-1 text-lg cursor-pointer"
            >
              {student.user.name} {student.studentId && `(${student.studentId})`}
            </Label>
          </div>
        ))}
      </div>

      <div className="pt-4 border-t">
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-lg"
          disabled={loading}
        >
          <Save className="mr-2 h-5 w-5" />
          {loading ? 'Saving...' : 'Save Attendance'}
        </Button>
      </div>
    </form>
  )
}

