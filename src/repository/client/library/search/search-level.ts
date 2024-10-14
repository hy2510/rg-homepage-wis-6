import { ApiResponse } from '@/http/common/response'
import { executeWithAuth, makeRequest } from '../../utils'
import {
  SearchBookResponse,
  convertSearchBook,
  newSearchBook,
} from './search-book'

type Input = {
  bookType: string
  level: string
  page?: number
  sort?: string
  genre?: string
  status?: string
}

type Output = SearchBookResponse

async function action({
  bookType,
  level,
  page = 1,
  sort = '',
  genre = '',
  status = '',
}: Input): Promise<ApiResponse<Output>> {
  const request = makeRequest(
    `api/library/search/level?bookType=${bookType}&level=${level}&sort=${sort}&genre=${genre}&status=${status}&page=${page}`,
    {
      method: 'get',
    },
  )
  return await executeWithAuth(request, convertSearchBook)
}

export { action as getSearchLevelBook }
export type { Output as SearchLevelBookResponse }

function newInstance(): Output {
  return newSearchBook()
}
export { newInstance as newSearchLevel }
