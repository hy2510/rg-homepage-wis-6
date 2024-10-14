'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import { useCustomerInfo } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BackLink } from '@/ui/common/common-components'

type Step = 1 | 2 | 3
export default function ForgotPasswordSchoolAcademy({
  style,
}: {
  style: Record<string, string>
}) {
  // @language 'common'
  const { t } = useTranslation()
  const [step, setStep] = useState<Step>(1)

  const onClickLogin = () => {
    router.push(SITE_PATH.ACCOUNT.SIGN_IN)
  }

  const router = useRouter()
  const { customerId } = useCustomerInfo()
  const appType = useApplicationType()
  useEffect(() => {
    if (appType && customerId) {
      window.location.replace(
        `https://newfindpw.readinggate.com/?cid=${customerId}&app=${appType === 'app' ? 'Y' : 'N'}`,
      )
    }
  }, [customerId, appType])

  if (!appType || !customerId) {
    return (
      <>
        <BackLink
          onClick={() => {
            if (step === 1) {
              router.back()
            } else {
              setStep(1)
            }
          }}>
          {t('t247')}
        </BackLink>
        <div>{t('t255')}</div>
      </>
    )
  } else {
    return <></>
  }
}
