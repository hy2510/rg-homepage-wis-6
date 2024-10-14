'use client'

import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { useDevicePlatform } from '@/app/_context/DeviceContext'
import PurchaseGroup from '../../rg-membership/payment/_cpnt/PurchaseGroup'

export default function Page() {
  const { target, isPaymentable } = useSiteBlueprint()
  const platform = useDevicePlatform()

  if (
    isPaymentable &&
    platform !== 'unknown' &&
    (target.school || target.academy)
  ) {
    return <PurchaseGroup />
  }
  return <>{`Not accessible.`}</>
}
