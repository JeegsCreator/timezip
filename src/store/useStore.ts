import { getFormatedHour } from '@/app/utils'
import { Timezone, Zone } from '@/types/timezone'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface TimezoneState {
  selectedTimezones: string[]
  addTimezone: (zoneName: string) => void
  removeTimezone: (zoneName: string) => void
  getTimezone: (zoneName: string, data: Timezone | undefined) => Zone | undefined
}

export const useSelectedTimezones = create(persist<TimezoneState>((set, get) => ({
  selectedTimezones: [],

  getTimezone: (zoneName: string, data: Timezone | undefined) => {
    const index = data?.zones.findIndex(zone => zone.zoneName === zoneName)

    if ((index === undefined) || (index === -1)) return undefined

    return data?.zones[index]
  },

  addTimezone: (zoneName: string) => {
    set({ selectedTimezones: [...get().selectedTimezones, zoneName] })
  },

  removeTimezone: (zoneName: string) => {
    set(() => {
      const prev = get().selectedTimezones
      const index = prev.findIndex(prevZoneName => prevZoneName === zoneName)
      prev.splice(index, 1)
      return { selectedTimezones: [...prev] }
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
