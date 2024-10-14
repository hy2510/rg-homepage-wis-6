'use client'

import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { useAchieveReadingKingTrophy } from '@/client/store/achieve/readingking-trophy/selector'
import { AlertBar, EmptyMessage } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'global_option_my_rg'

// 챌린지(영어 독서왕 시상) 어워드
export function ChallengeAward() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const TROPHY_IMAGES = [
    '/src/images/@award-challenge/award_daesang.svg',
    '/src/images/@award-challenge/award_choiwoosu.svg',
    '/src/images/@award-challenge/award_woosu.svg',
    '/src/images/@award-challenge/award_sungsil.svg',
  ]

  const awardReadingKing = useAchieveReadingKingTrophy().payload

  return (
    <div className={style.challenge_award}>
      <AlertBar>{t('t089')}</AlertBar>
      {!awardReadingKing || awardReadingKing.length <= 0 ? (
        <EmptyMessage isAward>{t('t085')}</EmptyMessage>
      ) : (
        <div className={style.challenge_award_list}>
          {awardReadingKing.map((award, idx) => {
            return (
              <div key={`award_readingking_${idx}`}>
                <ChallengeAwardItem
                  awardImgSrc={TROPHY_IMAGES[award.prizeGrade - 1]}
                  awardName={award.prizeTitle}
                  awardGetDate={award.registDate}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

// 챌린지(영어 독서왕 시상) 어워드 > 어워드 아이템
function ChallengeAwardItem({
  awardImgSrc,
  awardName,
  awardGetDate,
}: {
  awardImgSrc: string
  awardName: string
  awardGetDate: string
}) {
  const style = useStyle(STYLE_ID)

  return (
    <div className={style.challenge_award_item}>
      <div className={style.row_a}>
        <div className={style.award_image}>
          <Image alt="" src={awardImgSrc} width={120} height={120} />
        </div>
        <div className={style.award_image_bg}></div>
      </div>
      <div className={style.row_b}>
        <div className={style.txt_l1}>{awardName}</div>
        <div className={style.txt_l2}>{awardGetDate}</div>
      </div>
    </div>
  )
}
