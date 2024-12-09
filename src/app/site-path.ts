import { supportLanguages } from '@/localization/localize-config'

const CATALOG = {
  CATALOG: '/catalog',
  BASIC: '/catalog/dodo-abc',
  EBOOK: '/catalog/ebook',
  PBOOK_QUIZ: '/catalog/pbook-quiz',
  MOTIVATION: '/catalog/motivation',
  MOVIE_CONTENTS: '/catalog/movie-contents',
  AI_SPEAK: '/catalog/ai-speak',
}

const HOME = {
  MAIN: '/home/main',
  NOTICE: '/home/main/rg-news/notice',
  GALLERY: '/home/main/rg-news/gallery',
  NEWS_LETTER: '/home/main/rg-news/newsletter',
  NEW_CONTENTS: '/home/main/rg-news/new-contents',
  INFOGRAPHIC: '/home/main/rg-news/infographic',
  EVENT_CHALLENGE: '/home/main/rg-news/challenge',
  EVENT_SUPERSTAR: '/home/main/rg-news/superstar',
  EVENT_READING_CAMPAIN: '/home/main/rg-news/campaign',
  NEWS_POST: '/home/main/rg-news-post',
  CUSTOMER_INTERVIEW: '/home/customer-review/interview',
  HALL_OF_FAME: '/home/hall-of-fame',
  HALL_OF_FAME_STUDENT: '/home/hall-of-fame/student',
  HALL_OF_FAME_PARENTS: '/home/hall-of-fame/parents',
  SNS_REVIEW: '/home/customer-review/sns',
  MEMBERSHIP_INTRODUCE: '/home/rg-membership/introduction',
  MEMBERSHIP_PAYMENT: '/home/rg-membership/payment/purchase',
  MEMBERSHIP_PAYMENT_HISTORY: '/home/rg-membership/payment/history',
  MEMBERSHIP_TICKET: '/home/rg-membership/payment/ticket',
  MEMBERSHIP_REFUND_POLICY: '/home/rg-membership/refund-policy',
  MEMBERSHIP_SERVICE_TERM: '/home/rg-membership/terms-of-service',
  MEMBERSHIP_PRIVACY_POLICY: '/home/rg-membership/privacy-policy',
  RG_PAYMENT: '/home/rg-payment/purchase',
  RG_PAYMENT_HISTORY: '/home/rg-payment/history',
  USER_GUIDE: '/home/user-guide',
  USER_GUIDE_VN: '/home/user-guide-vn',
  ABOUT_TO_SCHOOL: '/home/about-to-school',
  ABOUT_VN: '/home/about-vn',
  ABOUT_GLOBAL: '/home/about-global',
}
const ACCOUNT = {
  MAIN: '/account/account-list',
  SIGN_IN: '/account/sign-in',
  SIGN_UP: '/account/sign-up',
  SIGN_UP_WELCOME: '/account/welcome',
  FORGOT_ID: '/account/forgot-id',
  FORGOT_PASSWORD: '/account/forgot-password',
  INFO: '/account/account-info',
  CHANGE_PASSWORD: '/account/change-password',
  SIGN_IN_PORTAL: '/account/sign-in-portal',
  GROUP_MOVE_CLASS: '/account/group-move-class',
  GROUP_SEARCH: '/account/group-search',
}
const BASIC = {
  HOME: '/basic',
  PRE_K: '/basic/pre-k',
  DODO_ABC: '/basic/dodo-abc',
}
const LIBRARY = {
  HOME: '/library',
  TODO: '/library/assignment/to-do',
  TRY_AGAIN: '/library/assignment/try-again',
  FAVORITE: '/library/assignment/favorite',
  DODO_ABC_STUDY: '/library/dodo-abc/study',
  DODO_ABC_SONG: '/library/dodo-abc/song-n-chant',
  DODO_ABC_GAME: '/library/dodo-abc/game',
  PRE_K: '/library/pre-k',
  E_BOOK: '/library/e-book',
  P_BOOK: '/library/p-book-quiz',
  NEW_BOOK: '/library/new-books',
  SEARCH: '/library/search',
  SERIES: '/library/series',
  THEME: '/library/theme',
  MOVIE_BOOK: '/library/movie-book',
  WORKBOOK: '/library/workbook',
  SERIES_LIST: '/library/series-list',
  SERIES_LIST_EB: '/library/series-list/e-book',
  SERIES_LIST_PB: '/library/series-list/p-book-quiz',
  THEME_LIST: '/library/theme-list',
  THEME_LIST_EB: '/library/theme-list/e-book',
  THEME_LIST_PB: '/library/theme-list/p-book-quiz',
}
const REVIEW = {
  SIMPLE: '/review',
  DETAIL: '/review/detailed-view',
}
const RANKING = {
  MAIN: '/ranking',
  POINT: '/ranking/points-rank',
  CAHLLENGE: '/ranking/challenge-rank',
  LEVEL_MASTER_BOARD: '/ranking/level-master-board',
  HALL_OF_FAME: '/ranking/hall-of-fame-rank',
}
export const STAFF_PATH = {
  MAIN: '/staff',
  MIRAGE: '/mirage',
  BOARD: '/staff/board',
  GALLERY: '/staff/gallery',
}

