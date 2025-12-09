import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ayat Mekane Hiwot Tebel Medihanialem and Saint Arsema Church, Wold Wahid Sunday School',
  description: 'Ayat Mekane Hiwot Tebel Medihanialem and Saint Arsema Church, Wold Wahid Sunday School Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

