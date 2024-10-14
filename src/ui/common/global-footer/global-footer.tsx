'use client'

// @Deprecate('Not Used')
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_footer'

// 공통하단
export default function Gfooter() {
  const style = useStyle(STYLE_ID)
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.g_footer}>
      <div className="container">
        {/* <div className={style.row_a}>
          <span>{t('t321')}</span>
          <span>{'1599-0533'}</span>
        </div> */}
        <div className={style.row_b}>
          <Link href={'/home/main'}>
            <div>{t('t028')}</div>
          </Link>
          {/* <div>{t('t029')}</div> */}
          {/* <div>{t('t030')}</div> */}
          <Link href={'/home/rg-membership/terms-of-service'}>
            <div>{t('t297')}</div>
          </Link>
          <Link href={'/home/rg-membership/privacy-policy'}>
            <div>{t('t419')}</div>
          </Link>
          <Link
            href={'https://www.readinggate.com/Community/BringInInstitution'}
            target="_blank">
            <div>{t('t420')}</div>
          </Link>
        </div>
        <div className={style.row_c}>
          <div>{t('t421')}</div>
          <br />
          <div>{t('t422')}</div>
        </div>
      </div>
    </div>
  )
}
