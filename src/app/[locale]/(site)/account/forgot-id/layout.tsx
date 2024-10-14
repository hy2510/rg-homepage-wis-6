import LoginBarrierClient from '@/app/_app/LoginBarrierClient'
import { ReactNode } from 'react'

export default function Layout({ children }: { children?: ReactNode }) {
  return <LoginBarrierClient>{children}</LoginBarrierClient>
}
