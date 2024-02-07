import type { Metadata } from 'next'
import './globals.css'
import Providers from '@context/Providers';


export const metadata: Metadata = {
  title: 'Novash - Homepage',
  description: 'Fashion e-commerce web application with authentication and payment system implementation',
}


export default function RootLayout({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
