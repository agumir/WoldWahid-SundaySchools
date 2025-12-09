import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'amharic'] })

export const metadata: Metadata = {
  title: 'Sunday School Management System',
  description: 'Ethiopian Orthodox Tewahedo Church Sunday School Management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

