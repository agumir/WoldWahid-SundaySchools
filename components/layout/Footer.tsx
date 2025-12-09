import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function Footer() {
  const t = useTranslations('nav')
  const tHome = useTranslations('home')
  const locale = useLocale()

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">
              {t('about')}
            </h3>
            <p className="text-gray-400 text-sm">
              {tHome('schoolName')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/news" className="text-gray-400 hover:text-white">
                  {t('news')}
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-400 hover:text-white">
                  {t('resources')}
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-400 hover:text-white">
                  {t('events')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resources/lessons" className="text-gray-400 hover:text-white">
                  {t('lessons')}
                </Link>
              </li>
              <li>
                <Link href="/resources/blogs" className="text-gray-400 hover:text-white">
                  {t('blogs')}
                </Link>
              </li>
              <li>
                <Link href="/resources/videos" className="text-gray-400 hover:text-white">
                  {t('videos')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p className="text-gray-400 text-sm">
              Email: info@sundayschool.et
            </p>
            <p className="text-gray-400 text-sm">
              Phone: +251 XXX XXX XXX
            </p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {tHome('schoolName')}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

