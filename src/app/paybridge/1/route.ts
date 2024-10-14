import { NextRequest, NextResponse } from 'next/server'

export const revalidate = 0
export function GET(request: NextRequest) {
  const timeoffset = request.headers.get('timeoffset')

  return NextResponse.json(
    { time: new Date().toString(), offset: timeoffset },
    { status: 200 },
  )
}
