import { RouteResponse, getParameters } from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import { NextRequest } from 'next/server'
import Export from '@/repository/server/export'
import Library from '@/repository/server/library'
import { searchBook } from '../../search-book'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const parameter = await getParameters(
    request,
    'bookType',
    'level',
    'searchText',
    'status',
    'genre',
    'sort',
    'page',
  )
  const level = parameter.getString('level', '').toUpperCase()
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const pStatus = parameter.getString('status', 'All')
  const genre = parameter.getString('genre', 'All')
  const sort = parameter.getString('sort')
  const page = parameter.getNumber('page', 1)

  return searchBook({
    searchRequest: Library.searchSeries(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level: level || undefined,
      searchText,
      page: page,
      genre,
      sort,
      status: pStatus,
    }),
    downloadRequest: Export.searchExcel(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level: level || undefined,
      searchType: 'SeriesName',
      searchText,
      genre,
      sort,
      status: pStatus,
    }),
    filterUpdateRequest: Library.changeFilter(token, {
      type: bookType,
      genre,
      sort,
      status: pStatus,
    }),
  })
}

/*
export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }
  const parameter = await getParameters(
    request,
    'bookType',
    'level',
    'searchText',
    'status',
    'genre',
    'sort',
    'page',
  )
  const level = parameter.getString('level').toUpperCase()
  const bookType = parameter.getString('bookType').toUpperCase()
  const searchText = parameter.getString('searchText', '')
  const pStatus = parameter.getString('status', 'All')
  const genre = parameter.getString('genre', 'All')
  const sort = parameter.getString('sort')
  const page = parameter.getNumber('page', 1)

  const [payload, status, error] = await executeRequestAction(
    Library.searchSeries(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level,
      searchText,
      page: page,
      genre,
      sort,
      status: pStatus,
    }),
  )
  if (error) {
    return RouteResponse.commonError()
  }
  if (!status || status.status < 200 || status.status > 401) {
    return RouteResponse.commonError()
  }
  payload.Books = payload.Books.map((book: any) => {
    const GetableRgPoint = book.BookPoint
    return {
      ...book,
      GetableRgPoint,
    }
  })
  const [dwPayload, dwStatus, dwError] = await executeRequestAction(
    Export.searchExcel(token, {
      studyTypeCode: bookType === 'EB' ? '001006' : '001001',
      level,
      searchType: 'SeriesName',
      searchText,
      genre,
      sort,
      status: pStatus,
    }),
  )
  if (dwStatus && dwStatus.status >= 200 && dwStatus.status < 300) {
    const downloadUrl = dwPayload.Url
    payload['ExcelDownload'] = downloadUrl
  }

  await executeRequestAction(
    Library.changeFilter(token, {
      type: bookType,
      genre,
      sort,
      status: pStatus,
    }),
  )

  return RouteResponse.response(payload, status)
}
*/
