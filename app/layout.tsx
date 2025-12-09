import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ayat Mekane Hiwot Tebel Medihanialem and Saint Arsema Church, Wold Wahid Sunday School',
  description: 'Ayat Mekane Hiwot Tebel Medihanialem and Saint Arsema Church, Wold Wahid Sunday School Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

