'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { useState } from 'react'
import { useAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useFetchLibraryLevelDodoAbc } from '@/client/store/library/dodo-abc/hook'
import DodoABCLayout from './DodoABCLayout'

const StudyKeys = [
  '(Alphabet)',
  '(Phonics 1)',
  '(Phonics 2)',
  '(Sight Words 1)',
  '(Sight Words 2)',
]
const StudyActivity = [
  'Study-Alphabet',
  'Study-Phonics-1',
  'Study-Phonics-2',
  'Study-Sight-Words-1',
  'Study-Sight-Words-2',
]

const SongKeys = [
  '(Song & Chant > Alphabet Chant)',
  '(Song & Chant > Phonics Chant)',
  '(Song & Chant > Nursery Rhyme)',
]
const SongActivity = [
  'Song-Alphabet-Chant',
  'Song-Phonics-Chant',
  'Song-Nursery-Rhyme',
]

const GameKeys = [
  '(Game > Alphabet)',
  '(Game > Phonics)',
  '(Game > Sight Words 1)',
  '(Game > Sight Words 2)',
]
const GameActivity = [
  'Game-Alphabet',
  'Game-Phonics',
  'Game-Sight-Words-1',
  'Game-Sight-Words-2',
]

export type DodoABCType = 'Study' | 'Song' | 'Game'
export type StudyProgressInfo = {
  activityName: string
  books: number
  completedBooks: number
  totalBooks: number
}

export default function DodoABCContainer() {
  const { DodoABC } = useSiteBlueprint().studyOpen

  const [type, setType] = useState<DodoABCType>('Study')
  const [startActivity, setStartActivity] = useState('')

  const levelBooks = useAchieveLevelBooks().payload.DodoABC
  let targetKeys: string[]
  let targetActivitys: string[]
  if (type === 'Game') {
    targetKeys = GameKeys
    targetActivitys = GameActivity
  } else if (type === 'Song') {
    targetKeys = SongKeys
    targetActivitys = SongActivity
  } else {
    targetKeys = StudyKeys
    targetActivitys = StudyActivity
  }
  const studyProgress: StudyProgressInfo[] = []
  for (let j = 0; j < targetKeys.length; j++) {
    const key = targetKeys[j]
    for (let i = 0; i < levelBooks.length; i++) {
      if (levelBooks[i].levelName.indexOf(key) > 0) {
        studyProgress.push({
          activityName: targetActivitys[j],
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
  const onChangeStudyType = (studyType: DodoABCType) => {
    if (type !== studyType) {
      setType(studyType)
    }
  }

  const { loading: fetchLoading, fetch: updateBook } =
    useFetchLibraryLevelDodoAbc()

  if (currentActivity && startActivity !== currentActivity) {
    updateBook({ activity: currentActivity })
    setStartActivity(currentActivity)
  }
  if (!DodoABC) {
    return (
      <div>
        <h1>Access Denied</h1>
      </div>
    )
  }
  return (
    <DodoABCLayout
      loading={fetchLoading}
      studyType={type}
      startActivity={startActivity}
      progress={studyProgress}
      onChangeStudyType={onChangeStudyType}
    />
  )
}
