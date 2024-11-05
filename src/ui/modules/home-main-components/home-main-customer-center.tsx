import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'
import { useStyle } from '@/ui/context/StyleContext'
import { AdBannerType4 } from './home-main-ad-banners'

const STYLE_ID = 'home_main_quick_menu'

export const HomeMainQuickMenu = ({ children, label }: { children?: ReactNode, label: string }) => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://ossified-smell-f52.notion.site/RG-a8fc674ab32f458ca70d659e1916e34c' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>고객지원</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://ossified-smell-f52.notion.site/a4cce8ae154943808cc48a9e5b60327b' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>리딩게이트가 처음이신가요?</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/d7da80412132466e9fdf7667d34dd1de' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>학습가이드</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/983726afd0934c3a8157bf52331d06ec' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>사용환경</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/cf1d4f5a54654ded8a2ad92b9b7ce3c9' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>원격지원</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/4494d64673004eda9af91f9d613ec687' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>자료실</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/f72c92a304ff4548bd1454378bf23eb0' target='_blank'>
            <div className={`${style.menu_item} ${style.bg006}`}>
              <span>이벤트</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/FAQ-001c577a493e4f8f899ad94f8df17ed9' target='_balnk'>
            <div className={`${style.menu_item} ${style.bg007}`}>
              <span>FAQ</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeMainQuickMenuItem = ({
  title,
  bgColor,
  imgSrc = '',
  href,
  target,
}: {
  title: string
  bgColor?: string
  imgSrc?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <Link href={href ? href : ''}>
      <div className={style.home_main_quick_menu_item}>
        <span className={style.icon_box} style={{backgroundColor: bgColor ? bgColor : '#E8EBED'}}>
          <Image src={imgSrc} width={20} height={20} alt="" />
        </span>
        <span>{title}</span>
      </div>
    </Link>
    // <div className={style.row_2}>
    //   <div className={style.label}>자주 찾는 메뉴</div>
    //   <div className={style.menu_box}>
    //     <Link href='/home/user-guide'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#E8EBED'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/find.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>학습 이용 방법</span>
    //       </div>
    //     </Link>
    //     <Link href='/ranking'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#FFF3BB'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/star.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           랭킹
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='/home/main/rg-news/new-contents/'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#D9F8FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/new_book.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           신규 도서
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='/home/rg-membership/payment/purchase'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#D9F8FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/payment.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           이용권 구매하기
    //         </span>
    //       </div>
    //     </Link>
    //     <Link href='https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1' target='_blank'>
    //       <div className={style.menu_button}>
    //         <span className={style.icon_box} style={{backgroundColor: '#E8F1FF'}}>
    //           <Image src="/src/images/@home/quick-menu-icon/work_book.png" width={20} height={20} alt="" />
    //         </span>
    //         <span>
    //           워크북 구매하기
    //         </span>
    //       </div>
    //     </Link>
    //   </div>
    // </div>
  )
}