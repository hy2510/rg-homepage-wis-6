import useLogout from '@/app/_function/use-logout'
import { useEffect } from 'react'
import {
  registRejectRefreshToken,
  unregistRejectRefreshToken,
} from '@/repository/client/utils'

export default function useConnectRefreshToken() {
  const onLogout = useLogout()
  useEffect(() => {
    registRejectRefreshToken(() => {
      onLogout()
    })
    return () => {
      unregistRejectRefreshToken()
    }
  }, [onLogout])

  return onLogout
}
