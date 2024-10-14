// @Deprecate('Not Used')
import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'home_main_rg_news'

export const RgNewsContainer = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  return (
    <div className={style.rg_news_container}>
      <div className={style.row_1}>
        <div style={{ display: 'inline-block' }}>
          <Link
            href={'https://www.readinggate.com/News/LibraryBoardNotice/'}
            target="_blank"
            className={style.btn_read_more}>
            <span className={style.txt_title}>
              {/* RG 소식 */}
              {t('t326')}
            </span>
            <div className={style.ico_arrow}></div>
          </Link>
        </div>
      </div>
      <div className={style.row_2}>{children}</div>
    </div>
  )
}

export const RgNewsCard = ({
  tag,
  tagColor,
  title,
  titleColor,
  summary,
  summaryColor,
  date,
  dateColor,
  bgColor,
  bgImage,
  btnMore,
  href,
  target,
}: {
  tag?: string
  tagColor?: string
  title?: string
  titleColor?: string
  summary?: string
  summaryColor?: string
  date?: string
  dateColor?: string
  bgColor?: string
  bgImage?: string
  btnMore?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  const { t } = useTranslation()

  return (
    <Link
      href={href ? href : ''}
      className={style.rg_post_card}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : '',
        backgroundColor: bgColor ? bgColor : '',
      }}
      target={target ? target : '_self'}>
      {/* 공지 */}
      <div
        className={style.tag}
        style={{ color: tagColor ? tagColor : '#3AB6FF' }}>
        {tag ? tag : t('t325')}
      </div>
      <div
        className={style.title}
        style={{ color: titleColor ? titleColor : '' }}>
        {title}
      </div>
      {summary ? (
        <div
          className={style.summary}
          style={{ color: summaryColor ? summaryColor : '' }}>
          {summary}
        </div>
      ) : (
        <></>
      )}
      <div className={style.date} style={{ color: dateColor ? dateColor : '' }}>
        {date}
      </div>
      {btnMore ? (
        <div
          className={style.btnMore}
          style={{
            color: tagColor ? tagColor : '',
            borderColor: tagColor ? tagColor : '',
            backgroundColor: bgColor ? bgColor : '#fff',
          }}>
          {btnMore}
        </div>
      ) : (
        <></>
      )}
    </Link>
  )
}
