'use client'

// @Deprecate('Not Used')
import useTranslation from '@/localization/client/useTranslations'
import Image from 'next/image'
import { ReactNode, useState } from 'react'
import { Modal } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'set_filter'

// 필터 콘테이너
export function SetFilter() {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const [isActiveSetFilter, _isActiveSetFilter] = useState(false)

  return (
    <>
      <div className={style.set_filter}>
        <div className={style.filter_items}>
          <FilterItem>
            {/* 미완료 학습 */}
            {t('t346')}
          </FilterItem>
          <FilterItem>
            {/* 기본 정렬 */}
            {t('t356')}
          </FilterItem>
          <FilterItem>Fiction</FilterItem>
        </div>
        <div
          className={style.filter_button}
          onClick={() => {
            _isActiveSetFilter(true)
          }}>
          <Image
            alt=""
            src="/src/images/filter-icons/filter_blue.svg"
            width={20}
            height={20}
          />
          <div className={style.txt_l}>
            {/* 필터 */}
            {t('t526')}
          </div>
        </div>
      </div>
      {isActiveSetFilter && (
        <SetFilterModal _isActiveSetFilter={_isActiveSetFilter} />
      )}
    </>
  )
}

// 필터 아이템
export function FilterItem({ children }: { children?: ReactNode }) {
  const style = useStyle(STYLE_ID)

  return <div className={style.filter_item}>{children}</div>
}

// 필터 설정 팝업
export function SetFilterModal({
  _isActiveSetFilter,
}: {
  _isActiveSetFilter?: (isActive: boolean) => void
}) {
  const style = useStyle(STYLE_ID)

  const { t } = useTranslation()

  return (
    <Modal
      compact
      header
      title={t('t527')} // 필터 설정
      onClickDelete={() => {
        _isActiveSetFilter && _isActiveSetFilter(false)
      }}
      onClickLightbox={() => {
        _isActiveSetFilter && _isActiveSetFilter(false)
      }}>
      <div className={style.set_filter_modal}>
        <div className={style.row_a}>
          <div className={style.txt_h}>
            {/* 학습 상태 */}
            {t('t344')}
          </div>
          <div className={style.items}>
            <SetFilterItem>
              {/* 모든 학습 */}
              {t('t345')}
            </SetFilterItem>
            <SetFilterItem active>
              {/* 미완료 학습 */}
              {t('t346')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 완료한 학습 */}
              {t('t347')}
            </SetFilterItem>
          </div>
        </div>
        <div className={style.row_b}>
          <div className={style.txt_h}>
            {/* 부가 설정 */}
            {t('t528')}
          </div>
          <div className={style.items}>
            <SetFilterItem active>
              {/* 설정 안함 */}
              {t('t529')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 학습 1회차를 Full모드로 완료함 */}
              {t('t530')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 학습 1회차를 Easy모드로 완료함 */}
              {t('t531')}
            </SetFilterItem>
          </div>
        </div>
        <div className={style.row_c}>
          <div className={style.txt_h}>
            {/* 정렬 방법 */}
            {t('t348')}
          </div>
          <div className={style.items}>
            <SetFilterItem active>
              {/* 기본 정렬 */}
              {t('t356')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 선호도순 */}
              {t('t349')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 인기순 */}
              {t('t350')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 업데이트순 */}
              {t('t351')}
            </SetFilterItem>
            <SetFilterItem>
              {/* 포인트순 */}
              {t('t352')}
            </SetFilterItem>
          </div>
        </div>
        <div className={style.row_d}>
          <div className={style.txt_h}>
            {/* 장르별 */}
            {t('t353')}
          </div>
          <div className={style.items}>
            <SetFilterItem>
              {/* 모든 장르 */}
              {t('t354')}
            </SetFilterItem>
            <SetFilterItem active>Fiction</SetFilterItem>
            <SetFilterItem>Non-Fiction</SetFilterItem>
          </div>
        </div>
      </div>
    </Modal>
  )
}

// 필터 설정 아이템
export function SetFilterItem({ active, children, onClick }: any) {
  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.set_filter_item} ${active && style.active}`}
      onClick={onClick}>
      {children}
    </div>
  )
}
