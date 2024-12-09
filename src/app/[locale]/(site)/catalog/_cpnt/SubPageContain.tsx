'use client'

import { useStyle } from '@/ui/context/StyleContext'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const STYLE_ID = 'page_catalog'

interface SubPageDataItemLevel {
  name: string;
  imgSrc: string[];
}

interface SubPageDataItem {
  imgSrc: string;
  label?: string;
  title: string;
  level?: SubPageDataItemLevel[];
  exp?: string;
}

interface SubPageContainProps {
  subPageContainData: SubPageDataItem[];
}

export default function SubPageContain({subPageContainData}: SubPageContainProps) {
  const style = useStyle(STYLE_ID)

  const data = [...subPageContainData]

  return (
    <div className={`${style.sub_page_contain} ${style.compact}`}>
      {data.map((a, i) => {
        const [level, setLevel] = useState(0)
        const [imgIndex, setImgIndex] = useState(0)
        const [fade, setFade] = useState(true)
        const imageLength = a.level ? a.level[level].imgSrc.length : 0

        useEffect(() => {
          const timer = setInterval(() => {
            setFade(false);
            setTimeout(() => {
              setImgIndex((prevIndex) => (prevIndex + 1) % imageLength);
              setFade(true);
            }, 200);
          }, 3000);
          return () => clearInterval(timer);
        }, [imgIndex])

        return (
          <>
            <div className={style.row}>
              <div className={style.col_left}>
                <div className={style.thumbnail}>
                  {
                    a.level ? <Image src={a.level[level].imgSrc[imgIndex]} width={530} height={300} alt='' className={fade ? 'slide-in-right' : 'slide-out-left'} /> : <Image src={a.imgSrc} width={530} height={300} alt='' />
                  }
                  {a.level && <div className={style.bar}></div>}
                </div>
              </div>
              <div className={style.col_right}>
                <div>
                  {a.label && <div className={style.col_right_label}>{a.label}</div>}
                  <div className={style.col_right_title}>{a.title}</div>
                </div>
                {a.level ? 
                  <div className={style.col_right_levels}>
                    {a.level?.map((b, i) => {
                      return (
                        <span className={`${style.level_item} ${level === i && style.active}`} onClick={() => {setLevel(i)}}>{b.name}</span>
                      )
                    })}
                  </div>
                  : <></>
                }
                <div className={style.col_right_exp}>{a.exp}</div>
              </div>
            </div>
            <div className={style.line}></div>
          </>
        )
      })}
    </div>
  )
}