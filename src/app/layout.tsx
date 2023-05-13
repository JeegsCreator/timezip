import QueryClientComponent from './QueryClientComponent'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TimeZap | Show the world when find you.',
  description: 'Show the world when find you. Select an hour and one or more countries to get his hours. Twitter transform timezone'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`h-full min-h-screen max-h-screen max-w-screen ${inter.className}`}>
        <QueryClientComponent>
          {children}
        </QueryClientComponent>
      </body>
    </html>
  )
}
