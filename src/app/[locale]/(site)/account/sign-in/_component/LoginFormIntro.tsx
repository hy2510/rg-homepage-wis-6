'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import ChooseLanguage from '@/ui/common/ChooseLanguage'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_sign_in'

export default function LoginFormIntro({
  onClickNav,
}: {
  onClickNav?: (nav: 'P' | 'G') => void
}) {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <>
      <div style={{ marginTop: 'var(--space-l)' }}>
        <ChooseLanguage />
      </div>
      <div className={style.choose_user_type}>
        <div
          className={style.card}
          onClick={() => onClickNav && onClickNav('P')}>
          <div className={style.symbol_image}>
            <Image
              src={'/src/images/@account/symbol_icon_indi.png'}
              width={60}
              height={66}
              alt=""
            />
          </div>
          <div className={style.txt_1}>
            {/* 개인 회원 */}
            {t('t258')}
          </div>
          <div className={style.txt_2}>
            {/* '일반' 회원인 경우, 로그인 또는 가입하려면 선택해 주세요. */}
            {t('t636')}
          </div>
        </div>
        <div
          className={style.card}
          onClick={() => onClickNav && onClickNav('G')}>
          <div className={style.symbol_image}>
            <Image
              src={'/src/images/@account/symbol_icon_school.svg'}
              width={76}
              height={86}
              alt=""
            />
          </div>
          <div className={style.txt_1}>
            {/* 그룹 회원 */}
            {t('t259')}
          </div>
          <div className={style.txt_2}>
            {/* '학교 또는 학원' 등 기관 회원인 경우, 로그인 하려면 선택해 주세요. */}
            {t('t638')}
          </div>
        </div>
      </div>
    </>
  )
}
