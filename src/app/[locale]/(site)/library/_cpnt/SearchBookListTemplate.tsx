'use client'

import useTranslation from '@/localization/client/useTranslations'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { SearchBookResponse } from '@/repository/client/library/search/search-book'
import PaginationBar from '@/ui/common/PaginationBar'
import { BackLink } from '@/ui/common/common-components'
import { BookCover } from '@/ui/modules/library-book-cover/book-cover'
import LevelSelector from '@/ui/modules/library-explore-level-selector/level-selector'
import { BookList } from '@/ui/modules/library-find-book-list/book-list'
import StudyLevelBox from '@/ui/modules/library-find-study-level-selector/StudyLevelBox'
import StudyLevelTitle from '@/ui/modules/library-find-study-level-selector/StudyLevelTitle'
import { LibraryFindTop } from '@/ui/modules/library-find-top/library-find-top'
import LibrarySearchFilter, {
  LibraryFilterOption,
} from '@/ui/modules/library-set-fliter/LibrarySearchFilter'
import useExport, { useSupportExportActionSearch } from '../_fn/use-export'
import StudentHistorySelectModal from './StudentHistorySelectModal'

export function SearchLevelBookListTemplate({
  mainClassName,
  backLink,
  title,
  bookType,
  level,
  levelList,
  filter,
  books,
  onSearchOptionChanged,
}: {
  mainClassName: string
  backLink: string
  title: string
  bookType: 'EB' | 'PB'
  level: string
  levelList: {
    totalBooks: number
    completedBooks: number
    levelName: string
  }[]
  filter: {
    sort: string
    status: string
    genre: string
  }
  books: SearchBookResponse
  onSearchOptionChanged?: (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const updateBook = (
    isSelectModeClose: boolean,
    params: {
      level?: string
      page?: number
      sort?: string
      genre?: string
      status?: string
    },
  ) => {
    if (isSelectModeClose) {
      setSelectMode(false)
    }
    onSearchOptionChanged && onSearchOptionChanged(params)
  }

  const [isShowLevelSelector, setShowLevelSelector] = useState(false)

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: filter.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: filter.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: filter.status === 'Complete',
        },
      ],
    },
    // {
    //   group: 'd2',
    //   title: t('t528'),
    //   option: [
    //     { id: '11', label: t('t529'), enabled: false },
    //     { id: '21', label: t('t530'), enabled: false },
    //     { id: '31', label: t('t531'), enabled: false },
    //   ],
    // },
    {
      group: 'sort',
      title: t('t348'),
      option: [
        { id: 'Round', label: t('t356'), enabled: filter.sort === 'Round' },
        {
          id: 'Preference',
          label: t('t349'),
          enabled: filter.sort === 'Preference',
        },
        {
          id: 'ReadCount',
          label: t('t350'),
          enabled: filter.sort === 'ReadCount',
        },
        {
          id: 'RegistDate',
          label: t('t351'),
          enabled: filter.sort === 'RegistDate',
        },
        {
          id: 'RgPoint',
          label: t('t352'),
          enabled: filter.sort === 'RgPoint',
        },
      ],
    },
    {
      group: 'genre',
      title: t('t353'),
      option: [
        { id: 'All', label: t('t354'), enabled: filter.genre === 'All' },
        {
          id: 'Fiction',
          label: 'Fiction',
          enabled: filter.genre === 'Fiction',
        },
        {
          id: 'Nonfiction',
          label: 'Non-Fiction',
          enabled: filter.genre === 'Nonfiction',
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
    let sort: string | undefined = undefined
    let genre: string | undefined = undefined
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      } else if (group.group === 'genre') {
        genre = findOptionId(group)
      } else if (group.group === 'sort') {
        sort = findOptionId(group)
      }
    })
    updateBook(true, { page: 1, sort, genre, status })
  }

  const onChangeLevel = (level: string) => {
    updateBook(true, { level })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    updateBook(false, { page: page })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    targetStudentHistoryList,
    targetStudentHistoryId,
    onSelectStudentHistory,
    onExportCancel,
  } = useExport()

  const supportExportAction = useSupportExportActionSearch()

  const downloadExcelUrl = totalCount > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      window.open(downloadExcelUrl)
    }
  }

  return (
    <main className={mainClassName}>
      <BackLink href={backLink} largeFont>
        {title}
      </BackLink>
      <StudyLevelBox>
        <StudyLevelTitle
          level={level}
          onClick={() => {
            setShowLevelSelector(true)
          }}
        />
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
        {isShowLevelSelector && (
          <LevelSelector
            _viewLevelSelector={setShowLevelSelector}
            bookType={bookType}
            level={level}
            ebLevelList={levelList}
            pbLevelList={levelList}
            onLevelClick={({ level }) => {
              onChangeLevel(level)
              setShowLevelSelector(false)
            }}
          />
        )}
      </StudyLevelBox>
      <BookList
        count={totalCount}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}
        onDownloadClick={
          downloadExcelUrl ? onBookListExcelDownload : undefined
        }>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName

          const isExportChecked = isSelectedItem(book.levelRoundId)

          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              isExportMode={isSelectMode}
              isExportChecked={isExportChecked}
              onExportCheckedChange={setItemSelectedChange}
              grade={book.recommendedAge}
            />
          )
        })}
      </BookList>
      <PaginationBar
        page={currentPage}
        maxPage={maxPage}
        onPageClick={onPageClick}
      />
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={targetStudentHistoryList}
          defaultStudentHistoryId={targetStudentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
    </main>
  )
}

