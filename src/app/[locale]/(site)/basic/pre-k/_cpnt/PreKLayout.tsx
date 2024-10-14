'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useFetchLibraryLevelPreK } from '@/client/store/library/pre-k/hook'
import { useLibraryLevelPreK } from '@/client/store/library/pre-k/selector'
import { useStudentStudyable } from '@/client/store/student/info/selector'
import { useStyle } from '@/ui/context/StyleContext'
import { LibraryFilterOption } from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import StudentHistorySelectModal from '../../../library/_cpnt/StudentHistorySelectModal'
import useQuickStudyStart from '../../../library/_fn/use-quick-study-start'
import PreKCategory from './PreKCategory'
import { StudyProgressInfo } from './PreKContainer'
import PreKList from './PreKList'

const STYLE_ID = 'page_kids_prek'

export default function PreKLayout({
  loading,
  progress,
}: {
  loading: boolean
  startActivity: string
  progress: StudyProgressInfo[]
}) {
  const style = useStyle(STYLE_ID)

  // @Language 'common'
  const { t } = useTranslation()

  const { fetch: updateBook } = useFetchLibraryLevelPreK()
  const { option, payload: books } = useLibraryLevelPreK()

  let currentActivity: string = ''
  for (let i = 0; i < progress.length; i++) {
    if (option.activity === progress[i].activityName) {
      currentActivity = progress[i].activityName
      break
    }
  }

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: option.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: option.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: option.status === 'Complete',
        },
      ],
    },
  ]

  const onFilterChanged = (filterOption: LibraryFilterOption[]) => {
    const findOptionId = (group: LibraryFilterOption) => {
      let value: string | undefined = undefined
      const option = group.option.filter((opt) => opt.enabled)
      if (option.length > 0) {
        value = option[0].id
      }
      return value
    }
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      }
    })
    updateBook({ status })
  }

  const onChangeFilterActivity = (activity: string) => {
    updateBook({ activity })
  }

  const currentPage = 0
  const maxPage = 0
  const onPageClick = (page: number) => {
    updateBook({ page })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail,
    startStudyImmediate,
  } = useQuickStudyStart()

  const { isStudyEnd, studyEndMessage } = useStudentStudyable()

  const onCategoryItemClick = (activity: string) => {
    updateBook({ activity })
  }

  const onClickVocabulary = (vocabularyPath: string) => {
    if (!isStudyEnd) {
      window.open(vocabularyPath, '_blank', 'noopener, noreferrer')
    } else {
      alert(studyEndMessage)
    }
  }
  return (
    <>
      <div className={style.kids_prek}>
        <div className="container compact">
          <div className={style.logo}>
            <div className={style.img_logo}></div>
          </div>

          <PreKCategory
            active={currentActivity}
            progress={progress}
            onCategoryClick={onCategoryItemClick}
          />

          {!loading && (
            <PreKList
              onClickBook={(levelRoundId: string) => {
                if (!isStudyEnd) {
                  startStudyIfAvail(levelRoundId)
                } else {
                  alert(studyEndMessage)
                }
              }}
              onClickDownload={onClickVocabulary}
            />
          )}
        </div>
        {selectLevelRoundId && (
          <StudentHistorySelectModal
            studentHistoryList={studentHistoryList}
            defaultStudentHistoryId={studentHistoryId}
            onCloseModal={() => setSelectLevelRoundId(undefined)}
            onSelectStudentHistoryId={startStudyImmediate}
          />
        )}
      </div>
    </>
  )
}
