'use client'

import style from '../page.module.scss'
import { useSiteBlueprint } from '@/app/_context/CustomerContext'
import { STAFF_PATH } from '@/app/site-path'
import Image from 'next/image'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useUpdateStaffLogOn } from '@/client/store/student/info/hook'
import { Button, Nav, NavItem } from '@/ui/common/common-components'
import LoadingScreen from '@/ui/modules/LoadingScreen'

type StaffSignature = {
  host: string
  code: string
  i: number
}

export default function Layout({ children }: { children?: React.ReactNode }) {
  const updateStaffLogon = useUpdateStaffLogOn()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const open = searchParams.get('open')

  const { customLogo, target } = useSiteBlueprint()

  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<boolean | undefined>(undefined)
  const [payload, setPayload] = useState<StaffSignature | undefined>(undefined)
  const [goLink, setGoLink] = useState(false)

  const adminHyperLink = (
    signature: StaffSignature,
    isDelay: boolean = false,
  ) => {
    setGoLink(true)
    if (isDelay) {
      setTimeout(() => {
        location.replace(
          `${signature.host}?code=${signature.code}&i=${signature.i}`,
        )
      }, 1000)
    } else {
      location.replace(
        `${signature.host}?code=${signature.code}&i=${signature.i}`,
      )
    }
  }

  useEffect(() => {
    if (!!payload?.code) {
      if (open) {
        adminHyperLink(payload, true)
      }
    }
  }, [open, payload, router])

  useEffect(() => {
    async function fetching() {
      const response = await requestStaffSignature()
      if (response) {
        setPayload(response)
        updateStaffLogon()
      } else {
        setError(true)
      }
      setLoading(false)
    }
    fetching()
  }, [updateStaffLogon])

  if (loading || goLink) {
    return <LoadingScreen />
  }

  return (
    <>
      <div className={style.admin_header}>
        <div className={`container ${style.container}`}>
          <div className={style.logo}>
            {customLogo ? (
              <Image
                alt=""
                src={customLogo}
                width={240}
                height={80}
                style={{
                  width: 'auto',
                  height: 'auto',
                  maxWidth: '250px',
                  maxHeight: '52px',
                  borderRadius: '8px',
                  backgroundColor: '#fff',
                  padding: '2.5px 5px',
                  display: 'block',
                }}
              />
            ) : (
              <Image
                alt=""
                src="/src/images/@global-header/company_logo_white.svg"
                width={48}
                height={40}
                style={{ display: 'block' }}
              />
            )}
          </div>
          <div className={style.link_group}>
            <div
              className={style.link}
              onClick={() => {
                if (payload) {
                  adminHyperLink(payload)
                }
              }}>
              Access Admin Site
            </div>
            <div
              className={style.link}
              onClick={() => {
                router.replace('/signoff')
              }}>
              Logout
            </div>
          </div>
        </div>
      </div>
      {/* <TabNavBar></TabNavBar> */}
      <main className="container">
        <div className={style.admin}>
          {open ? (
            <AdminGoToLink
              onClickGoToLink={() => {
                if (payload) {
                  adminHyperLink(payload)
                }
              }}
            />
          ) : (
            <>
              <Nav>
                <NavItem
                  active={pathname.indexOf(STAFF_PATH.BOARD) >= 0}
                  onClick={() => {
                    router.push(STAFF_PATH.BOARD)
                  }}>
                  공지
                </NavItem>
                {target.academy && (
                  <NavItem
                    active={pathname.indexOf(STAFF_PATH.GALLERY) >= 0}
                    onClick={() => {
                      router.push(STAFF_PATH.GALLERY)
                    }}>
                    갤러리
                  </NavItem>
                )}
              </Nav>
              <div className={style.board}>
                {error ? (
                  <div>
                    <div>잘못된 접근입니다.</div>
                    <div>
                      <Button
                        onClick={() => {
                          router.replace('/signoff')
                        }}>
                        나가기
                      </Button>
                    </div>
                  </div>
                ) : (
                  children
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}

function AdminGoToLink({ onClickGoToLink }: { onClickGoToLink?: () => void }) {
  return (
    <div>
      <h2>Staff Menu</h2>
      <div style={{ width: '200px', marginTop: '24px' }}>
        <Button
          onClick={() => {
            if (onClickGoToLink) {
              onClickGoToLink()
            }
          }}>
          관리자 사이트 접속
        </Button>
      </div>
    </div>
  )
}

async function requestStaffSignature(): Promise<StaffSignature | undefined> {
  let result: StaffSignature | undefined = undefined

  try {
    const dataFetch = await fetch(`/api/staff`, {
      method: 'get',
    })
    if (dataFetch.ok) {
      const data = await dataFetch.json()
      result = data
    }
  } catch (error) {}

  return result
}
