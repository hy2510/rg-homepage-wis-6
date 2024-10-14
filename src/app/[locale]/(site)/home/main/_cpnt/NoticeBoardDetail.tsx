'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useOnLoadBoardNoticeDetail } from '@/client/store/home/hook'
import BoardDetail from './BoardDetail'

export default function NoticeBoardDetail({
  id,
  backColorWhite = true,
}: {
  id: string
  backColorWhite?: boolean
}) {
  const { payload, loading, error } = useOnLoadBoardNoticeDetail({
    notifyId: id,
  })
  // @Language 'common'
  const { t } = useTranslation()

  const title = payload.title || ''
  let date = ''
  if (payload.registDate) {
    date = payload.registDate.split('T')[0]
  }
  const html = payload.content || '<div></div>'

  return (
    <BoardDetail
      backLabel={t('t325')}
      backColorWhite={backColorWhite}
      title={title}
      date={date}
      htmlContents={html}
    />
  )
}
