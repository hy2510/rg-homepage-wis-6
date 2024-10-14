'use client'

import {
  useDevicePlatform,
  useUpdateDevicePlatform,
} from '@/app/_context/DeviceContext'
import Script from 'next/script'
import React, { useEffect, useState } from 'react'

export default function Swing2AppContext({
  children,
}: {
  children?: React.ReactNode
}) {
  const devicePlatform = useDevicePlatform()
  const updateDevice = useUpdateDevicePlatform()
  const [currentPlatform, setCurrentPlatform] = useState<
    'Android' | 'iOS' | undefined
  >(undefined)

  useEffect(() => {
    if (devicePlatform === 'unknown') {
      const swingWebViewPlugin = (window as any).swingWebViewPlugin
      const currentPlatform =
        swingWebViewPlugin?.app?.methods?.getCurrentPlatform()

      if (currentPlatform === 'android' || currentPlatform === 'ios') {
        const platform = currentPlatform === 'android' ? 'Android' : 'iOS'

        swingWebViewPlugin.app.methods.getAppVersion(function (value: any) {
          var appVersion = JSON.parse(value)
          let appVer = ''
          let device = ''

          if (currentPlatform === 'android') {
            // console.log('model : ' + appVersion.model)
            // console.log('sdk_version : ' + appVersion.sdk_version)
            // console.log('version_release : ' + appVersion.version_release)
            // console.log('manufacturer : ' + appVersion.manufacturer)
            // console.log('app_version : ' + appVersion.app_version)
            // console.log('radio_version : ' + appVersion.radio_version)
            // console.log('package_name : ' + appVersion.package_name)
            // console.log('uuid : ' + appVersion.uuid)

            appVer = appVersion.version_release
            device = `${appVersion.sdk_version}_${appVersion.version_release}; ${appVersion.manufacturer}/${appVersion.model}`
          } else if (currentPlatform === 'ios') {
            // console.log('model : ' + appVersion.model)
            // console.log('name : ' + appVersion.name)
            // console.log('systemVersion : ' + appVersion.systemVersion)
            // console.log('appVersion : ' + appVersion.appVersion)
            // console.log('bundleVersion : ' + appVersion.bundleVersion)
            // console.log('bundleID : ' + appVersion.bundleID)
            // console.log('uuid : ' + appVersion.uuid)

            appVer = appVersion.appVersion
            device = `${appVersion.systemVersion}; ${appVersion.model}`
          }

          updateDevice({
            platform,
            info: device,
            tag: `v${appVer}`,
          })
          setCurrentPlatform(platform)
        })
      } else {
        updateDevice({
          platform: 'Web',
        })
      }
    }
  }, [devicePlatform, updateDevice])

  useEffect(() => {
    if (currentPlatform === 'iOS') {
      const swingWebViewPlugin = (window as any).swingWebViewPlugin
      swingWebViewPlugin.app.ui.setIosBackColor(`#f0f2f5`)
    }
  }, [currentPlatform])

  return <>{children}</>
}

export function Swing2AppPreloadScript() {
  return (
    <>
      <Script
        strategy={'beforeInteractive'}
        src="https://pcdn2.swing2app.co.kr/swing_public_src/v3/2024_07_23_001/js/swing_app_on_web.js"></Script>
      <Script
        strategy={'beforeInteractive'}
        src="https://pcdn2.swing2app.co.kr/swing_public_src/custom_proj/reading_gate_proj/js/reading_gate_inapp_api_handler.js?date=20240926_v6"></Script>
    </>
  )
}
