import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useState } from 'react'
import { useScreenMode, useStyle } from '@/ui/context/StyleContext'
import { useRefIframeHeight } from '@/app/_app/IFrameWrapper'
import { Button, Margin, Modal } from '@/ui/common/common-components'
import { useStudentIsLogin } from '@/client/store/student/info/selector'
import { useRouter } from 'next/navigation'
import SITE_PATH from '@/app/site-path'
import useTranslation from '@/localization/client/useTranslations'

const STYLE_ID = 'home_main_ad_banners'

export const AdBannersGroup = ({ children }: { children?: ReactNode }) => {
  const style = useStyle(STYLE_ID)

  return <div className={style.ad_banners_group}>{children}</div>
}

export const AdBannerType1 = ({
  title,
  bgColor,
  imgSrc = '',
  width,
  height,
  href,
  target,
}: {
  title: string
  bgColor?: string
  imgSrc?: string
  width?: number
  height?: number
  children?: ReactNode
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <Link href={href ? href : ''} target={target ? target : '_self'}>
      <div
        className={style.ad_banner_type_1}
        style={{ backgroundColor: bgColor ? bgColor : '#fff' }}>
        <Image
          alt={title}
          src={imgSrc}
          width={width}
          height={height}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>
    </Link>
  )
}

export const AdBannerType2 = ({
  bgColor,
  children,
  href,
  target,
  txt1,
  txt2,
  imgSrc = '',
}: {
  bgColor: string
  children?: ReactNode
  href?: string
  target?: string
  txt1?: string
  txt2?: string
  imgSrc?: string
}) => {
  const style = useStyle(STYLE_ID)

  const Menual = () => {
    return (
      <div className={style.ad_banner_type_2_menual}>
        <div className={style.col_1}>
          <div className={style.txt_1}>{txt1}</div>
          <div className={style.txt_2}>{txt2}</div>
        </div>
        <div className={style.col_2}>
          <div className={style.symbol_image}>
            <Image alt="" src={imgSrc} width={70} height={70} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link href={href ? href : ''} target={target ? target : '_self'}>
      <div
        className={style.ad_banner_type_2}
        style={{ backgroundColor: bgColor }}>
        {children ? children : <Menual />}
      </div>
    </Link>
  )
}

export const AdBannerType3 = ({
  bgColor,
  bgImage,
  href,
  target,
}: {
  bgColor?: string
  bgImage?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <Link href={href ? href : ''} target={target ? target : '_self'}>
      <div
        className={style.ad_banner_type_3}
        style={{ backgroundColor: bgColor ? bgColor : '#fff', backgroundImage: `url(${bgImage})` }}>
      </div>
    </Link>
  )
}

export const AdBannerType4 = ({
  children,
  bgColor,
  bgImage,
  href,
  target,
}: {
  children?: ReactNode
  bgColor?: string
  bgImage?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      {href ? 
        <Link href={href} target={target ? target : '_self'}>
          <div className={style.ad_banner_type_4} style={{backgroundColor: bgColor && bgColor, backgroundImage: bgImage && `url(${bgImage})`}}>{children}</div>
        </Link>
        : <div className={style.ad_banner_type_4} style={{backgroundColor: bgColor && bgColor, backgroundImage: bgImage && `url(${bgImage})`}}>{children}</div>
      }    
    </>
  )
}

export const HomeBanner = ({
  title,
  txtColor,
  sub,
  subColor,
  comment,
  commentColor,
  bgColor,
  bgImage,
  href,
  target,
}: {
  children?: ReactNode
  title: string
  txtColor?: string
  sub?: string
  subColor?: string
  comment?: string
  commentColor?: string
  bgColor?: string
  bgImage?: string
  href?: string
  target?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <>
      <AdBannerType4 href={href} bgColor={bgColor} target={target}>
        <div className={`${style.home_banner}`} style={{color: txtColor ? txtColor : '#000', backgroundImage: `url(${bgImage})`}}>
          <div>
            {sub ? <div className={style.sub} style={{color: subColor ? subColor : '#000'}}>{sub}</div> : null}
            <div className={style.title}>{title}</div>
            {
              comment ? <div className={`${style.comment} ${style.txt_white}`} style={{color: commentColor ? commentColor : '#999', opacity: '0.8'}}>{comment}</div> : null
            }
          </div>
        </div>
      </AdBannerType4>
    </>
  )
}

export const HomeBannerRgShop = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={`${style.home_banner} ${style.bg_top}`} style={{backgroundImage: `url('/src/images/@home/shop/goods.png')`}}>
        <div>
          <div className={style.title}>리딩게이트 샵</div>
        </div>
        <div className={style.home_banner_buttons}>
          <Link href='https://brand.naver.com/readinggate' target='_blank'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/shop/shop.svg' width={20} height={20} alt='' />
              <span>샵 바로가기</span>
            </div>
          </Link>
          <Link href='https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1' target='_blank'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/shop/workbook.svg' width={20} height={20} alt='' />
              <span>워크북 구매하기</span>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeBannerRgShopSchool = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4 href='https://brand.naver.com/readinggate' target='_blank'>
      <div className={style.home_banner} style={{backgroundImage: `url('/src/images/@home/shop/goods_school.png')`}}>
        <div>
          <div className={style.title}>리딩게이트 샵</div>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeBannerRgShopWorkbookSchool = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4 href='https://brand.naver.com/readinggate/category/97ef382000f947ab90f05041ea6b1f0c?cp=1' target='_blank'>
      <div className={style.home_banner} style={{backgroundImage: `url('/src/images/@home/shop/workbook_school.png')`}}>
        <div>
          <div className={style.title}>Workbook 구매하기</div>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeBannerRgMembership = () => {
  const style = useStyle(STYLE_ID)
  const { t } = useTranslation()
  const router = useRouter()  
  const isMobile = useScreenMode() === 'mobile'
  const [viewModal, _viewModal] = useState(false)
  const isLogin = useStudentIsLogin()

  return (
    <AdBannerType4>
      <div className={`${style.home_banner} ${style.bg_top}`} style={{backgroundImage: `url('/src/images/@home/payment/symbol.png')`}}>
        <div>
          <div className={style.title}>RG 멤버십</div>
          <div className={style.link} onClick={() => {
            viewModal ? _viewModal(false) : _viewModal(true)
          }}>할인 혜택 보기</div>
          {viewModal && 
            <Modal
            header={true}
            title={''}
            compact={false}
            onClickDelete={() => {
              _viewModal(false)
            }}
            onClickLightbox={() => {
              _viewModal(false)
            }}>
            <iframe
              width={'100%'}
              frameBorder="0"
              scrolling="no"
              src={
                isMobile
                  ? '/src/html/page-contents/mobile/rg-membership/membership_pop01.html'
                  : '/src/html/page-contents/pc/rg-membership/membership_pop01.html'
              }
              style={{
                borderRadius: 15,
                backgroundColor: 'transparent',
                overflow: 'hidden',
                height: '73vh',
              }}
            />
            <Margin height={20} />
            <div style={{ width: '300px', margin: 'auto' }}>
              <Button
                shadow
                onClick={() => {
                  if (isLogin) {
                    router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT)
                  } else {
                    // 로그인이 안 된 상태에서만 실행
                    // 한국어 : 이용권 안내 로그인 또는 회원가입 후 이용 가능합니다. 로그인(회원가입) 하시겠습니까?
                    // 영어 : Access to the subscription information is available after logging in or signing up. Would you like to log in or sign up?
                    // 베트남어 : Thông tin về gói dịch vụ sẽ có sẵn sau khi bạn đăng nhập hoặc đăng ký tài khoản. Bạn có muốn đăng nhập hoặc đăng ký không?
                    if (
                      confirm(
                        '이용권 안내는 로그인 또는 회원가입 후 이용하실 수 있습니다. 로그인(회원가입)을 진행하시겠습니까?',
                      )
                    ) {
                      router.push(SITE_PATH.ACCOUNT.MAIN)
                    }
                  }
                }}>
                {t('t334')}
              </Button>
            </div>
            <Margin height={30} />
            </Modal>
          }
        </div>
        <div className={style.home_banner_buttons}>
          <Link href='/home/rg-membership/payment/purchase'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/payment/subscription.svg' width={20} height={20} alt='' />
              <span>이용권 구매하기</span>
            </div>
          </Link>
          <Link href='/home/rg-membership/payment/ticket'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/payment/ticket.svg' width={20} height={20} alt='' />
              <span>티켓 등록하기</span>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeBannerRgMembershipVn = () => {
  const style = useStyle(STYLE_ID)
  const { t } = useTranslation()
  const router = useRouter()  
  const isMobile = useScreenMode() === 'mobile'
  const [viewModal, _viewModal] = useState(false)
  const isLogin = useStudentIsLogin()

  return (
    <AdBannerType4>
      <div className={`${style.home_banner} ${style.bg_top}`} style={{backgroundImage: `url('/src/images/@home/payment/symbol.png')`}}>
        <div>
          <div className={style.title}>RG Thành viên</div>
          {/* <div className={style.link} onClick={() => {
            viewModal ? _viewModal(false) : _viewModal(true)
          }}>할인 혜택 보기</div> */}
          {/* {viewModal && 
            <Modal
            header={true}
            title={''}
            compact={false}
            onClickDelete={() => {
              _viewModal(false)
            }}
            onClickLightbox={() => {
              _viewModal(false)
            }}>
            <iframe
              width={'100%'}
              frameBorder="0"
              scrolling="no"
              src={
                isMobile
                  ? '/src/html/page-contents/mobile/rg-membership/membership_pop01.html'
                  : '/src/html/page-contents/pc/rg-membership/membership_pop01.html'
              }
              style={{
                borderRadius: 15,
                backgroundColor: 'transparent',
                overflow: 'hidden',
                height: '73vh',
              }}
            />
            <Margin height={20} />
            <div style={{ width: '300px', margin: 'auto' }}>
              <Button
                shadow
                onClick={() => {
                  if (isLogin) {
                    router.push(SITE_PATH.HOME.MEMBERSHIP_PAYMENT)
                  } else {
                    // 로그인이 안 된 상태에서만 실행
                    // 한국어 : 이용권 안내 로그인 또는 회원가입 후 이용 가능합니다. 로그인(회원가입) 하시겠습니까?
                    // 영어 : Access to the subscription information is available after logging in or signing up. Would you like to log in or sign up?
                    // 베트남어 : Thông tin về gói dịch vụ sẽ có sẵn sau khi bạn đăng nhập hoặc đăng ký tài khoản. Bạn có muốn đăng nhập hoặc đăng ký không?
                    if (
                      confirm(
                        '이용권 안내는 로그인 또는 회원가입 후 이용하실 수 있습니다. 로그인(회원가입)을 진행하시겠습니까?',
                      )
                    ) {
                      router.push(SITE_PATH.ACCOUNT.MAIN)
                    }
                  }
                }}>
                {t('t334')}
              </Button>
            </div>
            <Margin height={30} />
            </Modal>
          } */}
        </div>
        <div className={style.home_banner_buttons}>
          <Link href='/home/rg-membership/payment/purchase'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/payment/subscription.svg' width={20} height={20} alt='' />
              <span>Mua gói dịch vụ</span>
            </div>
          </Link>
          <Link href='/home/rg-membership/payment/ticket'>
            <div className={style.option_button}>
              <Image src='/src/images/@home/payment/ticket.svg' width={20} height={20} alt='' />
              <span>Đăng ký vé</span>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeCustomerCenter = () => {
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

export const HomeCustomerCenterKrAca = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://ossified-smell-f52.notion.site/44d6a2eb4c1c4199bc5745077033b1ea' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>고객지원</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://ossified-smell-f52.notion.site/b6e166ab71814ab6a9703fc64b88b22f' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>접속 및 로그인</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/d44e636097fd4d2b81bf38cd0f0cba62' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>학습가이드</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/e4db43514eb04259bdb8e4af21e36757' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>사용환경</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/1fcb3ff426cc44d288532b1ea78f3b1b' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>원격지원</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/fbb7bc98ff8244fb8e134587e9c1a802' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>자료실</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/FAQ-c6b4a74dea634fadac2908626a1d2043' target='_balnk'>
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

export const HomeCustomerCenterKrSchool = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://ossified-smell-f52.notion.site/bcdb1eaf03a34c34a4a0567eec292601' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>고객지원</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://ossified-smell-f52.notion.site/745eb73186d54f5e9bf9225c5dc4b83e' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>접속 및 로그인</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/b7e7edad6129407784aa700422bd3f04' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>학습가이드</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/42ddf8c344a34272bc72e5f887cc81a0' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>사용환경</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/9c4ff87c7766422a8305d56adb5d1ea1' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>원격지원</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/4565b29580904f6f8f4ab1c2f609653d' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>자료실</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/319f3bc9ee2a41c7bc34d4669c840140' target='_blank'>
            <div className={`${style.menu_item} ${style.bg006}`}>
              <span>이벤트</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/FAQ-e474efe77a8a4bd783b4d4b1c4ff629c' target='_balnk'>
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

export const HomeCustomerCenterVn = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://concrete-meteor-3e2.notion.site/RGVN-CSKH-1204e876aa85808a9d7ccd04783ec488' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>Hỗ trợ khách hàng</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://concrete-meteor-3e2.notion.site/T-M-HI-U-V-READING-GATE-9ca2576c7a8c42a7a0688998bf7ef1b4' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>TÌM HIỂU VỀ READING GATE</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://concrete-meteor-3e2.notion.site/H-NG-D-N-S-D-NG-a39e7de114de4e109cea52a0a784d08c' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>HƯỚNG DẪN SỬ DỤNG</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://concrete-meteor-3e2.notion.site/THI-T-B-S-D-NG-1204e876aa85802da34ed6e428051b51' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>THIẾT BỊ SỬ DỤNG</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          {/* <Link href='https://ossified-smell-f52.notion.site/cf1d4f5a54654ded8a2ad92b9b7ce3c9' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>원격지원</span>
              <div className={style.bg_image}></div>
            </div>
          </Link> */}
          <Link href='https://concrete-meteor-3e2.notion.site/H-C-LI-U-1204e876aa85800a905eee4ca1b5cfe2' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>HỌC LIỆU</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          {/* <Link href='https://ossified-smell-f52.notion.site/f72c92a304ff4548bd1454378bf23eb0' target='_blank'>
            <div className={`${style.menu_item} ${style.bg006}`}>
              <span>이벤트</span>
              <div className={style.bg_image}></div>
            </div>
          </Link> */}
          <Link href='https://concrete-meteor-3e2.notion.site/RGVN-Q-A-1204e876aa8580209e4bc119829071e0' target='_balnk'>
            <div className={`${style.menu_item} ${style.bg007}`}>
              <span>RGVN Q&A</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeCustomerCenterVnAca = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://concrete-meteor-3e2.notion.site/H-ng-d-n-cho-trung-t-m-ti-ng-Anh-1294e876aa85803aaf94f5a233074b25' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>Hỗ trợ khách hàng</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://concrete-meteor-3e2.notion.site/T-M-HI-U-V-READING-GATE-1294e876aa858121b9c4df0817a1a81e' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>TÌM HIỂU VỀ READING GATE</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://concrete-meteor-3e2.notion.site/H-NG-D-N-S-D-NG-1294e876aa85817d9c64d3be968377f6' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>HƯỚNG DẪN SỬ DỤNG</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://concrete-meteor-3e2.notion.site/THI-T-B-S-D-NG-1294e876aa8581d18f1eefc4d236fce6' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>THIẾT BỊ SỬ DỤNG</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          {/* <Link href='https://ossified-smell-f52.notion.site/cf1d4f5a54654ded8a2ad92b9b7ce3c9' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>원격지원</span>
              <div className={style.bg_image}></div>
            </div>
          </Link> */}
          <Link href='https://concrete-meteor-3e2.notion.site/H-C-LI-U-1294e876aa858149b095eb25ddd751fa' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>HỌC LIỆU</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          {/* <Link href='https://ossified-smell-f52.notion.site/f72c92a304ff4548bd1454378bf23eb0' target='_blank'>
            <div className={`${style.menu_item} ${style.bg006}`}>
              <span>이벤트</span>
              <div className={style.bg_image}></div>
            </div>
          </Link> */}
          <Link href='https://concrete-meteor-3e2.notion.site/RGVN-Q-A-1204e876aa8580209e4bc119829071e0' target='_balnk'>
            <div className={`${style.menu_item} ${style.bg007}`}>
              <span>RGVN Q&A</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeCustomerCenterGlobal = () => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4>
      <div className={style.home_banner}>
        <div>
          <div style={{marginBottom: '10px'}}>
            <Image src='/src/images/@home/logo_color_full.svg' width={275} height={36} alt='' style={{width: 'auto', height: '24px'}} />
          </div>
          <Link href='https://ossified-smell-f52.notion.site/RG-a8fc674ab32f458ca70d659e1916e34c' target='_blank'>
            <div className={`${style.title} ${style.title_link}`}>Customer Support</div>
          </Link>
        </div>
        <div className={style.customer_center_menu_list}>
          <Link href='https://ossified-smell-f52.notion.site/a4cce8ae154943808cc48a9e5b60327b' target='_blank'>
            <div className={`${style.menu_item} ${style.bg001}`}>
              <span>First-Time User</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/d7da80412132466e9fdf7667d34dd1de' target='_blank'>
            <div className={`${style.menu_item} ${style.bg002}`}>
              <span>Study Guide</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/983726afd0934c3a8157bf52331d06ec' target='_blank'>
            <div className={`${style.menu_item} ${style.bg003}`}>
              <span>Specifications</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/cf1d4f5a54654ded8a2ad92b9b7ce3c9' target='_blank'>
            <div className={`${style.menu_item} ${style.bg004}`}>
              <span>Remote Support</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/4494d64673004eda9af91f9d613ec687' target='_blank'>
            <div className={`${style.menu_item} ${style.bg005}`}>
              <span>Download Center</span>
              <div className={style.bg_image}></div>
            </div>
          </Link>
          <Link href='https://ossified-smell-f52.notion.site/f72c92a304ff4548bd1454378bf23eb0' target='_blank'>
            <div className={`${style.menu_item} ${style.bg006}`}>
              <span>Event</span>
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

export const HomeBannerChanner = ({
  title1, 
  title2,
  href,
  linkTxt1,
  link1,
  linkTxt2,
  link2,
  bgColor,
  bgImage
}: {
  title1?: string
  title2?: string
  href?: string
  linkTxt1?: string
  linkTxt2?: string
  link1?: string
  link2?: string
  bgColor?: string
  bgImage?: string
}) => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4 bgColor={bgColor} href={href ? href : ''}>
      <div className={`${style.home_banner} ${style.txt_white}`} style={{backgroundImage: `url(${bgImage})`}}>
        <div>
          <div className={`${style.title} ${style.mg_bottom_none}`}>{title1}</div>
          <div className={`${style.title} ${style.txt_yellow}`}>{title2}</div>
          <Link href={link1 ? link1 : ''} target='_blank'>
            <div className={`${style.link} ${style.txt_white}`} style={{marginBottom: '10px'}}>{linkTxt1}</div>
          </Link>
          {
            linkTxt2 ? 
            <Link href={link2 ? link2 : ''} target='_blank'>
              <div className={`${style.link} ${style.txt_white}`}>{linkTxt2}</div>
            </Link> : null
          }
        </div>
      </div>
    </AdBannerType4>
  )
}

export const HomeBannerDonation = ({link, bgImage}: {link: string; bgImage: string;}) => {
  const style = useStyle(STYLE_ID)

  return (
    <AdBannerType4 bgColor='#C92343' bgImage={bgImage}>
      <div className={`${style.home_banner} ${style.txt_white}`}>
        <div>
          <div className={`${style.title} ${style.mg_bottom_none}`}>다독다독 기부캠페인</div>
          <div className={`${style.title}`}>후원 완료</div>
          <Link href={link} target='_blank'>
            <div className={`${style.link} ${style.txt_white}`} style={{marginBottom: '10px'}}>후원 스토리 보기</div>
          </Link>
        </div>
      </div>
    </AdBannerType4>
  )
}

export const NoticeBanner = ({children, bgColor, href}: {children: ReactNode; bgColor?: string; href?: string}) => {
  return (
    <div className='container' style={{padding: '20px 15px 0'}}>
      <Link href={href ? href : ''} target={href ? '_blank' : ''}>
        <div style={{backgroundColor: bgColor ? bgColor : '#85E7E6', textAlign: 'center', borderRadius: '12px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{children}</div>
      </Link>
    </div>
  )
}