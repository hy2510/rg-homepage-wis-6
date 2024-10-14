'use client'

import RgFormat from '@/app/rgformat'
import useTranslation from '@/localization/client/useTranslations'
import { Product } from '@/repository/client/object/purchase-product'
import { useStyle } from '@/ui/context/StyleContext'

export default function ProductCardList({
  STYLE_ID,
  currency = 'KRW',
  product = [],
  activeId,
  onProductClick,
}: {
  STYLE_ID: string
  currency?: string
  product?: Product[]
  activeId?: string
  onProductClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <div className={style.product_list}>
      <div className={style.section_title}>
        {/* 상품 선택 */}
        {t('t689')}
      </div>
      <div className={style.cards}>
        {product?.map((item) => {
          return (
            <ProductCard
              key={item.id}
              id={item.id}
              STYLE_ID={STYLE_ID}
              currency={currency}
              active={activeId === item.id}
              day={item.value}
              title={item.name}
              originalPrice={item.fee}
              finalPrice={item.totalFee}
              onProductClick={onProductClick}
            />
          )
        })}
      </div>
    </div>
  )
}

function ProductCard({
  STYLE_ID,
  id,
  currency,
  active,
  day,
  title,
  originalPrice,
  finalPrice,
  onProductClick,
}: {
  STYLE_ID: string
  id: string
  currency: string
  active: boolean
  day: number
  title: string
  originalPrice: number
  finalPrice: number
  onProductClick?: (id: string) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const style = useStyle(STYLE_ID)

  return (
    <div
      className={`${style.product_card} ${active && style.active}`}
      onClick={() => {
        onProductClick && onProductClick(id)
      }}>
      <div className={style.tag}>{t('t052', { num: day })}</div>
      <div className={style.title}>{title}</div>
      <div
        className={style.original_price}
        style={{ opacity: originalPrice === finalPrice ? 0 : 1 }}>
        {RgFormat.toNumberMoneyString(originalPrice, currency)}
      </div>
      <div className={style.final_price}>
        {RgFormat.toNumberMoneyString(finalPrice, currency)}
      </div>
    </div>
  )
}
