'use client'

import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { BackLink, Margin, Nav, NavItem } from '@/ui/common/common-components'
import Link from 'next/link'

const STYLE_ID = 'page_hall_of_fame'

export default function Layout({ children }: { children?: React.ReactNode }) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)
  const pathname = usePathname()

  const isTouchDevice = () => {
    return window.matchMedia('(pointer: coarse)').matches;
  };

  return (
    <main className={`${style.hall_of_fame} container compact`}>
      {isTouchDevice() && <Margin height={0} />}
      <BackLink href={SITE_PATH.HOME.MAIN} largeFont colorWhite>
        {t('t318')}
      </BackLink>
      {/* <Margin height={20} /> */}
      {/* <NavBar>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.HALL_OF_FAME_STUDENT) != -1}
          href={SITE_PATH.HOME.HALL_OF_FAME_STUDENT}>
          {t('t313')}
        </NavItem>
        <NavItem
          active={pathname.indexOf(SITE_PATH.HOME.HALL_OF_FAME_PARENTS) != -1}
          href={SITE_PATH.HOME.HALL_OF_FAME_PARENTS}>
          {t('t314')}
        </NavItem>
      </NavBar> */}
      <div className={style.contents_box}>
        <Nav>
          <Link href={SITE_PATH.HOME.HALL_OF_FAME_STUDENT}>
            <NavItem active={pathname.indexOf(SITE_PATH.HOME.HALL_OF_FAME_STUDENT) != -1}>{t('t313')}</NavItem>
          </Link>
          <Link href={SITE_PATH.HOME.HALL_OF_FAME_PARENTS}>
            <NavItem active={pathname.indexOf(SITE_PATH.HOME.HALL_OF_FAME_PARENTS) != -1}>{t('t314')}</NavItem>
          </Link>
        </Nav>
        {children}
      </div>
    </main>
  )
}
