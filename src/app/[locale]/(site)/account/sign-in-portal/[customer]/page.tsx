'use client'

import ClientTo from '@/app/_app/ClientTo'
import {
  useChangeCustomer,
  useCustomerInfo,
} from '@/app/_context/CustomerContext'
import LoginContextProvider from '@/app/_context/LoginContext'
import SITE_PATH from '@/app/site-path'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFetchFindCustomer } from '@/client/store/customer/info/hook'
import { useStudentInfoFlagLogin } from '@/client/store/student/info/selector'
import { BackLink } from '@/ui/common/common-components'
import LoginForm from '../../sign-in/_component/LoginForm'
import LoginFormAcademy from '../../sign-in/_component/LoginFormAcademy'
import LoginFormPrivate from '../../sign-in/_component/LoginFormPrivate'
import LoginFormSchool from '../../sign-in/_component/LoginFormSchool'

export default function Page({ params }: { params: { customer: string } }) {
  const pCustomerId = params.customer
  const loginStatus = useStudentInfoFlagLogin()

  const findCustomer = useFetchFindCustomer()
  const changeCustomer = useChangeCustomer()
  const setupCustomer = (customerId: string) => {
    findCustomer.fetch({
      customerId,
      callback: (data) => {
        if (data.payload) {
          changeCustomer(data.payload)
        } else {
          setError(true)
        }
      },
    })
  }

  const customer = useCustomerInfo()
  const [error, setError] = useState<boolean | undefined>()

  useEffect(() => {
    if (pCustomerId && loginStatus !== 'unknown') {
      setupCustomer(pCustomerId)
    } else {
      setError(true)
    }
  }, [pCustomerId, loginStatus])

  if (error) {
    return <ClientTo to={SITE_PATH.ACCOUNT.MAIN} isReplace />
  }
  if (!customer.customerId || !customer.customerUse) {
    return <div>Loading.....</div>
  }
  const appType = customer.customerUse.toLocaleLowerCase() as
    | 'private'
    | 'school'
    | 'academy'
  return <Form title={customer.name} target={appType} />
}

function Form({
  title,
  target,
}: {
  title: string
  target: 'private' | 'school' | 'academy'
}) {
  const router = useRouter()
  const header = (
    <BackLink
      onClick={() => {
        router.replace(SITE_PATH.ACCOUNT.MAIN)
      }}>
      {title}
    </BackLink>
  )
  return (
    <LoginContextProvider>
      <LoginForm>
        {target === 'private' && <LoginFormPrivate customHeader={header} />}
        {target === 'school' && <LoginFormSchool customHeader={header} />}
        {target === 'academy' && <LoginFormAcademy customHeader={header} />}
      </LoginForm>
    </LoginContextProvider>
  )
}
