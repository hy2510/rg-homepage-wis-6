'use client'

import { useCustomerInfo } from '@/app/_context/CustomerContext'
import React, { useEffect } from 'react'
import { useStudentInfo } from '@/client/store/student/info/selector'
import { Chatbot } from '../chatbot-channeltalk'

const ChannelTalkChatbotContext = React.createContext<undefined>(undefined)

export default function ChannelTalkContextProvider({
  children,
}: {
  children?: React.ReactNode
}) {
  const { customerId, name: customerName, customerUse } = useCustomerInfo()
  const { loginId, studentId, name: studentName } = useStudentInfo()

  useEffect(() => {
    Chatbot.load()
  }, [])

  useEffect(() => {
    Chatbot.connect(customerId, customerName, customerUse.toLocaleLowerCase())
    return () => {
      Chatbot.disconnect()
    }
  }, [customerId, customerName, customerUse])

  useEffect(() => {
    Chatbot.updateUserInfo({
      userid: studentId,
      loginId,
      name: studentName,
      customerUse,
    })
  }, [loginId, studentId, studentName, customerUse])

  return (
    <ChannelTalkChatbotContext.Provider value={undefined}>
      {children}
    </ChannelTalkChatbotContext.Provider>
  )
}

export const useChannelTalkChatbotController = () => {
  return {
    showChat: Chatbot.showChat,
    hideChat: Chatbot.hideChat,
    showButton: Chatbot.showButton,
    hideButton: Chatbot.hideButton,
  }
}
