'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { goToLevelTest } from '@/app/_function/study-start'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import { useFetchSetStudentDailyLearningLevel } from '@/client/store/student/daily-learning/hook'
import { useOnLoadLevelTestInfo } from '@/client/store/student/level-test-info/hook'
import { useLevelTestInfo } from '@/client/store/student/level-test-info/selector'
import { IntroChooseLevel } from '@/ui/modules/library-intro-choose-level/intro-choose-level'

export default function LevelSelectMode({
  onSelectLevel,
}: {
  onSelectLevel?: (level: string) => void
}) {
  const { language } = useLanguagePackContext()

  // @language 'common'
  const { t } = useTranslation()

  const { target } = useSiteBlueprint()
  const { loading: isLevelTestInfoLoading } = useOnLoadLevelTestInfo()
  const { loading: isLevelChangeLoading, fetch: fetchLevelChange } =
    useFetchSetStudentDailyLearningLevel()

  const levelTestInfo = useLevelTestInfo().payload

  const onLevelSelect = (level: string) => {
    if (!isLevelChangeLoading) {
      fetchLevelChange(level, (isSuccess) => {
        if (isSuccess) {
          onSelectLevel && onSelectLevel(level)
        }
      })
    }
  }

  const onStartLevelTest = () => {
    if (levelTestInfo.isAvailableLevelTest) {
      goToLevelTest({ language })
    } else if (target.private) {
      alert(t('t743')) // 레벨테스트는 유료회원만 응시할 수 있습니다.
    } else {
      alert(t('t744')) // 레벨테스트를 진행할 수 없습니다.
    }
  }

  return (
    <IntroChooseLevel
      onChooseLevel={onLevelSelect}
      onStartLevelTest={onStartLevelTest}
    />
  )
}
