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
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import {
  RgNewsTable,
  RgNewsTableItem,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  HomeBanner,
  HomeBannerRgMembershipVn,
  HomeCustomerCenterVn,
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

export default function MainVn() {
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
      <NoticeBanner bgColor='#85E7E6'>[Thông báo bảo trì máy chủ] Thời gian: 11:55 tối ngày 04/11/2024 ~ 05/11/2024</NoticeBanner>
      <main className={`${style.home_news_vn} container`}>
        <div className={style.row_1}>
          { mainData.slide.length > 0 && <MainBanner banner={mainData.slide} /> }
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
          </div>
        </div>
        <HomeMainQuickMenu label='Menu phổ biến'>
          <HomeMainQuickMenuItem title='Hướng dẫn học' href='/home/user-guide-vn' bgColor='#E8EBED' imgSrc='/src/images/@home/quick-menu-icon/find.png' />
          <HomeMainQuickMenuItem title='Ranking' href='/ranking' bgColor='#FFF3BB' imgSrc='/src/images/@home/quick-menu-icon/star.png' />
          <HomeMainQuickMenuItem title='New Books' href='/home/main/rg-news/new-contents/' bgColor='#D9F8FF' imgSrc='/src/images/@home/quick-menu-icon/new_book.png' />
          <HomeMainQuickMenuItem title='Mua Quyền sử dụng' href='/home/rg-membership/payment/purchase' bgColor='#D8F6E5' imgSrc='/src/images/@home/quick-menu-icon/payment.png' />
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
            <AdBannerType1
              title={''}
              href={'/home/main/rg-news-post/1523'}
              imgSrc={'/src/images/@home/cards/king_of_reading_vn.png'}
              width={640}
              height={640}
            />
          </div>
        </div>
        <div className={style.row_5}>
          <HomeBanner title='Giới thiệu Reading Gate' comment='Thói quen hạnh phúc mở ra tương lai! Chào mừng bạn đến với thế giới của Reading Gate!' bgImage='/src/images/@home/img_post_card_bg_default.svg' href='/home/about-vn' />
          <HomeBanner title='Hướng dẫn học' comment='Không khó đâu. Hãy học theo hướng dẫn từng bước một nhé!' bgImage='/src/images/@home/cards/how_to_use.svg' href='/home/user-guide-vn' />
          <HomeBannerRgMembershipVn />
          <HomeBanner sub='Reading Gate' subColor='#fff' title='Official Facebook' txtColor='#fad92c' bgImage='/src/images/@home/channer/channer_facebook.svg' href='https://www.facebook.com/groups/347989357541898' target='_blank' bgColor='#1877F2' />
        </div>
        <div className={style.row_6}>
          <HomeBanner title='Ranking' comment='Niềm vui trưởng thành cùng bạn bè!' bgImage='/src/images/@home/cards/ranking.png' href='/ranking' />
          <HomeCustomerCenterVn />
        </div>
      </main>
    </>
  )
}