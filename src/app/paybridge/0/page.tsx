'use client'

import { useEffect, useState } from 'react'

export default function Page() {
  const [text, setText] = useState('')
  const [time, setTime] = useState<Date | undefined>(undefined)
  useEffect(() => {
    const date = new Date()
    setText(`${date.getTimezoneOffset()}`)
    setTime(date)
  }, [])

  const [routetime, setRoutetime] = useState<string>('')
  useEffect(() => {
    const headers = new Headers()
    headers.append('timeoffset', ``)
    fetch('/paybridge/1', { headers })
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        console.log(data)
        setRoutetime(data.time)
      })
  }, [])

  return (
    <>
      <div>
        <h3>Client DateTime</h3>
        <p>
          {time && time.toString()} : {`(${text})`}
        </p>
        <h3>Route Time</h3>
        <p>{routetime}</p>
      </div>
    </>
  )
}
