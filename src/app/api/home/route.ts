import { getCustomerWithHeader } from '@/authorization/server/nextjsHeaderCustomer'
import { NextRequest } from 'next/server'
import Home from '@/repository/server/home'
import { RouteResponse, executeRequestAction, getParameters } from '../_util'
import getMainData from './main-sample'

type SlideBanner = {
  SlidingBannerId: string
  Priority: number
  SlidingBannerType: string
  ImagePath: string
  LinkUrl: string
  MessageData: string
  DeleteYn: boolean
  NewBrowser: string
}
type Notice = {
  NotifyId: string
  Title: string
  ReadCount: number
  StartDate: string
  EndDate: string
  PrevNotifyId: string
  NextNotifyId: string
  RegistDate: string
}

export async function GET(request: NextRequest) {
  const customer = getCustomerWithHeader()
  if (!customer) {
    return RouteResponse.invalidCustomerToken()
  }
  const parameter = await getParameters(request, 'template', 'platform')
  const template = parameter.getString('template')
  const platform = parameter.getString('platform', 'Web').toLowerCase()

  const [noticePayload, noticeStatus, noticeError] = await executeRequestAction(
    Home.noticeMainList(customer),
  )
  if (
    noticeError ||
    (noticeStatus.status < 200 && noticeStatus.status >= 300) ||
    !noticePayload.Board
  ) {
    return RouteResponse.commonError()
  }
  const [slidePayload, slideStatus, slideError] = await executeRequestAction(
    Home.slidingBanner(customer),
  )
  if (
    slideError ||
    (slideStatus.status < 200 && slideStatus.status >= 300) ||
    !slidePayload.Banner
  ) {
    return RouteResponse.commonError()
  }

  const [campaignPayload, campaignStatus, campaignError] =
    await executeRequestAction(Home.statisticRead())
  if (
    campaignError ||
    (campaignStatus.status < 200 && campaignStatus.status >= 300) ||
    !campaignPayload
  ) {
    return RouteResponse.commonError()
  }
  const data = JSON.parse(
    JSON.stringify(getMainData(template, platform !== 'web')),
  )

  // MEMO : App 인 경우, 광고 배너 제거
  const slideBannerList = slidePayload.Banner.filter((item: any) => {
    // if (true || platform === 'android' || platform === 'ios') {
    //   // return (
    //   //   item.MessageData.indexOf('NEW 리딩게이트를 만나보세요') >= 0 ||
    //   //   item.MessageData.indexOf('영어독서왕선발대회') >= 0 ||
    //   //   item.LinkUrl.indexOf('/NewBooks') >= 0
    //   // )
    //   return item.MessageData.indexOf('영어독서왕선발대회') >= 0
    // }
    return true
  })
  const slideBanner: { image: string; link: string; self: boolean }[] =
    slideBannerList.map(
      (bnr: SlideBanner): { image: string; link: string; self: boolean } => {
        let self = bnr.NewBrowser !== 'Y'
        let link = bnr.LinkUrl || '#'
        if (self) {
          const linkUrl = bnr.LinkUrl
          if (linkUrl.startsWith('/News/LibraryBoardNotice')) {
            const data = linkUrl.split('no=')
            if (data.length === 2) {
              link = `/home/main/rg-news-post/${data[1]}`
            }
          } else if (linkUrl.startsWith('/News/NewBooks')) {
            link = `/home/main/rg-news/new-contents`
          } else if (linkUrl.startsWith('/Community/BringInInstitution')) {
            link = 'https://www.readinggate.com/Community/BringInInstitution'
            self = false
          }
        }
        return {
          image: bnr.ImagePath,
          link,
          self,
        }
      },
    )
  data.slide = slideBanner

  const mainNotice: {
    template: 'notice'
    title: string
    summary: string
    date: string
    link: string
    self: boolean
  }[] = noticePayload.Board.map(
    (
      board: Notice,
    ): {
      template: 'notice'
      title: string
      summary: ''
      date: string
      link: string
      self: true
    } => {
      return {
        template: 'notice',
        title: board.Title,
        summary: '',
        date: board.RegistDate.substring(0, 10),
        link: `/home/main/rg-news-post/${board.NotifyId}`,
        self: true,
      }
    },
  )
  const cardNotice = [...data.board]
  const loopCount = 3
  const newBoard: {
    template: 'notice' | 'infographic' | 'campaign' | 'newsletter' | undefined
    title: string
    summary: string
    date: string
    link: string
    self: boolean
  }[] = []
  for (let i = 0; i < loopCount; i++) {
    if (mainNotice[i]) {
      newBoard.push(mainNotice[i])
    }
    if (cardNotice[i]) {
      newBoard.push(cardNotice[i])
    }
  }
  data.board = newBoard
  data.campaign = Number(campaignPayload.TotalBooks)

  return RouteResponse.response(data, noticeStatus)
}
