import React from 'react'

export const revalidate = 0
export default function Layout({ children }: { children?: React.ReactNode }) {
  const time = new Date().toString()
  return (
    <html>
      <body>
        <div>
          <h3>Server DateTime</h3>
          <p>{time}</p>
        </div>
        {children}
      </body>
    </html>
  )
}
