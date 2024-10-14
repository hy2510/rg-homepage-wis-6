import SITE_PATH from '@/app/site-path'
import React from 'react'
import RgNewsPostBoard from '@/ui/modules/home-rg-news-components/RgNewsPostBoard'

export default function Layout({ children }: { children?: React.ReactNode }) {
  const post = [
    {
      id: '202401',
      title: '2024년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202401`,
    },
    {
      id: '202302',
      title: '2023년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202302`,
    },
    {
      id: '202301',
      title: '2023년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202301`,
    },
    {
      id: '202202',
      title: '2022년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202202`,
    },
    {
      id: '202201',
      title: '2022년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202201`,
    },
    {
      id: '202102',
      title: '2021년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202102`,
    },
    {
      id: '202101',
      title: '2021년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202101`,
    },
    {
      id: '202002',
      title: '2020년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202002`,
    },
    {
      id: '202001',
      title: '2020년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/202001`,
    },
    {
      id: '201902',
      title: '2019년 하반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/201902`,
    },
    {
      id: '201901',
      title: '2019년 상반기 영어독서왕',
      url: `${SITE_PATH.HOME.EVENT_CHALLENGE}/201901`,
    },
  ]

  return <RgNewsPostBoard post={post}>{children}</RgNewsPostBoard>
}
