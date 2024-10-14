import NoticeBoardDetail from '@/app/[locale]/(site)/home/main/_cpnt/NoticeBoardDetail'

export default function Page({ params }: { params: { id: string } }) {
  return <NoticeBoardDetail id={params.id} backColorWhite={false} />
}
