'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH, { EXTERNAL_URL } from '@/app/site-path'
import { useChannelTalkChatbotController } from '@/external/channel-talk/component/ChannelTalkContext'
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  useStudentInfo,
  useStudentIsLogin,
  useStudentStudyable,
} from '@/client/store/student/info/selector'
import { AlertBar } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_home'

export default function Layout({ children }: { children?: ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  const pathname = usePathname()
  const connectMainRgNews = pathname.indexOf('/rg-news') != -1

  const isLogin = useStudentIsLogin()
  const { studyEndDay } = useStudentInfo()
  const {
    isStudyEnd,
    studyEndMessage,
    value: studyState,
  } = useStudentStudyable()
  const {
    target,
    country,
    isShowStudyEndInform: isOnStudyEndInform,
    isPaymentable,
    paymentUrl,
  } = useSiteBlueprint()

  let paymentMessage = ''
  if (isStudyEnd) {
    if (studyState === 'NEED_PAYMENT' || studyState === 'PAUSED') {
      paymentMessage = studyEndMessage
    } else {
      paymentMessage = t('t322')
    }
  } else if (isOnStudyEndInform && studyEndDay <= 7) {
    paymentMessage = t('t323', { num: studyEndDay })
  }

  const chatbotController = useChannelTalkChatbotController()

  return (
    <>
      <div className={style.home}>
        <div className="container" style={{ paddingBottom: 0, paddingTop: 0 }}>
          {isLogin && paymentMessage && (
            <>
              <div style={{ paddingTop: '15px' }}></div>
              <AlertBar>
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '20px',
                    color: 'red',
                  }}>
                  <div>{paymentMessage}</div>
                  {studyState !== 'PAUSED' && (
                    <div>
                      <Link href={paymentUrl}>
                        <b>{t('t193')}</b>
                      </Link>
                    </div>
                  )}
                  {studyState === 'NEED_PAYMENT' && isPaymentable && (
                    <div>
                      <Link href={paymentUrl}>
                        <b>{t('t193')}</b>
                      </Link>
                    </div>
                  )}
                  {studyState === 'PAUSED' && (
                    <div>
                      <Link href={SITE_PATH.ACCOUNT.INFO}>
                        <b>
                          {/* 일시중지 해제 */}
                          {t('t590')}
                        </b>
                      </Link>
                    </div>
                  )}
                </div>
              </AlertBar>
            </>
          )}
        </div>
        {/* {connectMainRgNews ? <></> : <HomeNavBar />} */}
        {children}
      </div>
      {country.korea && (
        <div className={style.chatbot_area}>
          <a href={EXTERNAL_URL.kakaoChannel} target="_blank">
            <div
              className={style.chat_icon}
              style={{
                backgroundImage: `url('/src/images/@chatbot-icon/kakao_channer_talk_icon.png')`,
              }}></div>
          </a>
          {/* target.private && (
            <a href={EXTERNAL_URL.academyPromotion} target="_blank">
              <div
                className={style.chat_icon}
                style={{
                  backgroundImage: `url('/src/images/@chatbot-icon/chatbot_icon_pri3.png')`,
                }}></div>
            </a>
          ) */}
          <div
            className={style.chat_icon}
            style={{
              backgroundImage: `url('/src/images/@chatbot-icon/chatbot_icon_pri1.png')`,
            }}
            onClick={() => {
              chatbotController.showChat()
            }}></div>
        </div>
      )}
    </>
  )
}

const HomeNavItem = ({
  name,
  href,
  target,
  active,
  onClick,
}: {
  name: string
  href: string
  target?: string
  active?: boolean
  onClick?: () => void
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <Link href={href} target={target ? target : '_self'} onClick={onClick}>
      <div className={`${style.home_nav_item} ${active ? style.active : ''}`}>
        {name}
      </div>
    </Link>
  )
}

const HomeNavBar = () => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const pathname = usePathname()

  const { customerCenterUrl, isSnsMenuOpen, isPaymentable, target, country } =
    useSiteBlueprint()
  const isMembershipOpen = isPaymentable && target.private
  const isLogin = useStudentIsLogin()

  return (
    <div className={`${style.home_nav_bar}`}>
      <HomeNavItem
        name={t('t317')}
        href={SITE_PATH.HOME.MAIN}
        active={pathname.indexOf(SITE_PATH.HOME.MAIN) !== -1}
      />
      {/* <HomeNavItem
        name={t('t318')}
        href={'hall-of-fame'}
        active={connectHallOfFame}
      /> */}
      {isSnsMenuOpen && (
        <HomeNavItem
          name={t('t319')}
          href={SITE_PATH.HOME.CUSTOMER_INTERVIEW}
          active={pathname.indexOf('/customer-review') !== -1}
        />
      )}
      {isMembershipOpen && ((country.vietnam && isLogin) || country.korea) && (
        <HomeNavItem
          name={t('t320')}
          href={SITE_PATH.HOME.MEMBERSHIP_INTRODUCE}
          active={pathname.indexOf('/rg-membership') !== -1}
        />
      )}
      {isPaymentable && isLogin && !isMembershipOpen && (
        <HomeNavItem
          name={t('t702')} // 결제
          href={SITE_PATH.HOME.RG_PAYMENT}
          active={pathname.indexOf('/rg-payment') !== -1}
        />
      )}
      {country.korea && (
        <HomeNavItem
          name={t('t029')}
          href={SITE_PATH.HOME.ABOUT_TO_SCHOOL}
          active={pathname.indexOf(SITE_PATH.HOME.ABOUT_TO_SCHOOL) !== -1}
        />
      )}
      {country.korea && (
        <HomeNavItem
          name={t('t739')} // 이용 안내
          href={SITE_PATH.HOME.USER_GUIDE}
          active={pathname.indexOf(SITE_PATH.HOME.USER_GUIDE) !== -1}
        />
      )}
      {country.korea && (
        <HomeNavItem
          name={t('t321')}
          href={customerCenterUrl}
          active={false}
          target={'_blank'}
        />
      )}
    </div>
  )
}
