'use client'

import { ReactNode } from 'react'
import { useStudentInfoFlagLogin } from '@/client/store/student/info/selector'
import SITE_PATH from '../site-path'
import ClientTo from './ClientTo'

export default function LoginBarrierClient({
  children,
  redirectPath,
}: {
  children?: ReactNode
  redirectPath?: string
}) {
  const loginStatus = useStudentInfoFlagLogin()

  if (loginStatus === 'on') {
    return <ClientTo to={redirectPath || SITE_PATH.HOME.MAIN} isReplace />
  }
  return <>{children}</>
}
