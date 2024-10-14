'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Page() {
  const siteOption = useSiteBlueprint()
  const { PreK, DodoABC } = siteOption.studyOpen
  const { isFirstPreK } = siteOption
  const [redirect, setRedirect] = useState<string | undefined>(undefined)

  if (isFirstPreK && PreK) {
    if (!redirect) {
      setRedirect(SITE_PATH.BASIC.PRE_K)
    }
  } else {
    if (DodoABC) {
      if (!redirect) {
        setRedirect(SITE_PATH.BASIC.DODO_ABC)
      }
    } else if (PreK) {
      if (!redirect) {
        setRedirect(SITE_PATH.BASIC.PRE_K)
      }
    }
  }
  if (redirect) {
    return <Redirect to={redirect} key={Date.now()} />
  }
  return <>Not support is this customer Kinder StudyMenu.</>
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
