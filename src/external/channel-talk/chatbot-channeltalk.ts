'use client'

import ChannelService from './channel-talk-api'

const TYPE_PRIVATE_KEY = 'c660d8bb-30f0-42f3-a8b4-41f85374393e'
const TYPE_SCHOOL_KEY = '45d96f00-6524-47b5-8f75-6634663d766e'
// if ((customerId != "000107") && (customerId != "000830") && (customerId != "002061")) // IREAD-수원정자센터, 로제타스톤코리아, SDA교문리교회 제외
const TYPE_ACADEMY_KEY = '22d7855e-17cd-44d5-b281-dfba2b599bef'
const EXECLUSIVE_CUSTOMER = ['000107', '000830', '002061']

const connection: {
  isLoaded: boolean | undefined
  isBooting: boolean
  isConnected: boolean
  connectInfo?: {
    customerId: string
    customerName: string
    customerUse: string
  }
  userInfo?: {
    memberId: string
    studentId: string
    loginId: string
    name: string
  }
  config?: {
    pluginKey: string
    memberId?: string
    profile?: {
      [key: string]: string | number | boolean | null | undefined
    }
  }
  setting: {
    isButtonShow: boolean
  }
} = {
  isLoaded: undefined,
  isBooting: false,
  isConnected: false,
  connectInfo: undefined,
  userInfo: undefined,
  config: undefined,
  setting: {
    isButtonShow: false,
  },
}

function getKey(customerType?: string) {
  let key: string | undefined = undefined

  if (customerType === 'private') {
    key = TYPE_PRIVATE_KEY
  } else if (customerType === 'school') {
    key = TYPE_SCHOOL_KEY
  } else if (customerType === 'academy') {
    key = TYPE_ACADEMY_KEY
  }
  return key
}

function load() {
  if (connection.isLoaded === undefined) {
    connection.isLoaded = false
    ChannelService.loadScript()
    connection.isLoaded = true
  }
}

function connect(
  customerId: string,
  customerName: string,
  customerType: string,
): boolean {
  let key: string | undefined = getKey(customerType)

  const isAvailableCustomer =
    !!key && !!customerId && !EXECLUSIVE_CUSTOMER.includes(customerId)

  if (isAvailableCustomer && !connection.isBooting) {
    const config = {
      pluginKey: key!!,
      hideChannelButtonOnBoot: true,
      zIndex: 990,
      profile: {
        customerName,
      },
    }
    connection.isBooting = true
    ChannelService.boot(config, (error) => {
      if (!error) {
        connection.isBooting = false
        connection.isConnected = true
        connection.config = config
        connection.connectInfo = {
          customerId,
          customerName,
          customerUse: customerType,
        }
        if (connection.setting.isButtonShow) {
          ChannelService.showChannelButton()
        }
      }
    })
    return true
  }

  return false
}

function disconnect() {
  updateUserInfo()
}

function updateUserInfo(info?: {
  userid: string
  loginId: string
  name: string
  customerUse: string
}) {
  const isConnected = connection.isConnected
  const currentUser = connection.userInfo

  const memberId = info
    ? `C${connection.connectInfo?.customerName}L${info.loginId}S${info.userid}`
    : ''

  let key = getKey(info?.customerUse?.toLocaleLowerCase())

  if (
    key &&
    isConnected &&
    info &&
    info.userid &&
    connection.config &&
    (!currentUser || currentUser.memberId !== memberId)
  ) {
    const newConfig = {
      ...connection.config,
      pluginKey: key,
      memberId,
      hideChannelButtonOnBoot: true,
      zIndex: 990,
      profile: { ...connection.config.profile, name: info?.name },
    }
    if (!connection.isBooting) {
      connection.isBooting = true
      ChannelService.boot({ ...newConfig }, (error) => {
        connection.isBooting = false
        if (!error) {
          connection.isConnected = true
          connection.config = newConfig
          connection.userInfo = {
            memberId,
            studentId: info.userid,
            loginId: info.loginId,
            name: info.name,
          }
          if (connection.setting.isButtonShow) {
            ChannelService.showChannelButton()
          }
        }
      })
    }
  } else if (isConnected && !info && connection.config) {
    const config = {
      pluginKey: connection.config.pluginKey,
      hideChannelButtonOnBoot: true,
      zIndex: 990,
      profile: {
        customerName: connection.config.profile?.customerName,
      },
    }
    if (!connection.isBooting) {
      connection.isBooting = true
      ChannelService.boot(config, (error) => {
        if (!error) {
          connection.isBooting = false
          connection.isConnected = true
          connection.config = config
          if (connection.setting.isButtonShow) {
            ChannelService.showChannelButton()
          }
        }
      })
    }
  }
}

function showChat() {
  ChannelService.openChat()
}

function hideChat() {
  ChannelService.onHideMessenger(() => {})
}

function showButton(isToggle?: boolean) {
  if (isToggle) {
    if (!connection.setting.isButtonShow) {
      connection.setting.isButtonShow = true
      ChannelService.showChannelButton()
    }
  } else {
    connection.setting.isButtonShow = true
    ChannelService.showChannelButton()
  }
}

function hideButton(isToggle?: boolean) {
  if (isToggle) {
    if (connection.setting.isButtonShow) {
      connection.setting.isButtonShow = false
      ChannelService.hideChannelButton()
    }
  } else {
    connection.setting.isButtonShow = false
    ChannelService.hideChannelButton()
  }
}

export const Chatbot = {
  load,
  connect,
  disconnect,
  updateUserInfo,
  showChat,
  hideChat,
  showButton,
  hideButton,
}
