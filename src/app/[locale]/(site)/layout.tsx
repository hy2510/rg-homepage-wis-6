import Image from 'next/image'
import SiteLayoutComponent from './SiteLayoutComponent'
import Link from 'next/link'

export const metadata = {
  title: 'Reading Gate',
  description: 'English Library',
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  return <SiteLayoutComponent><SchoolBlocked />{children}</SiteLayoutComponent>
}

// 학교 만료시 보여줄 화면
function SchoolBlocked() {
  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Link href={'https://readinggate.com/'}>
        <Image src='/src/images/@home/closeschool.png' width={700} height={700} style={{backgroundColor: '#f0f0f0', width: '100%', height: 'auto', maxWidth: '700px'}} alt=''/>
      </Link>
    </div>
  )
}

// 학원 만료시 보여줄 화면
function AcaBlocked() {
  return (
    <div style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px'}}>
      <Image src='/src/images/@home/logo_color_full.svg' width={280} height={40} style={{width: '100%', height: 'auto', maxWidth: '280px'}} alt=''/>
      <div style={{fontSize: '1.4em', marginBottom: '40px', textAlign: 'center'}}>본 사이트는 계약 종료로 인해 사용이 중지 되었습니다.</div>
    </div>
  )
}