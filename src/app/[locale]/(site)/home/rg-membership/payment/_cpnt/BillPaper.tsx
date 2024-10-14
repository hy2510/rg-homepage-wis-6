'use client'

import RgFormat from '@/app/rgformat'
import useTranslation from '@/localization/client/useTranslations'
import { Product } from '@/repository/client/object/purchase-product'
import { Button } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

export default function BillPaper({
  STYLE_ID,
  currency,
  product,
  active = false,
  onBuyClick,
}: {
  STYLE_ID: string
  currency: string
  product?: Product
  active?: boolean
  onBuyClick?: () => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <div
      className={style.process_payment}
      style={{ position: 'sticky', top: '98px' }}>
      {product ? (
        <>
          <div className={style.row}>
            <div className={style.col_1}>
              {/* 상품명 */}
              {t('t639')}
            </div>
            <div className={style.col_2}>{product.name}</div>
          </div>
          <div className={style.row}>
            <div className={style.col_1}>
              {/* 학습기간 */}
              {t('t640')}
            </div>
            <div className={style.col_2}>
              {t('t052', { num: product.value })}
            </div>
          </div>
          <div className={style.row}>
            <div className={style.col_1}>
              {/* 정가 */}
              {t('t641')}
            </div>
            <div className={style.col_2}>
              {RgFormat.toNumberMoneyString(product.fee, currency)}
            </div>
          </div>
          {product?.discount.map((discount, i) => {
            return (
              <div className={style.row} key={`discount-opt-${i}`}>
                <div className={style.col_1}>{discount.name}</div>
                <div className={style.col_2}>
                  -{RgFormat.toNumberMoneyString(discount.fee, currency)}
                </div>
              </div>
            )
          })}
          <div className={style.line}></div>
          <div className={style.final_row}>
            <div className={style.col_1}>
              {/* 최종 결제 금액 */}
              {t('t642')}
            </div>
            <div className={style.col_2}>
              {RgFormat.toNumberMoneyString(product.totalFee, currency)}
            </div>
          </div>
          <Button
            shadow
            color={!!product && active ? 'blue' : 'gray'}
            onClick={onBuyClick}>
            {/* 결제하기 */}
            {t('t193')}
          </Button>
        </>
      ) : (
        <div>
          {/* 이용권을 선택하세요. <br /> 상세 내용이 표시됩니다. */}
          {t('t644')} <br />
          {t('t645')}
        </div>
      )}
    </div>
  )
}
