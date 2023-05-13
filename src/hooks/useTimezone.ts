import { Timezone } from '@/types/timezone'
import { useQuery } from '@tanstack/react-query'

async function fetchTimezoneList () {
  const res = await fetch('/api/timezoneList')
  const data = await res.json()
  return data as Timezone
}

export function useFetchTimezoneList () {
  return useQuery(['timezone'], fetchTimezoneList)
}
