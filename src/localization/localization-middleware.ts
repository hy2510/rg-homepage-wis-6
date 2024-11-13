import { NextRequest, NextResponse } from 'next/server'
import { KOREAN, VIETNAMESE, supportLanguages } from './localize-config'

export default function localizationMiddleware(
  request: NextRequest,
): NextResponse | undefined {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get('host') || ''
  const headerAcceptLanguage =
    request.headers.get('Accept-Language') || undefined

  const defaultLanguage = supportLanguages[0]
  const savedLng = request.cookies.get('lang')?.value

  let targetLocale: string | undefined = undefined
  let targetUri: string | undefined = undefined
  let dev = ''

  if (pathname === '' || pathname === '/') {
    dev = 'ROOT'
    targetUri = `/`
  } else {
    const pathLng = pathname.substring(1).split('/')[0]
    if (!supportLanguages.includes(pathLng)) {
      dev = 'pathname append ' + pathLng
      targetUri = `${pathname}`
    } else {
      dev = 'pathname NONT'
      targetLocale = pathLng
    }
  }

  if (!targetLocale) {
    let findLocale = targetLocale
    if (savedLng && supportLanguages.includes(savedLng)) {
      findLocale = savedLng
    }
    if (!findLocale) {
      //FIXME : vn.readinggate.com 인 경우, vn 고정
      // www.readinggate.com 인 경우, ko 고정
      if (
        host === 'www.readinggate.com' ||
        host === 'apps.readinggate.com' ||
        host === 'dev.readinggate.com:53000'
      ) {
        findLocale = KOREAN
      } else if (
        host === 'vn.readinggate.com' ||
        host === 'rgvn.readinggate.com' ||
        host === 'readingq.readinggate.com' ||
        host === 'readingq2.readinggate.com'
      ) {
        findLocale = VIETNAMESE
      } else {
        const sysLng = findLocaleByAcceptLanguage(
          headerAcceptLanguage,
          supportLanguages,
          defaultLanguage,
        )
        findLocale = sysLng
      }
    }
    targetLocale = findLocale
  }

  let response: NextResponse | undefined = undefined
  if (targetUri) {
    response = NextResponse.redirect(
      new URL(`${request.nextUrl.origin}/${targetLocale}${targetUri}${search}`),
    )
  } else if (savedLng !== targetLocale) {
    response = NextResponse.next()
  }
  if (response) {
    const yearToSeconds = 365 * 24 * 60 * 60
    response.cookies.set('lang', targetLocale, {
      httpOnly: true,
      maxAge: yearToSeconds,
    })
  }

  return response
}

function findLocaleByAcceptLanguage(
  acceptLanguage: string | undefined,
  supportLanguages: string[],
  defaultLanguage: string,
): string {
  if (!acceptLanguage) {
    return defaultLanguage
  }

  const languages = acceptLanguage
    .split(',')
    .map((lng) => {
      let language = lng.trim()
      let country = undefined
      let order = 1.0

      if (language.indexOf(';q=') > 0) {
        const [lang, q] = language.split(';q=')
        language = lang.trim()
        const qNum = Number(q) || 0
        if (qNum > 1) {
          order = 1.0
        } else if (qNum < 0) {
          order = 0.0
        } else {
          order = qNum
        }
      }
      if (language.indexOf('-') > 0) {
        const [lang, loc] = language.split('-')
        language = lang.trim()
        country = loc.trim()
      }
      if (!language) {
        language = '*'
      }
      return {
        language,
        country,
        order,
      }
    })
    .filter((lang) => supportLanguages.includes(lang.language))
    .sort((a, b) => b.order - a.order)

  let targetLocale = defaultLanguage
  if (languages.length > 1) {
    let maxOrder = languages[0].order
    const filteredLanguages = languages
      .filter((lang) => lang.order === maxOrder)
      .map((lang) => lang.language)

    for (let i = 0; i < supportLanguages.length; i++) {
      const lang = supportLanguages[i]
      if (filteredLanguages.includes(lang)) {
        targetLocale = lang
        break
      }
    }
  } else if (languages.length === 1) {
    targetLocale = languages[0].language
  }

  return targetLocale
}
