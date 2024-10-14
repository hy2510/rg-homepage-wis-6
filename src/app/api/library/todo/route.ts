import {
  RouteResponse,
  executeRequestAction,
  getBodyParameters,
  getParameters,
} from '@/app/api/_util'
import { getAuthorizationWithCookie } from '@/authorization/server/nextjsCookieAuthorization'
import NumberUtils from '@/util/number-utils'
import { NextRequest, NextResponse } from 'next/server'
import Export from '@/repository/server/export'
import Library from '@/repository/server/library'

export async function GET(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(request, 'sortColumn')
  const sortColumn = parameter.getString('sortColumn')

  const [payload, status, error] = await executeRequestAction(
    Library.todos(token, { sortColumn }),
  )
  if (payload?.Todo && payload.Todo?.length) {
    const todos = payload.Todo.map((book: any) => {
      const bookPoint = NumberUtils.toDecimalPoint(book.BookPoint, {
        count: 2,
        method: 'ceil',
      })
      const earnPoint = NumberUtils.toDecimalPoint(book.RgPointSum, {
        count: 2,
        method: 'ceil',
      })
      const passCount = Number(book.RgPointCount)
      let GetableRgPoint = bookPoint

      if (
        (passCount <= 0 && book.OngoingFullEasyCode === '093006') ||
        (passCount === 1 && earnPoint - bookPoint === 0)
      ) {
        GetableRgPoint = NumberUtils.toRgDecimalPoint(bookPoint * 0.5)
      } else if (passCount >= 2) {
        GetableRgPoint = 0
      }
      return {
        ...book,
        GetableRgPoint,
      }
    })
    payload.Todo = todos
  }

  const [dwPayload, dwStatus, dwError] = await executeRequestAction(
    Export.todoExcel(token, {
      sortColumn,
    }),
  )
  if (dwStatus && dwStatus.status >= 200 && dwStatus.status < 300) {
    const downloadUrl = dwPayload.Url
    payload['ExcelDownload'] = downloadUrl
  }
  if (error) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function POST(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getBodyParameters(
    request,
    'levelRoundIds',
    'studentHistoryId',
  )
  const levelRoundIds = parameter.getString('levelRoundIds')
  const studentHistoryId = parameter.getString('studentHistoryId')

  const [payload, status, addError] = await executeRequestAction(
    Library.addTodos(token, {
      levelRoundIds,
      studentHistoryId,
    }),
  )
  if (status.status === 400) {
    const extra = JSON.parse(payload.message)
    let message = '도서를 Todo에 추가할 수 없습니다.'
    if (extra.code === 1005) {
      message = 'Todo에는 200권 까지 추가 가능합니다.'
    } else if (extra.code === 1001 || extra.code === 1006) {
      message = '해당 레벨의 도서를 추가할 수 없습니다.'
    }
    return NextResponse.json({ message }, status)
  }
  if (addError) {
    return RouteResponse.commonError()
  }
  return RouteResponse.response(payload, status)
}

export async function DELETE(request: NextRequest) {
  const token = getAuthorizationWithCookie().getActiveAccessToken()
  if (!token) {
    return RouteResponse.invalidAccessToken()
  }

  const parameter = await getParameters(
    request,
    'isAll',
    'studyIds',
    'sortColumn',
  )
  const isAll = parameter.getString('isAll', 'N') as 'Y' | 'N'
  const studyIds = parameter.getString('studyIds')

  if (isAll === 'Y') {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteAllTodos(token),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  } else {
    const [payload, status, error] = await executeRequestAction(
      Library.deleteTodos(token, { studyIds }),
    )
    if (error) {
      return RouteResponse.commonError()
    }
    return RouteResponse.response(payload, status)
  }
}
