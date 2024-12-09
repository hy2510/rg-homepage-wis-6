'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import React, { useState } from 'react'

const STYLE_ID = 'page_catalog'

interface SubPageDataItem {
  title: string;
  step?: SubPageDataItemLevel[];
}

interface SubPageDataItemLevel {
  name: string;
  imgSrc: string;
  exp1: string;
  exp2: string;
}

interface SubPageContainProps {
  subPageContainData: SubPageDataItem[];
}

export default function SubPageContainPbookQuiz({subPageContainData}: SubPageContainProps) {
  const style = useStyle(STYLE_ID)

  const data = [...subPageContainData]

  return (
    <div className={`${style.sub_page_contain} ${style.compact}`}>
      {data.map((a, i) => {
        const [step, setStep] = useState(0)

        return (
          <>
            <div className={style.pbook_quiz_row}>
              <div className={style.title}>{a.title}</div>
              <div className={style.tabs}>
                {a.step?.map((b, i) => {
                  return (
                    <div className={`${style.btn_tab} ${step === i && style.active }`} onClick={() => {setStep(i)}}>{b.name}</div>
                  )
                })}
              </div>
              <div className={style.imgage_contain}>
                {a.step?.map((b, i) => {
                  return (
                    <>
                      {step === i && <Image src={b.imgSrc} width={598} height={450} alt='' />}
                    </>
                  )
                })}
              </div>
              <div>
                {a.step?.map((b, i) => {
                  return (
                    <>
                      {step === i && <>
                        <div className={style.exp1}>{b.exp1}</div>
                        <div className={style.exp2}>{b.exp2}</div>
                      </>}
                    </>
                  )
                })}
              </div>
            </div>
            <div className={style.line}></div>
          </>
        )
      })}
    </div>
  )
}