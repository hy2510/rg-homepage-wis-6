'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useLoadedAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useLoadedStudentDailyLearning } from '@/client/store/student/daily-learning/selector'
import { useStudentInfoFlagLogin } from '@/client/store/student/info/selector'
import { useScreenMode } from '@/ui/context/StyleContext'
import BookSearchBar from '@/ui/modules/library-book-search-bar/BookSearchBar'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const router = useRouter()
  const isPC = useScreenMode() === 'pc'

  const isDailyLearningLoading = !useLoadedStudentDailyLearning()
  const isAchieveLevelLoading = !useLoadedAchieveLevelBooks()
  const [logoff, setLogoff] = useState<string>('')

  const loginStatus = useStudentInfoFlagLogin()

  useEffect(() => {
    if (logoff === 'go') {
      router.replace('/')
      setLogoff('redirect')
    }
  }, [logoff, router])

  if (loginStatus === 'off' && !logoff) {
    setLogoff('go')
    return <></>
  }

  if (isDailyLearningLoading || isAchieveLevelLoading) {
    return <></>
  }

  return (
    <div className="container compact">
      {isPC && <BookSearchBar />}
      {children}
    </div>
  )
}
