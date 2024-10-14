export default function getMainData(template: string, isApp?: boolean) {
  if (template === 'school') {
    return DataSchool
  } else if (template === 'academy') {
    const cloneData = JSON.parse(JSON.stringify(DataSchool)) as MainTemplate
    cloneData.adBanner[2].link = 'https://aoneedu.cafe24.com/'
    return cloneData
  } else if (template === 'private_vn') {
    return DateVietnam
  }
  const cloneData = JSON.parse(JSON.stringify(DatePrivate)) as MainTemplate
  if (isApp) {
    cloneData.adBanner.shift()
  }
  return cloneData
}

type MainTemplate = {
  slide: SlideBanner[]
  board: BoardBanner[]
  social: SocialBanner[]
  adImageBanner: AdImageBanner[]
  adBanner: AdBarBanner[]
  campaign: number
}
type SlideBanner = {
  image: string
  link: string
  self: boolean
}
type BoardBannerOption = {
  tag: string
  image: string
  tagColor: string
  titleColor: string
  dateColor: string
  summaryColor: string
  backgroundColor: string
  button: string
}
type BoardBanner = {
  template: 'notice' | 'infographic' | 'campaign' | 'newsletter' | undefined
  title: string
  summary: string
  date: string
  link: string
  self: boolean
  customDecorate?: BoardBannerOption
}
type SocialBanner = {
  image: string
  link: string
  self: boolean
}
type AdImageBanner = {
  title: string
  backgroundColor: string
  image: string
  width: number
  height: number
  link: string
  self: boolean
}
type AdBarBanner = {
  title: string
  subtitle: string
  backgroundColor: string
  image: string
  link: string
  self: boolean
}

const DatePrivate: MainTemplate = {
  slide: [], //롤링배너
  board: [
    {
      template: 'infographic',
      title: '뜨거웠던 2023년! RG학습데이터 공개',
      summary: '한눈에 보기 쉽게 정리해 보았어요',
      date: '',
      link: '/home/main/rg-news/infographic/202303',
      self: true,
    },
    {
      template: 'newsletter',
      title: '2024년 9월 RG 뉴스레터',
      summary: '다양한 정보를 제공해 드려요',
      date: '',
      link: '/home/main/rg-news/newsletter/newsletter_vol21',
      self: true,
    },
    {
      template: 'campaign',
      title: '다독다독 기부캠페인',
      summary: '내가 읽은 책 한권이 누군가의 희망으로',
      date: '',
      link: '/home/main/rg-news/campaign',
      self: true,
    },
  ], //RG 게시판 링크
  social: [
    {
      image:
        'https://wcfresource.a1edu.com/newsystem/image/channel/channel240314.png?ver=240327093316',
      link: 'https://blog.naver.com/readinggate_official/223383172127',
      self: false,
    },
    {
      image:
        'https://wcfresource.a1edu.com/newsystem/image/channel/channel240321.png?ver=240327093316',
      link: 'https://www.youtube.com/watch?v=GKkyd0Wq328',
      self: false,
    },
    {
      image:
        'https://wcfresource.a1edu.com/newsystem/image/channel/channel240202.png?ver=240327093316',
      link: 'https://www.youtube.com/watch?v=vlSQPLDrqwo',
      self: false,
    },
  ], //소셜 링크
  adImageBanner: [
    {
      title: '하이도도',
      backgroundColor: '',
      image: '/src/sample-images/hidodo_banner.png',
      link: 'https://gohidodo.com',
      self: false,
      width: 320,
      height: 300,
    },
  ], //메인배너
  adBanner: [
    // {
    //   backgroundColor: '#ff274f20',
    //   title: 'B2B',
    //   subtitle: '문의하기',
    //   image: '/src/images/@home/img_letter.svg',
    //   link: 'https://www.readinggate.com/Community/BringInInstitution',
    //   self: false,
    // },
    // {
    //   backgroundColor: '#15b5f120',
    //   title: 'DODO & FRIENDS',
    //   subtitle: 'SHOP',
    //   image: '/src/images/@home/img_bag.svg',
    //   link: 'https://brand.naver.com/readinggate/category/ff06b3149209419ba775729610cf1144?cp=1',
    //   self: false,
    // },
    // {
    //   backgroundColor: '#9747FF20',
    //   title: 'WORK BOOK',
    //   subtitle: '구매하기',
    //   image: '/src/images/@home/img_note.svg',
    //   link: 'https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1',
    //   self: false,
    // },
    {
      backgroundColor: '#D2F8E5',
      title: '티켓 등록하기',
      subtitle: '',
      image: '/src/images/@home/ticket_icon.svg',
      link: '/home/rg-membership/payment/ticket',
      self: true,
    },
    {
      backgroundColor: '#15b5f130',
      title: '리딩게이트 소개',
      subtitle: '',
      image: '/src/images/@home/img_about.png',
      link: '/home/about-to-school',
      self: true,
    },
    {
      backgroundColor: '#ff274f20',
      title: '학습 이용 방법',
      subtitle: '',
      image: '/src/images/@home/img_guide.png',
      link: '/home/user-guide',
      self: true,
    },
    {
      backgroundColor: '#9747FF20',
      title: 'WORK BOOK',
      subtitle: '구매하기',
      image: '/src/images/@home/img_workbook.png',
      link: 'https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1',
      self: false,
    },
  ], //서브배너
  campaign: 0,
}

const DataSchool: MainTemplate = {
  slide: [], //롤링배너
  board: [
    {
      template: 'infographic',
      title: '뜨거웠던 2023년! RG학습데이터 공개',
      summary: '한눈에 보기 쉽게 정리해 보았어요',
      date: '',
      link: '/home/main/rg-news/infographic/202303',
      self: true,
    },
    {
      template: 'campaign',
      title: '다독다독 기부캠페인',
      summary: '내가 읽은 책 한권이 누군가의 희망으로',
      date: '',
      link: '/home/main/rg-news/campaign',
      self: true,
    },
  ], //RG 게시판 링크
  social: [], //소셜 링크
  adImageBanner: [], //메인배너
  adBanner: [
    {
      backgroundColor: '#15b5f130',
      title: '리딩게이트 소개',
      subtitle: '',
      image: '/src/images/@home/img_about.png',
      link: '/home/about-to-school',
      self: true,
    },
    {
      backgroundColor: '#ff274f20',
      title: '학습 이용 방법',
      subtitle: '',
      image: '/src/images/@home/img_guide.png',
      link: '/home/user-guide',
      self: true,
    },
    {
      backgroundColor: '#9747FF20',
      title: 'WORK BOOK',
      subtitle: '구매하기',
      image: '/src/images/@home/img_workbook.png',
      link: 'https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1',
      self: false,
    },
  ], //서브배너
  campaign: 0,
}

const DateVietnam: MainTemplate = {
  slide: [], //롤링배너
  board: [], //RG 게시판 링크
  social: [], //소셜 링크
  adImageBanner: [], //메인배너
  adBanner: [], //서브배너
  campaign: 0,
}
