'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { useState } from 'react'
import { useAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useFetchLibraryLevelPreK } from '@/client/store/library/pre-k/hook'
import PreKLayout from './PreKLayout'

const StudyKeys = [
  'PK(AlphabetLand)',
  'PK(PhonicsLand)',
  'PK(WordLand)',
  'PK(StoryLand)',
]
const StudyActivity = ['Alphabet', 'Phonics', 'Word', 'Story']
export type StudyProgressInfo = {
  activityName: string
  books: number
  completedBooks: number
  totalBooks: number
}

export default function PreKContainer() {
  const { PreK } = useSiteBlueprint().studyOpen
  const [startActivity, setStartActivity] = useState('')

  const levelBooks = useAchieveLevelBooks().payload.PreK

  const { loading: fetchLoading, fetch: updateBook } =
    useFetchLibraryLevelPreK()

  const studyProgress: StudyProgressInfo[] = []
  for (let j = 0; j < StudyKeys.length; j++) {
    const key = StudyKeys[j]
    for (let i = 0; i < levelBooks.length; i++) {
      if (levelBooks[i].levelName === key) {
        studyProgress.push({
          activityName: StudyActivity[j],
          ...levelBooks[i],
        })
        break
      }
    }
  }
  let currentActivity: string = ''
  for (let i = 0; i < studyProgress.length; i++) {
    const prog = studyProgress[i]
    currentActivity = prog.activityName
    if (prog.totalBooks > prog.completedBooks) {
      break
    }
  }
  if (currentActivity && startActivity !== currentActivity) {
    updateBook({ activity: currentActivity })
    setStartActivity(currentActivity)
  }

  if (!PreK) {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }
  return (
    <PreKLayout
      loading={fetchLoading}
      progress={studyProgress}
      startActivity={startActivity}
    />
  )
}
