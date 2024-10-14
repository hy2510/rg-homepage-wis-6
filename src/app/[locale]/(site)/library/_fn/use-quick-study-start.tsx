import { useDevicePlatformInfo } from '@/app/_context/DeviceContext'
import { goToStudy } from '@/app/_function/study-start'
import { useLanguagePackContext } from '@/localization/client/LanguagePackContext'
import useTranslation from '@/localization/client/useTranslations'
import { useState } from 'react'
import { useFetchBookInfoDetail } from '@/client/store/bookinfo/detail/hook'
import { useFetchLibraryAddTodo } from '@/client/store/library/todos/hook'
import {
  useLatestStudentHistoryId,
  useStudentHistory,
} from '@/client/store/student/history/selector'
import { useStaffInfoFlagLogin } from '@/client/store/student/info/selector'
import { useStudentReadingUnit } from '@/client/store/student/reading-unit/selector'

export default function useQuickStudyStart() {
  // @Language 'common'
  const { t } = useTranslation()
  const { language } = useLanguagePackContext()
  const device = useDevicePlatformInfo()
  const staffLoginStatus = useStaffInfoFlagLogin()

  const studentHistoryList = useStudentHistory().payload
  const studentHistoryId = useLatestStudentHistoryId()
  const [selectLevelRoundId, setSelectLevelRoundId] = useState<
    string | undefined
  >(undefined)
  const isStudyAddable =
    studentHistoryList.filter(
      (item) => item.isBookWizard && item.studentHistoryId === studentHistoryId,
    ).length > 0
  const { userReadingUnit } = useStudentReadingUnit()

  const { fetch: fetchBookInfo, loading: isBookInfoLoading } =
    useFetchBookInfoDetail()
  const { fetch: addTodo, loading: isAddTodoLoading } = useFetchLibraryAddTodo()

  const onStartStudy = (levelRoundId: string) => {
    if (!isStudyAddable) {
      alert(t('t742')) // 학습을 추가할 수 있는 권한이 없습니다.
      return
    }
    fetchBookInfo({
      levelRoundId,
      studentHistoryId,
      callback: ({ success, error, payload }) => {
        if (success) {
          if (payload?.studyId) {
            goToStudy({
              studyInfo: payload!!,
              user: staffLoginStatus === 'on' ? 'staff' : 'student',
              unit: userReadingUnit.id,
              language,
              device,
            })
          } else {
            if (studentHistoryList.length === 1) {
              onStartActivity(levelRoundId, studentHistoryId)
            } else {
              setSelectLevelRoundId(levelRoundId)
            }
          }
        }
      },
    })
  }

  const onSelectStudentHistoryId = (studentHistoryId: string) => {
    if (selectLevelRoundId) {
      onStartActivity(selectLevelRoundId, studentHistoryId)
    }
  }

  const onStartActivity = (levelRoundId: string, studentHistoryId: string) => {
    const levelRoundIds = [levelRoundId]
    addTodo({
      levelRoundIds,
      studentHistoryId,
      callback: ({ success, error }) => {
        if (success && !error) {
          fetchBookInfo({
            levelRoundId,
            studentHistoryId,
            callback: ({ success, error, payload }) => {
              if (success && !error) {
                goToStudy({
                  studyInfo: payload!!,
                  user: staffLoginStatus === 'on' ? 'staff' : 'student',
                  unit: userReadingUnit.id,
                  language,
                  device,
                })
              }
            },
          })
        } else if (error) {
          if ((error as any).message) {
            alert((error as any).message)
          } else {
            alert(t('t341'))
          }
        }
      },
    })
  }

  return {
    studentHistoryId,
    studentHistoryList,
    selectLevelRoundId,
    setSelectLevelRoundId,
    startStudyIfAvail: onStartStudy,
    startStudyImmediate: onSelectStudentHistoryId,
  }
}