export function SearchThemeSeriesBookListTemplate({
  mainClassName,
  headerClassName,
  backLink,
  title,
  subject,
  bookType,
  filter,
  books,
  onSearchOptionChanged,
}: {
  mainClassName: string
  headerClassName: string
  backLink: string
  title: string
  subject: string
  bookType: 'EB' | 'PB'
  filter: {
    sort: string
    status: string
    genre: string
  }
  books: SearchBookResponse
  onSearchOptionChanged?: (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => void
}) {
  // @Language 'common'
  const { t } = useTranslation()

  const router = useRouter()

  const updateBook = (
    isSelectModeClose: boolean,
    params: {
      level?: string
      page?: number
      sort?: string
      genre?: string
      status?: string
    },
  ) => {
    if (isSelectModeClose) {
      setSelectMode(false)
    }
    onSearchOptionChanged && onSearchOptionChanged(params)
  }

  const [isShowLevelSelector, setShowLevelSelector] = useState(false)

  const bookFilter = [
    {
      group: 'status',
      title: t('t344'),
      option: [
        { id: 'All', label: t('t345'), enabled: filter.status === 'All' },
        {
          id: 'Before',
          label: t('t346'),
          enabled: filter.status === 'Before',
        },
        {
          id: 'Complete',
          label: t('t347'),
          enabled: filter.status === 'Complete',
        },
      ],
    },
    // {
    //   group: 'd2',
    //   title: t('t528'),
    //   option: [
    //     { id: '11', label: t('t529'), enabled: false },
    //     { id: '21', label: t('t530'), enabled: false },
    //     { id: '31', label: t('t531'), enabled: false },
    //   ],
    // },
    {
      group: 'sort',
      title: t('t348'),
      option: [
        { id: 'Round', label: t('t356'), enabled: filter.sort === 'Round' },
        {
          id: 'Preference',
          label: t('t349'),
          enabled: filter.sort === 'Preference',
        },
        {
          id: 'ReadCount',
          label: t('t350'),
          enabled: filter.sort === 'ReadCount',
        },
        {
          id: 'RegistDate',
          label: t('t351'),
          enabled: filter.sort === 'RegistDate',
        },
        {
          id: 'RgPoint',
          label: t('t352'),
          enabled: filter.sort === 'RgPoint',
        },
      ],
    },
    {
      group: 'genre',
      title: t('t353'),
      option: [
        { id: 'All', label: t('t354'), enabled: filter.genre === 'All' },
        {
          id: 'Fiction',
          label: 'Fiction',
          enabled: filter.genre === 'Fiction',
        },
        {
          id: 'Nonfiction',
          label: 'Non-Fiction',
          enabled: filter.genre === 'Nonfiction',
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
    let sort: string | undefined = undefined
    let genre: string | undefined = undefined
    let status: string | undefined = undefined
    filterOption.forEach((group) => {
      if (group.group === 'status') {
        status = findOptionId(group)
      } else if (group.group === 'genre') {
        genre = findOptionId(group)
      } else if (group.group === 'sort') {
        sort = findOptionId(group)
      }
    })
    updateBook(true, { page: 1, sort, genre, status })
  }

  const onChangeLevel = (level: string) => {
    updateBook(true, { level })
  }

  const currentPage = books.page.page
  const maxPage = books.page.totalPages
  const totalCount = books.page.totalRecords
  const onPageClick = (page: number) => {
    updateBook(false, { page: page })
  }

  const [bookInfo, setBookInfo] = useState<string | undefined>(undefined)

  const {
    isSelectMode,
    setSelectMode,
    selectedItemCount,
    isSelectedItem,
    setItemSelectedChange,
    onExportAction,
    isSelectStudentHistory,
    targetStudentHistoryList,
    targetStudentHistoryId,
    onSelectStudentHistory,
    onExportCancel,
  } = useExport()

  const supportExportAction = useSupportExportActionSearch()

  const downloadExcelUrl = totalCount > 0 ? books.download : undefined
  const onBookListExcelDownload = () => {
    if (downloadExcelUrl) {
      window.open(downloadExcelUrl)
    }
  }
  const isAvailableBackLink = !!backLink
  console.log(isAvailableBackLink)

  return (
    <main className={mainClassName}>
      <div className={headerClassName}>
        <BackLink
          href={isAvailableBackLink ? backLink : ''}
          onClick={
            isAvailableBackLink
              ? undefined
              : () => {
                  router.back()
                }
          }
          largeFont>
          {title}
        </BackLink>
        <LibrarySearchFilter
          optionList={bookFilter}
          onOptionChange={onFilterChanged}
        />
      </div>
      <LibraryFindTop title={subject} />
      <BookList
        count={totalCount}
        isExportMode={isSelectMode}
        toggleExportMode={() => {
          setSelectMode(!isSelectMode)
        }}
        supportExportAction={supportExportAction}
        exportCount={selectedItemCount}
        onExportClick={onExportAction}
        onDownloadClick={
          downloadExcelUrl ? onBookListExcelDownload : undefined
        }>
        {books.book.map((book, i) => {
          const earnPoint = book.getableRgPoint
          const bookCode = book.levelName

          const isExportChecked = isSelectedItem(book.levelRoundId)

          return (
            <BookCover
              key={`book-cover-${i}-${book.surfaceImagePath}`}
              id={book.levelRoundId}
              target={`library`}
              bookImgSrc={book.surfaceImagePath}
              bookCode={bookCode}
              earnPoint={earnPoint}
              title={book.topicTitle}
              author={book.author}
              isBookInfo={bookInfo === book.levelRoundId}
              passedCount={book.rgPointCount}
              isMovieBook={!!book.animationPath}
              isAssignedTodo={!book.addYn}
              onClickBookDetail={() => {
                setBookInfo(bookInfo ? undefined : book.levelRoundId)
              }}
              levelRoundId={book.levelRoundId}
              isExportMode={isSelectMode}
              isExportChecked={isExportChecked}
              onExportCheckedChange={setItemSelectedChange}
              grade={book.recommendedAge}
            />
          )
        })}
      </BookList>
      <PaginationBar
        page={currentPage}
        maxPage={maxPage}
        onPageClick={onPageClick}
      />
      {isSelectStudentHistory && (
        <StudentHistorySelectModal
          studentHistoryList={targetStudentHistoryList}
          defaultStudentHistoryId={targetStudentHistoryId}
          onCloseModal={onExportCancel}
          onSelectStudentHistoryId={onSelectStudentHistory}
        />
      )}
    </main>
  )
}
