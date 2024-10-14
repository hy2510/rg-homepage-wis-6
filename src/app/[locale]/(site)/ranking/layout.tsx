'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { ReactNode } from 'react'
import { RankingNavBar } from '@/ui/modules/ranking-nav-bar/ranking-nav-bar'

export default function Layout({ children }: { children?: ReactNode }) {
  const {
    isChallengeMenu: isOpenChallenge,
    isShowLevelMasterRanking: isOpenLevelMaster,
  } = useSiteBlueprint()

  return (
    <div className="container compact">
      <RankingNavBar
        isOpenChallenge={isOpenChallenge}
        isOpenLevelMaster={isOpenLevelMaster}
      />
      {children}
    </div>
  )
}
