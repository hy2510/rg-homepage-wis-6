'use client'

import ClientTo from '@/app/_app/ClientTo'
import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'
import {
  useStudentIsLogin,
  useStudentStudyable,
} from '@/client/store/student/info/selector'
import Ticket from '../_cpnt/Ticket'

export default function Page() {
  const { value: studyState } = useStudentStudyable()

  // @language 'common'
  const { t } = useTranslation()

  const { isPaymentable } = useSiteBlueprint()
  const isLogin = useStudentIsLogin()

  if (isPaymentable && !isLogin) {
    alert('로그인 후 이용 가능합니다.')
    return <ClientTo to={SITE_PATH.HOME.MAIN}></ClientTo>
  }

  if (studyState === 'PAUSED') {
    // 학습 일시중지 중에는 티켓등록을 할 수 없습니다.
    return <div>{t('t731')}</div>
  }
  return <Ticket />
}
