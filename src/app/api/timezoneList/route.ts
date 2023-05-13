import { NextResponse } from 'next/server'
import { env } from 'process'

if (env.TIMEZONE_DB_KEY === undefined) throw new Error('TIMEZONE_DB_KEY not found')
const TIMEZONEDB_URL = `https://api.timezonedb.com/v2.1/list-time-zone?key=${env.TIMEZONE_DB_KEY}&format=json`

export async function GET () {
  const res = await fetch(TIMEZONEDB_URL)
  const data = await res.json()

  return NextResponse.json(data)
}
