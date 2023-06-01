import { getFormatedHour } from '@/app/utils'
import { Country, Zone } from '@/types/timezone'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SelectedTimezones {
  countryId: number // 2. see if the country is alredy selected ? create a new index : push data
  countryName: string
  countryCode: string
  timezone: Zone
}

interface TimezoneState {
  selectedTimezones: SelectedTimezones[]
  addTimezone: ({ country, zoneId }: { country: Country, zoneId: number }) => void
  removeTimezone: (zoneId: number) => void
  getTimezone: (zoneName: string, data: Country | undefined) => SelectedTimezones[]
}

export const useSelectedTimezones = create(persist<TimezoneState>((set, get) => ({
  selectedTimezones: [],

  getTimezone: (zoneId: string, data: Country | undefined) => {
    // const index = data?.findIndex(zone => zone.zoneName === zoneName)
    // if ((index === undefined) || (index === -1)) return undefined
    // return data?[index]
    return get().selectedTimezones
  },

  addTimezone: ({ country, zoneId }: { country: Country, zoneId: number }) => {
    const selectedTimezones = get().selectedTimezones
    const alreadyExistTimezoneInSelected = selectedTimezones.some(t => t.timezone.id === zoneId)

    if (!alreadyExistTimezoneInSelected) {
      const zone = country?.Timezone.find(z => z.id === zoneId)

      if (country && zone) {
        selectedTimezones.push({
          countryCode: country?.countryCode,
          countryId: country?.id,
          countryName: country.countryName,
          timezone: zone
        })
        set({ selectedTimezones })
      } else {
        throw new Error("country or zone doesn't exist")
      }
    } else {
      throw new Error('Timezone already exist')
    }
  },

  removeTimezone: (zoneId: number) => {
    set((prev) => {
      const selectedTimezones = prev.selectedTimezones
      const index = selectedTimezones.findIndex(prevZoneName => prevZoneName.timezone.id === zoneId)
      selectedTimezones.splice(index, 1)
      return { selectedTimezones }
    })
  }
}),
{
  name: 'selected-countries'
}
))

interface SelectedHour {
  selectedHour: string
  setSelectedHour: (newHour: string) => void
}

export const useSelectedHour = create(persist<SelectedHour>((set, get) => ({
  selectedHour: getFormatedHour(),
  setSelectedHour: (newHour: string) => set({ selectedHour: newHour })
}),
{
  name: 'selected-hour'
}
))
