import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Traitors Gold',
  description: 'Track the gold in the Traitors game',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="background-pattern" />
        {children}
      </body>
    </html>
  )
}
