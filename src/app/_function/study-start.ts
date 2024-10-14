import SITE_PATH from '../site-path'

type StudyStartInfo = {
  studyId: string
  studentHistoryId: string
  bookCode: string
  levelRoundId: string
  bookLevel: string
}
type StudyRef = {
  StudyId: string
  StudentHistoryId: string
  LevelName: string
  LevelRoundId: string
  User: string
  Mode: 'quiz' | 'review' | 'super'
  BookType: 'EB' | 'PB' | 'PK' | 'DODO'
  level: string
  isStartSpeak?: boolean
  referer?: string
  logoutUrl?: string
  unit?: string
  language?: string
  device?: string
}
export function goToStudy({
  studyInfo,
  user = 'student',
  mode = 'quiz',
  isStartSpeak = false,
  unit,
  language = 'ko',
  device,
}: {
  studyInfo: StudyStartInfo
  user?: 'student' | 'staff'
  mode?: 'quiz' | 'review'
  isStartSpeak?: boolean
  unit?: string
  language?: string
  device?: string
}) {
  const LevelName = studyInfo.bookCode
  let bookTypeTmp = undefined
  const isPK = LevelName.startsWith('EB-PK')
  const bookRound = Number(LevelName.substring(6))
  if (isPK) {
    if (bookRound < 300) {
      bookTypeTmp = 'PK'
    } else {
      bookTypeTmp = 'DODO'
    }
  } else if (LevelName.startsWith('EB')) {
    bookTypeTmp = 'EB'
  } else if (LevelName.startsWith('PB')) {
    bookTypeTmp = 'PB'
  }
  if (!bookTypeTmp) {
    throw Error('BookType Mismatch')
  }

  const BookType = bookTypeTmp as 'EB' | 'PB' | 'PK' | 'DODO'
  let quizReferer = SITE_PATH.LIBRARY.HOME
  if (BookType === 'PK') {
    quizReferer = SITE_PATH.BASIC.PRE_K
  } else if (BookType === 'DODO') {
    quizReferer = SITE_PATH.BASIC.DODO_ABC
  }
  const referer = mode === 'quiz' ? quizReferer : SITE_PATH.REVIEW.SIMPLE

  const ref: StudyRef = {
    StudyId: studyInfo.studyId,
    StudentHistoryId: studyInfo.studentHistoryId,
    LevelName,
    LevelRoundId: studyInfo.levelRoundId,
    BookType,
    User: user,
    Mode: mode,
    level: studyInfo.bookLevel,
    isStartSpeak: isStartSpeak,
    referer: referer,
    logoutUrl: '/signoff',
    unit,
    language,
    device,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}

export function goToLevelTest({
  user = 'student',
  language = 'ko',
}: {
  user?: 'student' | 'staff'
  language?: string
}) {
  const ref = {
    BookType: 'LEVELTEST',
    User: user,
    Mode: 'quiz',
    referer: SITE_PATH.HOME.MAIN,
    language,
  }
  const signedRef = encodeURIComponent(btoa(JSON.stringify(ref)))
  if (window && window.location) {
    window.location.href = '/study/start.html?REF=' + signedRef
  }
}
