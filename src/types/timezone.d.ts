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
