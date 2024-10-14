'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const siteOption = useSiteBlueprint()
  const { EB, PB } = siteOption.studyOpen

  const [redirect, setRedirect] = useState<string | undefined>(undefined)

  if (EB) {
    if (!redirect) {
      setRedirect(`${SITE_PATH.LIBRARY.SERIES_LIST_EB}`)
    }
  } else if (PB) {
    if (!redirect) {
      setRedirect(`${SITE_PATH.LIBRARY.SERIES_LIST_PB}`)
    }
  }
  if (redirect) {
    return <Redirect to={redirect} key={Date.now()} />
  }
  return <>Not support is this customer Series Menu.</>
}

function Redirect({ to }: { to?: string }) {
  const router = useRouter()

  useEffect(() => {
    if (!!to) {
      router.replace(to)
    }
  }, [to, router])
  return <></>
}
