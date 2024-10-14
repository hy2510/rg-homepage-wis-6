'use client'

import SITE_PATH from '@/app/site-path'
import { useAchieveLevelBooks } from '@/client/store/achieve/level-books/selector'
import { useLibraryEbPbFilter } from '@/client/store/library/filter/selector'
import { useLibraryHome } from '@/client/store/library/home/selector'
import {
  useFetchLibraryMovie,
  useOnLoadLibraryMovie,
} from '@/client/store/library/movie/hook'
import { useLibraryMovie } from '@/client/store/library/movie/selector'
import { useSelectStudyLevel } from '@/client/store/student/daily-learning/selector'
import { useStyle } from '@/ui/context/StyleContext'
import LoadingScreen from '@/ui/modules/LoadingScreen'
import { SearchLevelBookListTemplate } from '../_cpnt/SearchBookListTemplate'

const STYLE_ID = 'page_movie_book'

export default function Page() {
  const home = useLibraryHome()
  const settingLevel = useSelectStudyLevel()

  let levelFinder = home.level || settingLevel

  const levelBooks = useAchieveLevelBooks().payload.Movie
  let level: string | undefined = undefined
  if (levelFinder) {
    levelBooks.forEach((lv) => {
      if (levelFinder === lv.levelName) {
        level = levelFinder
      }
    })
  }

  const { sort, status, genre } = useLibraryEbPbFilter('EB')

  const { loading } = useOnLoadLibraryMovie({
    level: level || 'KA',
    sort,
    genre,
    status,
  })
  if (loading) {
    return <LoadingScreen />
  }
  return <EBookLayout />
}

function EBookLayout() {
  const style = useStyle(STYLE_ID)

  const BookType = 'EB'

  const { fetch } = useFetchLibraryMovie()
  const { option, payload: books } = useLibraryMovie()

  const mainClassName = style.ebook
  const backLink = SITE_PATH.LIBRARY.HOME
  const title = 'Movie Book'
  const filter = useLibraryEbPbFilter(BookType)
  const levelBooks = useAchieveLevelBooks().payload.Movie
  const level = option.level

  const updateBook = (params: {
    level?: string
    page?: number
    sort?: string
    genre?: string
    status?: string
  }) => {
    fetch(params)
  }

  return (
    <SearchLevelBookListTemplate
      mainClassName={mainClassName}
      backLink={backLink}
      title={title}
      bookType={BookType}
      level={level}
      levelList={levelBooks}
      filter={filter}
      books={books}
      onSearchOptionChanged={updateBook}
    />
  )
}
