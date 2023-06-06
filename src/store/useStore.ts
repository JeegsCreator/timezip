import { Country, SelectedTimezones } from '@/types/timezone'
import dayjs from 'dayjs'
import { toast } from 'react-hot-toast'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

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
        const newTimezone = {
          countryCode: country.countryCode,
          countryId: country.id,
          countryName: country.countryName,
          timezone: zone
        }
        set((state) => ({
          selectedTimezones: [...state.selectedTimezones, newTimezone]
        }))
        toast.success('Timezone added')
      } else {
        toast.error("country or zone doesn't exist")
        // throw new Error("country or zone doesn't exist")
      }
    } else {
      toast.error('Timezone already selected')
      // throw new Error('Timezone already exist')
    }
  },

  removeTimezone: (zoneId: number) => {
    set((state) => ({
      selectedTimezones: [...state.selectedTimezones.filter(t => t.timezone.id !== zoneId)]
    }))
  }
}),
{
  name: '2-selected-countries'
}
))

interface SelectedHour {
  selectedHour: string
  setSelectedHour: (newHour: string) => void
  timeValue: string
  setTimeValue: (newHour: string) => void
  dateValue: string
  setDateValue: (newHour: string) => void
  usingDate: boolean
  setUsingDate: (newHour: boolean) => void
  timeFormat: boolean
  setTimeFormat: (newHour: boolean) => void
}

export const useSelectedHour = create(persist<SelectedHour>((set) => ({
  selectedHour: '',
  setSelectedHour: (newHour: string) => set({ selectedHour: newHour }),
  timeValue: '',
  setTimeValue: (newHour: string) => set({ timeValue: newHour }),
  dateValue: dayjs().format(),
  setDateValue: (newHour: string) => set({ dateValue: newHour }),
  usingDate: false,
  setUsingDate: (newHour: boolean) => set({ usingDate: newHour }),
  timeFormat: false,
  setTimeFormat: (newHour: boolean) => set({ timeFormat: newHour })
}),
{
  name: '2-selected-hour'
}
))

interface Template {
  template: string
  setTemplate: (newTemplate: string) => void
}

export const useTemplate = create(persist<Template>((set) => ({
  template: '@(emoji) @(time-H:mm)',
  setTemplate: (newTemplate: string) => set({ template: newTemplate })
}), {
  name: '2-template'
}))
