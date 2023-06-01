import { Country } from '@/types/timezone'

export async function fetchTimezoneList () {
  const res = await fetch('/api/timezoneList')
  const data = await res.json()
  console.log(data)
  return data as Country[]
}
