'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useState } from 'react'
import LanguageToggle from './LanguageToggle'

export default function Navbar() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const { data: session } = useSession()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">
              {locale === 'am' ? 'እሁድ ትምህርት' : 'Sunday School'}
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href={`/${locale}`} className="hover:text-primary transition">
              {t('home')}
            </Link>
            <Link href={`/${locale}/news`} className="hover:text-primary transition">
              {t('news')}
            </Link>
            <Link href={`/${locale}/resources`} className="hover:text-primary transition">
              {t('resources')}
            </Link>
            <Link href={`/${locale}/events`} className="hover:text-primary transition">
              {t('events')}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-primary transition">
              {t('about')}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-primary transition">
              {t('contact')}
            </Link>
            
            <LanguageToggle />
            
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href={`/${locale}/admin`}>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {session.user.name}
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => signOut()}
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href={`/${locale}/auth/login`}>
                <Button size="sm">{t('studentPortal')}</Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link
              href={`/${locale}`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/news`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('news')}
            </Link>
            <Link
              href={`/${locale}/resources`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('resources')}
            </Link>
            <Link
              href={`/${locale}/events`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('events')}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('about')}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="block px-4 py-2 hover:bg-gray-100 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact')}
            </Link>
            {session ? (
              <>
                <Link
                  href={`/${locale}/admin`}
                  className="block px-4 py-2 hover:bg-gray-100 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('admin')}
                </Link>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => {
                    signOut()
                    setMobileMenuOpen(false)
                  }}
                >
                  {t('logout')}
                </Button>
              </>
            ) : (
              <Link
                href={`/${locale}/auth/login`}
                className="block px-4 py-2 hover:bg-gray-100 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('studentPortal')}
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

