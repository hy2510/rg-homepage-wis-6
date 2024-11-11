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
import { useStyle } from '@/ui/context/StyleContext'
import {
  RgNewsTable,
  RgNewsTableItem,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  HomeBanner,
  HomeCustomerCenter,
  HomeCustomerCenterKrAca,
  NoticeBanner,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import useTranslation from '@/localization/client/useTranslations'
import { HomeMainQuickMenu, HomeMainQuickMenuItem } from '@/ui/modules/home-main-components/home-main-quick-menu'

const STYLE_ID = 'page_main'

type BeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function MainKrAca() {
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
      {/* 띠 베너 */}
      <NoticeBanner bgColor='#85E7E6'>[서버 점검 안내] 일시: 2024/11/4 오후 11시 55분 ~ 2024/11/5 오전 6시</NoticeBanner>
      <main className={`${style.home_news_kr_aca} container`}>
        <div className={style.row_1}>
          { mainData.slide.length > 0 && <MainBanner banner={mainData.slide} /> }
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
          </div>
        </div>
        <HomeMainQuickMenu label='자주 찾는 메뉴'>
          <HomeMainQuickMenuItem title='학습 이용 방법' href='/home/user-guide' bgColor='#E8EBED' imgSrc='/src/images/@home/quick-menu-icon/find.png' />
          <HomeMainQuickMenuItem title='랭킹' href='/ranking' bgColor='#FFF3BB' imgSrc='/src/images/@home/quick-menu-icon/star.png' />
          <HomeMainQuickMenuItem title='신규 도서' href='/home/main/rg-news/new-contents/' bgColor='#D9F8FF' imgSrc='/src/images/@home/quick-menu-icon/new_book.png' />
          {/* <HomeMainQuickMenuItem title='워크북 구매하기' href='https://aoneedu.cafe24.com/' target='_blank' bgColor='#E8F1FF' imgSrc='/src/images/@home/quick-menu-icon/work_book.png' /> */}
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
            <AdBannerType1
              title={''}
              href={'/home/main/rg-news/new-contents/'}
              imgSrc={'/src/images/@home/cards/new_books.png'}
              width={640}
              height={640}
            />
            <HomeBanner title='Workbook 구매하기' bgImage='/src/images/@home/shop/workbook_aca.png' href='https://aoneedu.cafe24.com/' target='_blank' />
          </div>
        </div>
        <div className={style.row_5}>
          <HomeBanner title='리딩게이트 소개' comment='미래를 여는 행복한 습관! 리딩게이트의 세계에 오신 것을 환영합니다!' bgImage='/src/images/@home/img_post_card_bg_default.svg' href='/home/about-to-school' />
          <HomeBanner title='학습 이용 방법' comment='어렵지 않아요. 차근차근 안내를 따라 학습해 보세요!' bgImage='/src/images/@home/cards/how_to_use.svg' href='/home/user-guide' />
          <HomeBanner title='랭킹' comment='친구들과 함께 성장하는 즐거움!' bgImage='/src/images/@home/cards/ranking.png' href='/ranking' />
          <HomeBanner title='갤러리' comment='(준비중입니다.)' bgImage='/src/images/@home/cards/gallery.png' href='' />
        </div>
        <div className={style.row_6}>
          <HomeCustomerCenterKrAca />
        </div>
      </main>
    </>
  )
}