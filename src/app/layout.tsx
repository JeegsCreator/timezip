import { Toaster } from 'react-hot-toast'
import './globals.css'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CreatorTag from '@/components/CreatorTag'
import favicon from '@/assets/Timezip_logo.png'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'TimeZip | Show the world when find you.',
  description: 'Show the world when find you. Select an hour and one or more countries to get his hours. Twitter transform timezone',
  icon: favicon,
  'google-site-verification': 'vU9hWaXYV6uhFnehqOvQ3qKfCqmFZoequTm0dIn226U'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={`h-full min-h-screen ${inter.className}`}>
        <Toaster />
        <CreatorTag />
        <div className='w-full max-w-screen h-full min-h-screen grid grid-rows-body'>
          <Header />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
