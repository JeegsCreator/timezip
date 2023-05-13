export interface Timezone {
  status: string
  message: string
  zones: Zone[]
}

export interface Zone {
  countryCode: string
  countryName: string
  zoneName: string
  gmtOffset: number
  timestamp: number
}
