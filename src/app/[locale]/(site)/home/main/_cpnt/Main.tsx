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
import { Margin } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'
import {
  RgNewsCardBasic,
  RgNewsCardCampaign,
  RgNewsCardInfographic,
  RgNewsCardNewsLetter,
  RgNewsContainer,
} from '@/ui/modules/home-main-components/HomeMainRgNews'
import {
  AdBannerType1,
  AdBannerType2,
  AdBannersGroup,
} from '@/ui/modules/home-main-components/home-main-ad-banners'
import LogIn from '@/ui/modules/home-main-components/home-main-log-in'
import MainBanner from '@/ui/modules/home-main-components/home-main-main-banner'
import {
  RgPostContainer,
  RgPostItem,
} from '@/ui/modules/home-main-components/home-main-rg-post'

const STYLE_ID = 'page_main'

type BeforeInstallPrompt = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function Main() {
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

  // PWA 설치 메세지 띄우기 -->
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }

    window.addEventListener(
      'beforeinstallprompt',
      handleBeforeInstallPrompt as EventListener,
    )

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt as EventListener,
      )
    }
  }, [])

  useEffect(() => {
    const handleAppInstalled = () => {
      console.log('PWA installed')
      setIsInstallable(false)
    }

    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      const promptEvent = deferredPrompt as BeforeInstallPrompt
      promptEvent.prompt()
      const choiceResult = await promptEvent.userChoice

      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt')
      } else {
        console.log('User dismissed the install prompt')
      }

      setDeferredPrompt(null)
      setIsInstallable(false)
    }
  }
  // <-- PWA 설치 메세지 띄우기

  if (!mainData) {
    return <div></div>
  }
  return (
    <main className={`${style.home_news} container`}>
      {mainData.slide.length > 0 && (
        <div className={style.item1}>
          <MainBanner banner={mainData.slide} />
        </div>
      )}
      <div className={style.item2}>
        {mainData.board.length > 0 && (
          <RgNewsContainer>
            {mainData.board.map((banner) => {
              if (banner.template === 'infographic') {
                return (
                  <RgNewsCardInfographic
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else if (banner.template === 'newsletter') {
                return (
                  <RgNewsCardNewsLetter
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else if (banner.template === 'campaign') {
                return (
                  <RgNewsCardCampaign
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              } else {
                return (
                  <RgNewsCardBasic
                    key={banner.link}
                    title={banner.title}
                    summary={banner.summary}
                    date={banner.date}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              }
            })}
          </RgNewsContainer>
        )}
      </div>
      <div className={style.item3}>
        <LogIn isLogin={isLogin} onClick={onClickMainLoginButton} />
      </div>
      <div className={style.item4}>
        <AdBannersGroup>
          {/* 하이도도 베너 */}
          {/* <div>{environment}</div> */}
          {main.isHidodoBanner && mainData.adImageBanner.length > 0 && (
            <>
              <Margin height={10} />
              {mainData.adImageBanner.map((banner) => {
                return (
                  <AdBannerType1
                    key={banner.image}
                    title={banner.title}
                    href={banner.link}
                    bgColor={banner.backgroundColor}
                    target={banner.self ? '' : '_blank'}
                    imgSrc={banner.image}
                    width={banner.width}
                    height={banner.height}
                  />
                )
              })}
            </>
          )}
          {isInstallable && (
            <>
              <Margin height={10} />
              <div
                onClick={() => {
                  handleInstallClick()
                }}>
                <AdBannerType1
                  title={''}
                  href={''}
                  imgSrc={'/src/images/@home/img_pwa_install.png'}
                  width={640}
                  height={640}
                />
              </div>
            </>
          )}
          {mainData.adBanner.length > 0 && (
            <>
              <Margin height={10} />
              {mainData.adBanner.map((banner) => {
                return (
                  <AdBannerType2
                    key={banner.link}
                    bgColor={banner.backgroundColor}
                    txt1={banner.title}
                    txt2={banner.subtitle}
                    imgSrc={banner.image}
                    href={banner.link}
                    target={banner.self ? '' : '_blank'}
                  />
                )
              })}
            </>
          )}
        </AdBannersGroup>
      </div>
      {main.isSotialRgPost && mainData.social.length > 0 ? (
        <div className={style.item5}>
          <RgPostContainer>
            {mainData.social.map((banner) => {
              return (
                <RgPostItem
                  key={banner.image}
                  imgSrc={banner.image}
                  href={banner.link}
                />
              )
            })}
          </RgPostContainer>
        </div>
      ) : (
        <>
          {target.academy && (
            <div className={style.item5}>
              <div
                style={{
                  fontSize: '1.3em',
                  fontWeight: '600',
                  marginBottom: '10px',
                }}>
                Gallery
              </div>
              <div style={{ marginBottom: '50px' }}>갤러리 준비중 입니다.</div>
            </div>
          )}
        </>
      )}
    </main>
  )
}