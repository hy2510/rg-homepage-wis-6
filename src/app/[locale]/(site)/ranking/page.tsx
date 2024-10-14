'use client'

import ClientTo from '@/app/_app/ClientTo'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useLibraryHome } from '@/client/store/library/home/selector'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { getUserConfig } from '../_header/_fn/user-config'

export default function Page() {
  const { customerId } = useCustomerInfo()
  const { studentId } = useStudentInfo()
  const mode = useLibraryHome().mode

  let redirect = SITE_PATH.RANKING.POINT
  if (!mode) {
    const config = getUserConfig(
      {
        studentId,
        customerId,
      },
      false,
    )
    if (config?.mode === 'challenge') {
      redirect = SITE_PATH.RANKING.CAHLLENGE
    }
  } else if (mode === 'challenge') {
    redirect = SITE_PATH.RANKING.CAHLLENGE
  }

  return <ClientTo to={redirect} />
}
