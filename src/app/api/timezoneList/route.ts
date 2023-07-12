import { NextResponse } from 'next/server'
import timezones from './timezones.json'

export async function GET () {
  return NextResponse.json(timezones)
}
