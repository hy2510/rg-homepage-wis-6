'use client'

import AppContextProvider, { ApplicationType } from '@/app/_context/AppContext'
import CustomerContextProvider from '@/app/_context/CustomerContext'
import ChannelTalkContextProvider from '@/external/channel-talk/component/ChannelTalkContext'
import Swing2AppContext from '@/external/swing2app/component/Swing2AppContext'
import { usePathname, useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'
import {
  useStaffInfoFlagLogin,
  useStudentInfoAction,
  useStudentInfoFlagLogin,
} from '@/client/store/student/info/selector'
import DeviceContextProvider from '../_context/DeviceContext'
import { STAFF_PATH, isValidatePath } from '../site-path'
import ClientTo from './ClientTo'
import LoginForward from './LoginForward'

export default function AppInitializer({
  applicationType,
  userAgentInfo,
  customerJson,
  isLogin,
  isStaffAccess,
  children,
}: {
  applicationType: string
  userAgentInfo: string
  customerJson?: string
  isLogin?: boolean
  isStaffAccess?: boolean
  children?: ReactNode
}) {
  const path = usePathname()
  const searchParams = useSearchParams()

  const { staffLogOn, studentLogOff, staffLogOff } = useStudentInfoAction()
  const loginStatus = useStudentInfoFlagLogin()
  const isLoginForwardValidatePath = isValidatePath(path)
  const staffLoginStatus = useStaffInfoFlagLogin()

  let appType: ApplicationType = 'app'
  if (applicationType === 'private') {
    appType = 'private'
  } else if (applicationType === 'school') {
    appType = 'school'
  } else if (applicationType === 'academy') {
    appType = 'academy'
  }
  if (!isLogin && loginStatus === 'unknown') {
    studentLogOff()
  }

  let staffPath = ''
  if (staffLoginStatus === 'unknown') {
    if (isStaffAccess) {
      staffLogOn()
    } else {
      staffLogOff()
    }
  } else if (loginStatus !== 'on' && staffLoginStatus === 'on') {
    if (path.includes(STAFF_PATH.MIRAGE)) {
      const uid = searchParams.get('uid')
      if (uid) {
        staffPath = `${STAFF_PATH.MIRAGE}?uid=${uid}`
      }
    }
    if (!staffPath && isLoginForwardValidatePath) {
      staffPath = STAFF_PATH.MAIN
    }
  }

  return (
    <DeviceContextProvider
      applicationType={appType}
      userAgentInfo={userAgentInfo}>
      <Swing2AppContext>
        <AppContextProvider applicationType={appType}>
          <CustomerContextProvider customerJson={customerJson}>
            <ChannelTalkContextProvider>
              {children}
              {!isLogin &&
                appType !== 'app' &&
                staffLoginStatus !== 'off' &&
                isStaffAccess &&
                staffPath && <ClientTo to={staffPath} isReplace={true} />}
              {isLogin &&
                loginStatus === 'unknown' &&
                isLoginForwardValidatePath && <LoginForward to={path} />}
            </ChannelTalkContextProvider>
          </CustomerContextProvider>
        </AppContextProvider>
      </Swing2AppContext>
    </DeviceContextProvider>
  )
}