const PARAMS_PATH = [
  `${ACCOUNT.SIGN_IN_PORTAL}/[param]`,
  `${HOME.NEWS_LETTER}/[param]`,
  `${HOME.NEW_CONTENTS}/[param]`,
  `${HOME.INFOGRAPHIC}/[param]`,
  `${HOME.EVENT_CHALLENGE}/[param]`,
  `${HOME.EVENT_SUPERSTAR}/[param]`,
  `${HOME.EVENT_READING_CAMPAIN}/[param]`,
  `${HOME.NEWS_POST}/[param]`,
]

export function isValidatePath(path: string): boolean {
  let isStartWithLocale = false
  for (let i = 0; i < supportLanguages.length; i++) {
    if (path.startsWith(`/${supportLanguages[i]}`)) {
      isStartWithLocale = true
    }
  }

  const searchPath = (
    isStartWithLocale
      ? path.indexOf('/', 1) >= 0
        ? path.substring(path.indexOf('/', 1))
        : ''
      : path
  ).split('?')[0]
  if (searchPath === '') {
    return true
  }
  let isContainPath = false
  const entries = Object.entries(SITE_PATH)
  for (let i = 0; i < entries.length; i++) {
    const item = entries[i]
    const itemValue = item[1]
    const type = typeof itemValue
    if (type === 'object') {
      const paths = Object.values(itemValue)
      for (let j = 0; j < paths.length; j++) {
        const p = paths[j]
        isContainPath = p === searchPath
        if (isContainPath) {
          break
        }
      }
    }
    if (isContainPath) {
      break
    }
  }
  if (!isContainPath) {
    const paramPattern = /^\[[a-zA-Z0-9-_]+\]$/
    let patternMatch = false
    for (let i = 0; i < PARAMS_PATH.length; i++) {
      const pathDiv = searchPath.split('/')
      const paramPathDiv = PARAMS_PATH[i].split('/')
      patternMatch =
        pathDiv.length > 0 && pathDiv.length === paramPathDiv.length

      if (patternMatch) {
        for (let j = 0; j < pathDiv.length; j++) {
          const p1 = pathDiv[j]
          const p2 = paramPathDiv[j]
          if (paramPattern.test(p2)) {
            continue
          }
          patternMatch = p1 === p2
          if (!patternMatch) {
            break
          }
        }
        if (patternMatch) {
          break
        }
      }
    }
    isContainPath = patternMatch
  }
  return isContainPath
}

export function getValidatePath(path: string): string {
  let isContainPath = isValidatePath(path)
  if (!isContainPath) {
    return HOME.MAIN
  }
  return path
}

export const CUSTOMER_CENTER_URL = {
  private:
    'https://ossified-smell-f52.notion.site/RG-a8fc674ab32f458ca70d659e1916e34c',
  school:
    'https://ossified-smell-f52.notion.site/bcdb1eaf03a34c34a4a0567eec292601',
  academy:
    'https://ossified-smell-f52.notion.site/44d6a2eb4c1c4199bc5745077033b1ea',
}

export const EXTERNAL_URL = {
  kakaoChannel: 'https://pf.kakao.com/_iUbiM',
  academyPromotion:
    'https://guest2.readinggate.com/News/LibraryBoardNotice?notifytype=094001&no=891',
}

const SITE_PATH = {
  CATALOG,
  HOME,
  ACCOUNT,
  BASIC,
  LIBRARY,
  REVIEW,
  RANKING,
}
export default SITE_PATH
