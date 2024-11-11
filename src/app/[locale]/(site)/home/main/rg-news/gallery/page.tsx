import SITE_PATH from '@/app/site-path'
import NoticeBoardList from '../../_cpnt/NoticeBoardList'
import { Margin } from '@/ui/common/common-components'

export default function Page({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  return (
    <>
      <Margin height={15} />
      <NoticeBoardList
        linkPath={SITE_PATH.HOME.NEWS_POST}
        pagePath={SITE_PATH.HOME.GALLERY}
        page={page}
        grid
      />
    </>
  )
}
