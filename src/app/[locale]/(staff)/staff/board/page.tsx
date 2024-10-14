'use client'

import NoticeBoardList from '@/app/[locale]/(site)/home/main/_cpnt/NoticeBoardList'
import { STAFF_PATH } from '@/app/site-path'

export default function Page({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <NoticeBoardList
      linkPath={STAFF_PATH.BOARD}
      pagePath={STAFF_PATH.BOARD}
      page={page}
    />
  )
}
