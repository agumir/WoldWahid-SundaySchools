import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AboutPage({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('nav')
  const tHome = await getTranslations('home')

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{t('about')}</h1>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>About Sunday School</CardTitle>
          </CardHeader>
          <CardContent className="prose">
            <p className="text-lg font-semibold mb-4">
              {locale === 'am' 
                ? 'የአያት መካነ ሕይወት ጠበል መድኃኔዓለም እና ቅ/አርሴማ ቤ/ያን ወልድ ዋሕድ ሰ/ት/ቤት'
                : 'Ayat Mekane Hiwot Tebel Medihanialem and Saint Arsema Church, Wold Wahid Sunday School'}
            </p>
            <p className="text-lg">
              The Sunday School program at the Ethiopian Orthodox Tewahedo Church is dedicated to 
              providing spiritual education and guidance to children and youth. Our mission is to 
              nurture faith, teach biblical principles, and build a strong foundation in Orthodox 
              Christian traditions.
            </p>
            <p>
              Through weekly lessons, spiritual teachings, and community engagement, we aim to 
              develop well-rounded individuals who understand and practice their faith in daily life.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Ethiopian Orthodox Tewahedo Church</CardTitle>
          </CardHeader>
          <CardContent className="prose">
            <p className="text-lg">
              The Ethiopian Orthodox Tewahedo Church is one of the oldest Christian churches in the world, 
              with a rich history dating back to the first century. The word &quot;Tewahedo&quot; means &quot;being made one&quot; 
              and reflects the Church&apos;s belief in the unified nature of Christ.
            </p>
            <p>
              Our Church maintains ancient traditions, liturgical practices, and a deep commitment to 
              preserving the teachings of the Apostles and the early Church Fathers. The Sunday School 
              program is an integral part of passing these traditions to the next generation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

