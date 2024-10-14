'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useEffect, useRef } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import useConnectRefreshToken from '../(site)/useConnectRefreshToken'

const STYLE_ID = 'page_sign_in'

export default function Page() {
  const style = useStyle(STYLE_ID)

  //@language 'common'
  const { t } = useTranslation()

  const didMount = useRef(false)

  const onLogout = useConnectRefreshToken()

  useEffect(() => {
    if (didMount.current) return
    didMount.current = true
    onLogout()
  }, [onLogout])

  return (
    <main className={style.sign_in}>
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>
      <LoadingScreen />
    </main>
  )
}
