'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import React, { useState } from 'react'
import SubPageNavBar from '../_cpnt/SubPageNavBar'
import { Margin } from '@/ui/common/common-components'
import SubPageMainBanner from '../_cpnt/SubPageMainBanner'
import SubPageContain from '../_cpnt/SubPageContain'
import SubPageHeader from '../_cpnt/SubPageHeader'
import Student from '@/repository/server/student'

const STYLE_ID = 'page_catalog'

export default function Page() {
  const style = useStyle(STYLE_ID)

  const subPageContainData = [
    {
      imgSrc: '/src/images/@about/@dodo-abc/row1_alphabet.gif',
      title: '알파벳',
      exp: '도도와 다락방의 친구들 애니메이션을 보며, 알파벳 26개 대소문자를 구분하고 음가와 단어를 배웁니다. 재미있는 에피소드 영상과 함께 게임 형식을 단계별 액티비티를 통한 알파벳을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row2_phonics.gif',
      title: '파닉스',
      exp: '도도와 별의별 잡화점, 숲 속 친구들 애니메이션을 통해 50개의 음가를 배웁니다. 게임 형식의 단계별 액티비티를 통해 파닉스를 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row3_sight_words.gif',
      title: '사이트 워드',
      exp: '도도와 친구들 애니메이션을 보며, 사이트워드와 패턴 문장을 배웁니다. 재미있는 에피소드 영상과 함께 사이트워드를 이용한 초등 교과 과정의 패턴 문장을 학습해 보세요.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row4_song_n_chant.gif',
      title: '송 & 챈트',
      exp: '도도와 친구들이 부르는 신나는 노래도 듣고, 직접 녹음도 해보는 흥미 유발 콘텐츠입니다.',
    },
    {
      imgSrc: '/src/images/@about/@dodo-abc/row5_game.gif',
      title: '게임',
      exp: '재미있는 게임도 하고, 단어도 외우는 일석이조의 효과를 경험할 수 있습니다.',
    },
  ]

  return (
    <div className={style.catalog}>
      <div className={style.global_header_bg} style={{zIndex: 1}}></div>
      <div className={style.sub_page_bg}>
        <div className={`${style.sub_page}`}>
          <SubPageNavBar />
          <SubPageHeader titleCol1='AI SPEAK 프로그램' exp={`원어민 음성을 듣고 따라 말하면 AI 음소 단위 발음 분석이 제공되어 더 효과적인 말하기 연습이 가능합니다.`} />
          <div>
            <SubPageMainBanner imgSrc='/src/images/@about/@ai-speak/ai_speak_main_banner.png' />
            <div className={`${style.sub_page_contain} ${style.compact}`}>
              <div className={style.ai_speak_row1}>
                <div className={style.title}>Sight Words 단어와 문장 읽기</div>
                <div className={style.exp}>기초 영어 학습 단계부터 단어와 문장을 통해 말하기 연습을 할 수 있습니다.</div>
                <div className={style.images}>
                  <Image src={'/src/images/@about/@ai-speak/images02/001.png'} width={300} height={200} alt='' />
                  <Image src={'/src/images/@about/@ai-speak/images02/002.png'} width={300} height={200} alt='' />
                </div>
              </div>
              <div className={style.ai_speak_row1}>
                <div className={style.title}>eBook KC~1C 레벨 문장 읽기</div>
                <div className={style.exp}>문장 발음 결과를 억양 그래프와 음소 단위 합치율로 간편하게 확인할 수 있습니다.</div>
                <div className={style.images}>
                  <Image src={'/src/images/@about/@ai-speak/images01/001.png'} width={300} height={200} alt='' />
                  <Image src={'/src/images/@about/@ai-speak/images01/002.png'} width={300} height={200} alt='' />
                </div>
              </div>
              <div className={style.ai_speak_row2}>
                <div className={style.box}>
                  <div className={style.title}>Song & Chant</div>
                  <div className={style.exp}>기초 영어의 Song & Chant에서 신나는 영어 동요를 듣고 따라 부르며 녹음할 수 있습니다.</div>
                  <div className={style.image}>
                    <Image src={'/src/images/@about/@ai-speak/images03/002.png'} width={300} height={200} alt='' />
                  </div>
                </div>
                <div className={style.box}>
                  <div className={style.title}>독후 단어 학습</div>
                  <div className={style.exp}>모든 레벨의 단어 학습에서도 음소 단위 발음 연습이 가능합니다.</div>
                  <div className={style.image}>
                    <Image src={'/src/images/@about/@ai-speak/images03/001.png'} width={300} height={200} alt='' />
                  </div>
                </div>
              </div>
              
              
            </div>
          </div>
        </div>
        <Margin height={50} />
      </div>
    </div>
  )
}