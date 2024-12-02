'use client'

import useTranslation from '@/localization/client/useTranslations'
import Link from 'next/link'
import { useState } from 'react'
import { useFetchSearchCustomer } from '@/client/store/customer/search/hook'
import { SearchCustomerResponse } from '@/repository/client/customer/search-customer'
import { Button, TextField } from '@/ui/common/common-components'
import { useStyle } from '@/ui/context/StyleContext'

const STYLE_ID = 'page_group_move_class'

export default function Page() {
  const style = useStyle(STYLE_ID)

  // @language 'common'
  const { t } = useTranslation()

  return (
    <main className={style.group_move_class}>
      
      <div className={style.catchphrase}>
        <div className={style.brand_name}>{t('t206')}</div>
        <div className={style.sentence}>{t('t207')}</div>
      </div>

      <div className={style.group_move_class_box}>
        <div className={style.txt_title}>⚠️ 진급한 반으로 변경해 주세요!</div>
        <div className={style.guide}>
          <div className={style.txt_guide_title}>변경 방법</div>
          <ol>
            <li>작년에 소속된 학년과 반이 맞는지 확인합니다.</li>
            <li>이번 해에 진급한 새로운 반을 선택한 후, 변경하기를 누르세요.</li>
            <li>변경할 반이 없거나, 진급 반 변경 후 수정이 필요하면 고객센터(1599-0533)로 연락 주세요.</li>
            {/* <li>진급반 설정 이후 반을 변경해야하는 경우 고객센터(1599-0533)로 연락 주세요.</li> */}
          </ol>
        </div>
        <div className={style.class_info}>
          <div className={style.before_class_info}>
            <div className={style.title}>2024년도</div>
            <div className={style.student_info}>
              <div>학년/반</div>
              <div>5-1</div>
              <div>이름</div>
              <div>김희선</div>
            </div>
          </div>
          <div className={style.after_class_info}>
            <div className={style.title}>2025년도</div>
            <div className={style.student_info}>
              <div>학년</div>
              <div>6학년</div>
              <div>진급 반</div>
              <div>
                <select>
                  <option>미편성반</option>
                  <option>6-1</option>
                  <option>6-2</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {/* 변경이 안된 경우 -> '진급 반을 변경해 주세요.' 변경한 경우 -> ***반으로 변경하시겠습니까? */}
        <Button color={'red'} shadow>변경하기</Button>
        {/* 변경할 기간이 지난경우 안보이게 하기 */}
        <div className={style.link_cancel}>
          <Link href="">나중에 하기</Link>
        </div>
      </div>

      <div className={style.link}>
        <Link href="/account/account-list">{t('t256')}</Link>
      </div>

    </main>
  )
}
