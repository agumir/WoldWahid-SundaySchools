import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Plus, Edit, ClipboardList } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default async function QuizPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const quizzes = await prisma.quiz.findMany({
    include: {
      _count: {
        select: {
          results: true
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Quiz/Exam Management</h1>
        <Link href={`/${locale}/admin/quiz/new`}>
          <Button size="lg" className="h-14 px-8 text-lg">
            <Plus className="mr-2 h-6 w-6" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 text-lg mb-4">No quizzes yet.</p>
            <Link href={`/${locale}/admin/quiz/new`}>
              <Button size="lg">Create Your First Quiz</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-lg transition">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <ClipboardList className="h-8 w-8 text-primary" />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">
                      {locale === 'am' ? quiz.titleAm || quiz.title : quiz.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                      <span>Type: {quiz.type}</span>
                      <span>•</span>
                      <span>Passing: {quiz.passingScore}%</span>
                      {quiz.timeLimit && (
                        <>
                          <span>•</span>
                          <span>Time: {quiz.timeLimit} min</span>
                        </>
                      )}
                    </div>
                    <p className="text-gray-700 line-clamp-2 mb-4">
                      {locale === 'am' ? quiz.descriptionAm || quiz.description : quiz.description}
                    </p>
                    <div className="text-sm text-gray-600">
                      {quiz._count.results} submissions
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href={`/${locale}/admin/quiz/${quiz.id}/edit`}>
                    <Button variant="outline" size="lg" className="h-12 flex-1">
                      <Edit className="h-5 w-5 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  <Link href={`/${locale}/admin/quiz/${quiz.id}/results`}>
                    <Button size="lg" className="h-12 flex-1">
                      View Results
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

