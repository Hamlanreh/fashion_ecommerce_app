import '@app/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Novash - Log in to your account',
  description: 'Fashion e-commerce web application with authentication and payment system implementation',
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <>{children}</>
  )
}
