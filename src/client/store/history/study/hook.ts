import { useEffect } from 'react'
import repository from '@/repository/client'
import { fetcher } from '../../fetcher-action'
import { useFetchBasicState } from '../../hooks'
import { useHistoryStudy, useHistoryStudyAction } from './selector'

export function useOnLoadStudyReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState(true)
  const action = useHistoryStudyAction()

  useEffect(() => {
    async function fetching() {
      setLoading(true)

      const range = 30
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - range + 1)
      const endDate = new Date()

      const startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      const endDateOption = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }
      const option = {
        range,
        startDate: toStringDate(startDateOption),
        endDate: toStringDate(endDateOption),
        status: 'All',
        page: 1,
      }
      const res = await fetcher.response(repository.getStudyReport(option))

      if (res.isSuccess) {
        action.setStudyHistoryCustom(
          {
            startDate: startDateOption,
            endDate: endDateOption,
            status: option.status,
            page: option.page,
          },
          res.payload,
        )
        action.setStudyHistoryRange(
          {
            range,
            status: option.status,
            page: option.page,
          },
          res.payload,
        )
      } else {
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
    // Deps를 입력하는 경우, 다른 Store 값 변경에 반응하게 되므로 입력하지 않음
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    loading,
    error,
  }
}

export function useFetchStudyReportRange() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistoryStudyAction()
  const { option } = useHistoryStudy().range

  const fetch = ({
    range,
    status,
    page = 1,
  }: {
    range?: 1 | 7 | 14 | 30
    status?: string
    page?: number
  }) => {
    async function fetching() {
      setLoading(true)

      let pRange: 0 | 1 | 7 | 14 | 30 = 0
      let startDateOption: DateObject
      let endDateOption: DateObject
      let pStatus = 'All'

      if (page === 1) {
        if (!range) {
          // TODO Error
          return
        }
        pRange = range
        pStatus = status || 'All'
      } else {
        pRange = option.range
        pStatus = option.status
      }

      const startDate = new Date()
      startDate.setDate(startDate.getDate() - pRange + 1)
      const endDate = new Date()

      startDateOption = {
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
      }
      endDateOption = {
        year: endDate.getFullYear(),
        month: endDate.getMonth() + 1,
        day: endDate.getDate(),
      }

      const newOption = {
        startDate: toStringDate(startDateOption),
        endDate: toStringDate(endDateOption),
        status: pStatus,
        page,
      }
      if (page <= 1) {
        action.clearStudyHistoryCustom()
      }
      const res = await fetcher.response(repository.getStudyReport(newOption))

      if (res.isSuccess) {
        action.setStudyHistoryRange(
          {
            range: pRange,
            status: newOption.status,
            page: newOption.page,
          },
          res.payload,
        )
      } else {
        action.setStudyHistoryRange(option)
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export function useFetchStudyReport() {
  const { loading, setLoading, error, setError } = useFetchBasicState()
  const action = useHistoryStudyAction()
  const { option } = useHistoryStudy().custom

  const fetch = ({
    startDate: inStartDate,
    endDate: inEndDate,
    keyword: inKeyword,
    status,
    page = 1,
  }: {
    startDate?: DateObject
    endDate?: DateObject
    keyword?: string
    status?: string
    page?: number
  }) => {
    async function fetching() {
      setLoading(true)

      let pStartDate: string | undefined = undefined
      let pEndDate: string | undefined = undefined
      let pKeyword: string | undefined = undefined
      let startDateOption: DateObject | undefined = undefined
      let endDateOption: DateObject | undefined = undefined
      let pStatus = 'All'

      if (page === 1) {
        const serachType: 'Date' | 'Keyword' = inKeyword ? 'Keyword' : 'Date'
        if (serachType === 'Date') {
          if (!inStartDate || !inEndDate) {
            //TODO Error parameter date
            return
          }
          startDateOption = inStartDate
          endDateOption = inEndDate
        } else {
          if (!inKeyword) {
            //TODO Error parameter keyword
            return
          }
          pKeyword = inKeyword
        }
        if (!status) {
          //TODO Error parameter status
          return
        }
        pStatus = status
      } else {
        startDateOption = option.startDate
        endDateOption = option.endDate
        pKeyword = option.keyword
        pStatus = option.status
      }

      if (startDateOption) {
        pStartDate = toStringDate(startDateOption)
      }
      if (endDateOption) {
        pEndDate = toStringDate(endDateOption)
      }

      const newOption = {
        startDate: pStartDate,
        endDate: pEndDate,
        keyword: pKeyword,
        status: pStatus,
        page,
      }

      if (page <= 1) {
        action.clearStudyHistoryCustom()
      }
      const res = await fetcher.response(repository.getStudyReport(newOption))

      if (res.isSuccess) {
        action.setStudyHistoryCustom(
          {
            startDate: startDateOption,
            endDate: endDateOption,
            status: newOption.status,
            keyword: inKeyword ? inKeyword : undefined,
            page,
          },
          res.payload,
        )
      } else {
        action.setStudyHistoryCustom(option)
        setError(res.error)
      }
      setLoading(false)
    }
    fetching()
  }

  return {
    fetch,
    loading,
    error,
  }
}

export type DateObject = {
  year: number
  month: number
  day: number
}

export function toDateObject(date: string): DateObject {
  if (date.length === 8) {
    const year = Number(date.substring(0, 4))
    const month = Number(date.substring(4, 6))
    const day = Number(date.substring(6, 8))
    return {
      year,
      month,
      day,
    }
  } else if (date.length === 10) {
    const year = Number(date.substring(0, 4))
    const month = Number(date.substring(5, 7))
    const day = Number(date.substring(8, 10))
    return {
      year,
      month,
      day,
    }
  } else {
    const nowDate = new Date()
    return {
      year: nowDate.getFullYear(),
      month: nowDate.getMonth() + 1,
      day: nowDate.getDate(),
    }
  }
}

export function toStringDate(dateObj: DateObject, isDash?: boolean): string {
  if (isDash) {
    return `${dateObj.year}-${dateObj.month < 10 ? '0' : ''}${dateObj.month}-${dateObj.day < 10 ? '0' : ''}${dateObj.day}`
  }
  return `${dateObj.year}${dateObj.month < 10 ? '0' : ''}${dateObj.month}${dateObj.day < 10 ? '0' : ''}${dateObj.day}`
}
