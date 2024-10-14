import fs from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { getBodyParameters } from '../_util'

export async function POST(request: NextRequest) {
  const parameter = await getBodyParameters(request, 'tag', 'message')
  const tag = parameter.getString('tag', '')
  const message = parameter.getString('message', '')

  writeLog(message, tag)

  return NextResponse.json({}, { status: 201 })
}

const getLogFileName = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}.log`
}

const writeLog = (message: string, tag: string) => {
  const logFileName = getLogFileName()
  const logFilePath = path.join(process.cwd(), 'a0log', logFileName)
  const timestamp = new Date().toISOString()
  const logMessage = `${timestamp} - [#${tag || 'A'}] ${message}\n`

  // 파일에 로그 추가
  fs.appendFileSync(logFilePath, logMessage)
}
