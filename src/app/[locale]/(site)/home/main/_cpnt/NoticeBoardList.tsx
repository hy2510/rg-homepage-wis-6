'use client'

import { useRouter } from 'next/navigation'
import { useOnLoadBoardNoticeList } from '@/client/store/home/hook'
import BoardList from './BoardList'

export default function NoticeBoardList({
  linkPath,
  pagePath,
  page,
  grid,
}: {
  linkPath: string
  pagePath: string
  page: number
  grid?: boolean
}) {
  const { payload, loading, error } = useOnLoadBoardNoticeList({ page })

  const noticeList = [
    ...payload.board.map((board) => {
      return {
        title: board.title,
        date: board.registDate.split('T')[0],
        link: `${linkPath}/${board.notifyId}`,
      }
    }),
  ]
  const maxPage = payload?.page?.totalPages || 0

  const route = useRouter()
  const onPageChange = (page: number) => {
    route.push(`${pagePath}?page=${page}`)
  }

  return (
    <BoardList
      list={noticeList}
      page={page}
      maxPage={maxPage}
      onPageClick={onPageChange}
      grid={grid}
    />
  )
}
