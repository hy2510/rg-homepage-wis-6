function createDate(date: string): Date {
  let year: number = 1970
  let month: number = 0
  let dayOfMonth: number = 1

  if (date.indexOf('-') > 0 && date.length >= 10) {
    year = Number(date.substring(0, 4))
    month = Number(date.substring(5, 7)) - 1
    dayOfMonth = Number(date.substring(8, 10))
  } else if (date.length === 8) {
    year = Number(date.substring(0, 4))
    month = Number(date.substring(4, 6)) - 1
    dayOfMonth = Number(date.substring(6, 8))
  }
  const dateObject = new Date(year, month, dayOfMonth, 0, 0, 0, 0)
  return dateObject
}

function createDateSetZeroTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
}

function toStringDate(
  date: Date,
  option?: {
    divide: '-' | '.' | '. ' | ''
    digitfix?: boolean
  },
) {
  const { divide, digitfix } = option || { divide: '-', digitfix: true }
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const convertDigitFix = (num: number) => {
    if (digitfix && num <= 9) {
      return `0${num}`
    } else {
      return `${num}`
    }
  }
  return `${year}${divide}${convertDigitFix(month)}${divide}${convertDigitFix(day)}`
}

function dayDistance(
  srcDate: Date,
  destDate: Date,
  isIncludeToday: boolean = false,
): number {
  const timeSrcDate = createDateSetZeroTime(srcDate)
  const timeDestDate = createDateSetZeroTime(destDate)

  const DAY_TIME = 24 * 60 * 60 * 1000
  const srcTotalDay =
    (timeSrcDate.getTime() - (timeSrcDate.getTime() % DAY_TIME)) / DAY_TIME
  const destTotalDay =
    (timeDestDate.getTime() - (timeDestDate.getTime() % DAY_TIME)) / DAY_TIME

  return destTotalDay - srcTotalDay + (isIncludeToday ? 1 : 0)
}

function rangeDayCheck(
  startDate: Date,
  endDate: Date,
  srcDate: Date,
): -2 | -1 | 0 | 1 | 2 {
  const DAY_TIME = 24 * 60 * 60 * 1000

  const timeStartDate = createDateSetZeroTime(startDate)
  const timeEndDate = createDateSetZeroTime(endDate)
  const timeSrcDate = createDateSetZeroTime(srcDate)

  const startTime =
    timeStartDate.getTime() - (timeStartDate.getTime() % DAY_TIME)
  const endTime = timeEndDate.getTime() - (timeEndDate.getTime() % DAY_TIME)
  const srcTime = timeSrcDate.getTime() - (timeSrcDate.getTime() % DAY_TIME)

  if (startTime > srcTime) {
    return -2
  } else if (startTime === srcTime) {
    return -1
  } else if (srcTime === endTime) {
    return 1
  } else if (srcTime > endTime) {
    return 2
  }
  return 0
}

const DateUtils = { createDate, toStringDate, dayDistance, rangeDayCheck }
export default DateUtils
