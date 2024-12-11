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
  AdBannerType3,
  HomeBanner,
  HomeBannerChanner,
  HomeBannerDonation,
  HomeBannerRgMembership,
  HomeBannerRgShop,
  HomeCustomerCenter,
  HomePartnership,
  NoticeBanner,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import Image from 'next/image'
import Link from 'next/link'
import useTranslation from '@/localization/client/useTranslations'
import { HomeMainQuickMenu, HomeMainQuickMenuItem } from '@/ui/modules/home-main-components/home-main-quick-menu'
import HiDodoBannerAni from '@/ui/modules/HiDodoBannerAni'

const STYLE_ID = 'page_main'

type BeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function MainKr() {
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
  const { t } = useTranslation()
  const router = useRouter()
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
      <NoticeBanner bgColor='#85E7E6'>[초특가 행사] 리딩게이트 1년 이용권 역대급 할인 진행중!</NoticeBanner>
      <main className={`${style.home_news_kr} container`}>
        <div className={style.row_1}>
          { mainData.slide.length > 0 && <MainBanner banner={mainData.slide} /> }
          <div className={style.label}>
            <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
            <Link href='https://gohidodo.com/' target='_blank'>
              <div className={style.hi_dodo_banner}>
                <HiDodoBannerAni />
                {/* <Image src='/src/images/@home/hi-dodo-banner/text.svg' width={240} height={32} alt='' style={{width: '180px', height: 'auto'}} />
                <Image src='/src/images/@home/hi-dodo-banner/hidodo_icon.png' width={50} height={50} alt='' style={{width: '50px', height: 'auto'}} /> */}
              </div>
            </Link>
          </div>
        </div>
        <HomeMainQuickMenu label='자주 찾는 메뉴'>
          <HomeMainQuickMenuItem title='학습 이용 방법' href='/home/user-guide' bgColor='#E8EBED' imgSrc='/src/images/@home/quick-menu-icon/find.png' />
          <HomeMainQuickMenuItem title='랭킹' href='/ranking' bgColor='#FFF3BB' imgSrc='/src/images/@home/quick-menu-icon/star.png' />
          <HomeMainQuickMenuItem title='신규 도서' href='/home/main/rg-news/new-contents/' bgColor='#D9F8FF' imgSrc='/src/images/@home/quick-menu-icon/new_book.png' />
          <HomeMainQuickMenuItem title='이용권 구매' href='/home/rg-membership/payment/purchase' bgColor='#D8F6E5' imgSrc='/src/images/@home/quick-menu-icon/payment.png' />
          <HomeMainQuickMenuItem title='워크북 구매' href='https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1' target='_blank' bgColor='#E8F1FF' imgSrc='/src/images/@home/quick-menu-icon/work_book.png' />
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
              href={SITE_PATH.HOME.HALL_OF_FAME_STUDENT}
              imgSrc={'/src/images/@home/cards/hall_of_fame.png'}
              width={640}
              height={640}
            />
            <AdBannerType1
              title={''}
              href={'/home/main/rg-news/new-contents/'}
              imgSrc={'/src/images/@home/cards/new_books.png'}
              width={640}
              height={640}
            />
          </div>
        </div>
        <div className={style.row_4}>
          <div className={style.col_1}>
            <HomeBanner title='RG 뉴스레터' txtColor='#fff' sub='2024년 10월' subColor='#fff' comment='하이도도 론칭, New Reading Gate, 티타늄 상패 증정식 ...' commentColor='#fff' bgColor='#038DF1' bgImage='/src/images/@home/cards/news_letter.svg' href='/home/main/rg-news/newsletter/' />
            <HomeBanner title='인포그래픽' txtColor='#fff' sub='학습' subColor='#F880C1' comment='리딩게이트 이용자들은 책을 어떻게, 얼마나 읽고 있을까요?' commentColor='#fff' bgColor='#1E254F' bgImage='/src/images/@home/cards/infographic.svg' href='/home/main/rg-news/newsletter/' />
          </div>
          <AdBannerType3
            bgImage='/src/images/@home/cards/king_of_reading_202402.svg'
            href='/home/main/rg-news/challenge/202402'
          />
        </div>
        <div className={style.row_5}>
          <HomeBanner title='리딩게이트 소개' comment='미래를 여는 행복한 습관! 리딩게이트의 세계에 오신 것을 환영합니다!' bgImage='/src/images/@home/img_post_card_bg_default.svg' href='/home/about-to-school' />
          <HomeBanner title='학습 이용 방법' comment='어렵지 않아요. 차근차근 안내를 따라 학습해 보세요!' bgImage='/src/images/@home/cards/how_to_use.svg' href='/home/user-guide' />
          <HomeBannerRgShop />
          <HomeBannerRgMembership />
        </div>
        <div className={style.row_6_kr}>
          <HomeCustomerCenter />
          <HomeBanner title='랭킹' comment='친구들과 함께 성장하는 즐거움!' bgImage='/src/images/@home/cards/ranking.png' href='/ranking' />
          <HomePartnership />
        </div>
        <div className={style.row_7}>
          <HomeBannerChanner title1='' title2='RG Cafe' linkTxt1='RG에 빠진 가족' link1='https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=30%26search.boardtype=L' linkTxt2='영어 독서왕 대상 후기' link2='https://cafe.naver.com/readinggatecafe?iframe_url=/ArticleList.nhn%3Fsearch.clubid=29561033%26search.menuid=113%26search.boardtype=L' bgColor='#5B2390' bgImage='/src/images/@home/channer/channer_cafe.svg' />
          <HomeBannerChanner title1='' title2='RG Blog' linkTxt1='RG에 빠진 아이들' link1='https://blog.naver.com/PostList.nhn?blogId=readinggate_official&from=postList&categoryNo=10' linkTxt2='슈퍼스타 수상자 인터뷰' link2='https://blog.naver.com/PostList.naver?blogId=readinggate_official&from=postList&categoryNo=14' bgColor='#2FB44A' bgImage='/src/images/@home/channer/channer_blog.svg' />
          <HomeBannerChanner title1='' title2='RG Story' linkTxt1='RG인 인터뷰 모아보기' link1='https://www.youtube.com/playlist?list=PLbIV2Wes7jczKZkbqMaIjHgSHwDLEuaFO' bgColor='#222B52' bgImage='/src/images/@home/channer/channer_youtube.svg' />
          <HomeBannerDonation link='https://blog.naver.com/readinggate_official/223396684842' bgImage='/src/images/@home/cards/donation_campaign.png' />
        </div>
      </main>
    </>
  )
}