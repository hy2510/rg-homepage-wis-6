'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import ChooseLanguage from '@/ui/common/ChooseLanguage'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_footer'

const RG_CUSTOMER_CENTER_TEL = '1599-0533'
const RG_FAX_TEL = '070-8266-8660'
const RG_CUSTOMER_EMAIL = 'rgmanager@readinggate.com'

// 공통하단
export default function Gfooter() {
  const style = useStyle(STYLE_ID)

  const isMobile = useScreenMode() === 'mobile'

  const { target } = useSiteBlueprint()
  const appType = useApplicationType()
  const logOnStatus = useStudentIsLogin()

  if (appType === 'app' && !logOnStatus) {
    return <></>
  }
  return (
    <div className={style.g_footer}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-m)' }}>
          <ChooseLanguage align="left" />
        </div>
        {target.private && <PrivateFooter />}
        {target.school && <SchoolFooter />}
        {target.academy && <AcademyFooter />}
        <div style={{ height: isMobile ? '30px' : '15px' }}></div>
      </div>
    </div>
  )
}

function PrivateFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const customer = useCustomerInfo()
  const address = `${customer.address} ${customer.detailAddress}`
  const subInfos: { text: string; href?: string; label?: string }[] = [
    { text: t('t551') },
    { text: t('t552') },
    { text: t('t553') },
    {
      text: `${t('t554')} : `,
      href: `tel:${RG_CUSTOMER_CENTER_TEL}`,
      label: RG_CUSTOMER_CENTER_TEL,
    },
    { text: `FAX : ${RG_FAX_TEL}` },
    {
      text: 'Mail : ',
      href: `mailto:${RG_CUSTOMER_EMAIL}`,
      label: RG_CUSTOMER_EMAIL,
    },
  ]

  return (
    <>
      {/* <div className={style.row_a}>
          <span>{t('t321')}</span>
          <span>{'1599-0533'}</span>
        </div> */}
      <div className={style.row_b}>
        <a href={SITE_PATH.HOME.MAIN}>
          <div>{t('t028')}</div>
        </a>
        {/* <div>{t('t029')}</div> */}
        {/* <div>{t('t030')}</div> */}
        <Link href={SITE_PATH.HOME.MEMBERSHIP_SERVICE_TERM}>
          <div>{t('t297')}</div>
        </Link>
        <Link href={SITE_PATH.HOME.MEMBERSHIP_PRIVACY_POLICY}>
          <div>{t('t419')}</div>
        </Link>
        <Link href={SITE_PATH.ACCOUNT.GROUP_SEARCH}>
          <div>{t('t259') + ' ' + t('t231')}</div>
        </Link>
        <Link href={'/catalog'}>Catalog</Link>
        <Link
          href={'https://util.readinggate.com/about_Rg/b2b/'}
          target="_blank">
          <div>{t('t420')}</div>
        </Link>
      </div>
      <div className={style.row_c}>
        <div style={{marginBottom: '10px'}}>{address}</div>
        <div>
          {subInfos.map((item, i) => {
            const isLastItem = subInfos.length - 1 === i
            return (
              <span key={`i_${i}`}>
                {`${item.text}`}
                {item.href ? <Link href={item.href}>{item.label}</Link> : <></>}
                {!isLastItem && ` ㅣ `}
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}
function SchoolFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()
  const { customerCenterUrl } = useSiteBlueprint()
  const customerName = useCustomerInfo().name

  return (
    <>
      <div className={style.row_b}>
        <a href={SITE_PATH.HOME.MAIN}>
          <div>{t('t028')}</div>
        </a>
        <Link href={customerCenterUrl} target="_blank">
          <span>{t('t321')}</span>
        </Link>
      </div>
      <div className={style.row_b}>
        <h3>{customerName}</h3>
      </div>
      <div className={style.row_c}>
        <RgServiceInform />
      </div>
    </>
  )
}

function AcademyFooter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { customerCenterUrl } = useSiteBlueprint()
  const customer = useCustomerInfo()
  const address = `${customer.address} ${customer.detailAddress}`

  return (
    <>
      <div className={style.row_b}>
        <a href={SITE_PATH.HOME.MAIN}>
          <div>{t('t028')}</div>
        </a>
        <Link href={customerCenterUrl} target="_blank">
          <span>{t('t321')}</span>
        </Link>
      </div>
      <div className={style.row_b}>
        <h3>{customer.name}</h3>
      </div>
      <div className={style.row_c}>
        <div>{address}</div>
        <br />
        {customer.telephone && (
          <div>
            <span>
              {`${t('t554')} : `} {/* 대표번호 */}
              <Link href={`tel:${customer.telephone}`}>
                {customer.telephone}
              </Link>
            </span>
          </div>
        )}
        {/* <RgServiceInform /> */}
      </div>
    </>
  )
}

function RgServiceInform() {
  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div>
      {`${t('t555')} `} {/* 리딩게이트 고객센터 */}
      <Link href={`tel:${RG_CUSTOMER_CENTER_TEL}`}>
        {RG_CUSTOMER_CENTER_TEL}
      </Link>
      {' (평일 09:00~18:00 / 점심시간 12:30~13:30)'}
    </div>
  )
}
