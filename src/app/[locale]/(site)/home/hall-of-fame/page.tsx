'use client'

import ClientTo from '@/app/_app/ClientTo'
import SITE_PATH from '@/app/site-path'

export default function Page() {
  let redirect = SITE_PATH.HOME.HALL_OF_FAME_STUDENT

  return <ClientTo to={redirect} />
}
