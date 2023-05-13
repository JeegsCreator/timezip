'use client'

import { useSelectedHour, useSelectedTimezones } from '@/store/useStore'
import SelectTimezone from './SelectTimezone'
import { convertTimeZone, getFlagEmoji, handleUndefined } from './utils'
import { useEffect, useRef, useState } from 'react'
import { useFetchTimezoneList } from '@/hooks/useTimezone'
import { Clipboard, Remove } from './icons'
import ResultComponent from './ResultComponent'
import Header from './Header'
import Footer from './Footer'

interface ResultData {
  hour: string
  emojis: string[]
}

export default function Home () {
  const { selectedTimezones, removeTimezone, getTimezone } = useSelectedTimezones()
  const { selectedHour, setSelectedHour } = useSelectedHour()
  const { data } = useFetchTimezoneList()
  const [resultData, setResultData] = useState<ResultData[]>([])
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setResultData(() => {
      const res: ResultData[] = []

      selectedTimezones.forEach(zoneName => {
        const zone = getTimezone(zoneName, data)
        if (zone === undefined) return undefined

        const hour = convertTimeZone(selectedHour, zone.gmtOffset)
        const index = res.findIndex(r => r.hour === hour)
        const emoji = getFlagEmoji(zone.countryCode)
        if (index !== -1) res[index].emojis.push(emoji)
        if (index === -1) res.push({ hour, emojis: [emoji] })
      })

      return res
    })
    // convertTimeZone(selectedHour, 7200)
  }, [selectedHour, selectedTimezones, getTimezone, data])

  return (
    <div className='w-full h-full min-h-screen max-h-screen grid grid-rows-body'>
      <Header />
      <main className='h-full grid place-items-center w-full'>
        <div className='w-full'>
          <section className='mb-6 flex items-center flex-col'>
            <h1 className='text-6xl font-extrabold text-center mb-6'>TimeZip</h1>
            <p className='text-lg text-center text-gray-600 w-2/5'>Show the world when find you. Select an hour and one or more countries to get his hours</p>
          </section>
          <section>
            <div className='flex justify-center gap-4'>
              <input
                className='border border-slate-400 rounded-full px-4 py-1 h-10'
                type='time'
                name=''
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
                id='hour'
              />
              <SelectTimezone data={data} />
            </div>
            <div className='px-60 flex justify-center flex-wrap gap-2 mb-2 mt-6'>
              {selectedTimezones.map(zoneName => {
                const zone = getTimezone(zoneName, data)
                return (
                  <button
                    key={zone?.zoneName}
                    onClick={() => { handleUndefined<string>(zone?.zoneName, removeTimezone) }}
                    className='relative group h-8 border border-slate-400 rounded-full px-4 flex items-center gap-2 overflow-hidden'
                  >
                    <span className='font-emoji'>{handleUndefined<string, string>(zone?.countryCode, getFlagEmoji)}</span>
                    <span className='whitespace-nowrap'>{zone?.countryName}</span>
                    <span className='absolute opacity-0 group-hover:opacity-100 transition-opacity h-full w-full left-0 right-0 flex items-center justify-center text-red-700 bg-[#fffa]'>
                      <Remove />
                    </span>
                  </button>
                )
              })}
            </div>
            <div className='flex justify-center mt-8'>
              <div className='relative w-1/3 h-80 border border-slate-500 rounded-lg px-14 py-8 text-xl leading-7'>
                <div ref={resultRef} className='h-full'>
                  {
                    (resultData.length > 0)
                      ? resultData.map((res, index) => (
                        <ResultComponent key={index} emoji={res.emojis} hour={res.hour} />
                      ))
                      : <div className='w-full h-full grid place-items-center'><p className='text-slate-500 '>Add a timezone to start</p></div>
                  }
                </div>
                <div className='absolute top-4 right-4'>
                  <button
                    className='w-10 aspect-square rounded-md border border-slate-500 grid place-items-center'
                    onClick={() => {
                      const content = resultRef.current?.textContent?.split(' ').join('\n')
                      if (typeof content === 'string') navigator.clipboard.writeText(content)
                    }}
                  >
                    <Clipboard />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
