'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Hero() {
  const t = useTranslations('home')
  const locale = useTranslations().locale || 'en'

  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            {t('subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/resources`}>
              <Button size="lg" variant="secondary" className="text-lg px-8">
                {t('recentResources')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href={`/${locale}/events`}>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                {t('upcomingEvents')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

