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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="background-pattern" />
        {children}
      </body>
    </html>
  )
}
