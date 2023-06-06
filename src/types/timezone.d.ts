import dayjs from 'dayjs'

export interface Country {
  id: number
  countryCode: string
  countryName: string
  Timezone: Zone[]
}

export interface Zone {
  id: number
  initial: string
  fullName: string
  offset: number
  summerOffset: number | null
  capital: boolean
  zoneNames: string[]
}

export interface ResultData {
  time: dayjs.Dayjs
  timezones: SelectedTimezones[]
}

export interface SelectedTimezones {
  countryId: number
  countryName: string
  countryCode: string
  timezone: Zone
}
