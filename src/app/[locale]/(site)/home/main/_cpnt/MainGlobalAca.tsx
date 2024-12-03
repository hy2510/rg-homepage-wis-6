'use client'

import { useApplicationType } from '@/app/_context/AppContext'
import {
  useCustomerInfo,
  useSiteBlueprint,
} from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useOnLoadMain } from '@/client/store/home/hook'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import { Button, Margin, Modal } from '@/ui/common/common-components'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import {
  RgNewsCard,
  RgNewsCardBasic,
  RgNewsCardCampaign,
  RgNewsCardInfographic,
  RgNewsCardNewsLetter,
  RgNewsContainer,
  RgNewsTable,
  RgNewsTableItem,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  AdBannerType2,
  AdBannerType3,
  AdBannerType4,
  AdBannersGroup,
  HomeBanner,
  HomeCustomerCenterGlobal,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import {
  RgPostContainer,
  RgPostItem,
} from '@/ui/modules/home-main-components/home-main-rg-post'
import Image from 'next/image'
import Link from 'next/link'
import { useRefIframeHeight } from '@/app/_app/IFrameWrapper'
import useTranslation from '@/localization/client/useTranslations'
import { HomeMainQuickMenu, HomeMainQuickMenuItem } from '@/ui/modules/home-main-components/home-main-quick-menu'

const STYLE_ID = 'page_main'

type BeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function MainGlobalAca() {
  const router = useRouter()
  const { customerId } = useCustomerInfo()

  useEffect(() => {
    if (!customerId) {
      router.replace(SITE_PATH.ACCOUNT.MAIN)
    }
  }, [router, customerId])

  const platform = useDevicePlatform()

  if (platform === 'unknown') {
    return <></>
  }
  return <MainComponent platform={platform} />
}

function MainComponent({ platform }: { platform: string }) {
  const style = useStyle(STYLE_ID)

  const router = useRouter()

  const { t } = useTranslation()

  const isMobile = useScreenMode() === 'mobile'

  const [viewModal, _viewModal] = useState(false)
  const { iframeRef, onIframeLoad, height } = useRefIframeHeight()

  const { main, target, country } = useSiteBlueprint()
  const { payload: mainData } = useOnLoadMain(target, platform, country)

  const level = useSelectStudyLevel() || ''
  const isLogin = useStudentIsLogin()

  const onClickMainLoginButton = () => {
    if (isLogin) {
      if (level !== 'PK') {
        router.push(SITE_PATH.LIBRARY.HOME)
      } else {
        router.push(SITE_PATH.BASIC.HOME)
      }
    } else {
      router.push(SITE_PATH.ACCOUNT.MAIN)
    }
  }

  const useapp = useApplicationType()

  if (!mainData) {
    return <div></div>
  }
  return (
    <>
      <main className={`${style.home_news_global_aca} container`}>
        <div className={style.row_1}>
          { mainData.slide.length > 0 && <MainBanner banner={mainData.slide} /> }
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
          </div>
        </div>
        <HomeMainQuickMenu label='Quick Menu'>
          <HomeMainQuickMenuItem title='About Reading Gate' href='/home/about-global' bgColor='#D9F8FF' imgSrc='/src/images/@home/img_post_card_bg_default.svg' />
          <HomeMainQuickMenuItem title='How to Use' href='/home/user-guide' bgColor='#E8EBED' imgSrc='/src/images/@home/quick-menu-icon/find.png' />
          <HomeMainQuickMenuItem title='Ranking' href='/ranking' bgColor='#FFF3BB' imgSrc='/src/images/@home/quick-menu-icon/star.png' />
          <HomeMainQuickMenuItem title='New Books' href='/home/main/rg-news/new-contents/' bgColor='#D9F8FF' imgSrc='/src/images/@home/quick-menu-icon/new_book.png' />
        </HomeMainQuickMenu>
        <div className={style.row_3}>
          <RgNewsTable>
            {mainData.board.map((banner) => {
              return <>
                <RgNewsTableItem
                  key={banner.link}
                  title={banner.title}
                  summary={banner.summary}
                  date={banner.date}
                  href={banner.link}
                  target={banner.self ? '' : '_blank'}
                />
              </>
            })}
          </RgNewsTable>
          <div className={style.col_1}>
            <HomeBanner title='Gallery' bgImage='/src/images/@home/cards/gallery.png' href='' />
            <AdBannerType1
              title={''}
              href={'/home/main/rg-news/new-contents/'}
              imgSrc={'/src/images/@home/cards/new_books.png'}
              width={640}
              height={640}
            />
          </div>
        </div>
        <div className={style.row_5}>
          <HomeBanner title='About Reading Gate' comment='Welcome to the Reading Gate! A Happy Habit Opening the Future!' bgImage='/src/images/@home/img_post_card_bg_default.svg' href='/home/about-global' />
          <HomeBanner title='How to Use' comment='It’s not difficult. Follow the steps carefully and start learning!' bgImage='/src/images/@home/cards/how_to_use.svg' href='/home/user-guide' />
          <HomeBanner title='Ranking' comment='The joy of growing together with friends!' bgImage='/src/images/@home/cards/ranking.png' href='/ranking' />
          <AdBannerType1
              title={''}
              href={'https://blog.naver.com/readinggate_official/223396684842'}
              target='_blank'
              imgSrc={'/src/images/@home/cards/donation_campaign_eng.png'}
              width={640}
              height={640}
            />
        </div>
        <div className={style.row_6}>
          <HomeCustomerCenterGlobal />
        </div>
      </main>
    </>
  )
}
