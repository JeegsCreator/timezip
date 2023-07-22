// import Link from 'next/link'

// const page = () => {
//   return (
//     <main className='grid grid-cols-2 gap-8'>
//       <section className='flex flex-col justify-center items-end'>
//         <h1 className='font-extrabold text-5xl'>Show the world <br /> when find you.</h1>
//         <p>Let everyone know when your event is. Choose countries to target effortlessly and customize dates with ease. All with TimeZip!</p>
//         <div>
//           <Link href='./create'>Go to the app</Link>
//         </div>
//       </section>
//     </main>
//   )
// }

// export default page

'use client'

import { useSelectedHour, useSelectedTimezones } from '@/store/useStore'
import SelectTimezone from '@/components/SelectTimezone'
import { getFlagEmoji, handleUndefined } from '@/app/utils'
import { useEffect, useState } from 'react'
import { fetchTimezoneList } from '@/hooks/useTimezone'
import { Remove } from '@/components/icons'
import { DatePicker, TimePicker, Switch } from 'antd'
import dayjs from 'dayjs'
import { Country } from '@/types/timezone'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import Result from '@/components/Result'
import SelectTemplate from '@/components/SelectTemplate'
import Analytics from '@/components/Analytics'

export default function Home() {
  const { selectedTimezones, removeTimezone } = useSelectedTimezones()
  const {
    selectedHour,
    setSelectedHour,
    dateValue,
    setDateValue,
    timeValue,
    setTimeValue,
    timeFormat,
    setTimeFormat,
    usingDate,
    setUsingDate,
  } = useSelectedHour()
  const [data, setData] = useState<Country[]>([])

  dayjs.extend(utc)
  dayjs.extend(timezone)

  useEffect(() => {
    // console.log(value, selectedHour)
    // if (value) {
    //   if (selectedHour.length > 0) {
    //     const newTime = dayjs(selectedHour).hour(value.hour()).minute(value.minute())
    //     setSelectedHour(newTime.format())
    //   } else {
    //     setSelectedHour(value.format())
    //   }
    // } else {
    //   setSelectedHour('')
    // }
    let selected
    // if (selectedHour.length > 0) {
    if (usingDate) {
      const time = dayjs(timeValue)
      const date = dayjs(dateValue)
      selected =
        time.isValid() && date.isValid()
          ? date.hour(time.hour()).minute(time.minute()).format()
          : ''
    } else {
      const time = dayjs(timeValue)
      selected = time.isValid() ? dayjs(timeValue).format() : ''
    }
    setSelectedHour(selected)
    // }
    // else {
    //   setSelectedHour('')
    // }
  }, [timeValue, dateValue, usingDate, setSelectedHour, selectedHour.length])

  useEffect(() => {
    const call = async () => {
      const res = await fetchTimezoneList()
      setData(res)
    }

    call()
  }, [])

  return (
    <main className='h-full grid place-items-center w-screen lg:w-full py-4'>
      <Analytics />
      <div className='w-screen lg:w-full'>
        <section className='lg:mb-6 flex items-center flex-col'>
          <h1 className='text-5xl lg:text-6xl font-extrabold text-center mb-6'>
            TimeZip
          </h1>
        </section>
        <section>
          <div className='flex justify-center gap-4'>
            <TimePicker
              value={dayjs(timeValue).isValid() ? dayjs(timeValue) : undefined}
              size='large'
              format={timeFormat ? 'h:mma' : 'H:mm'}
              onChange={(value) => {
                const res = value ? value.format() : ''
                setTimeValue(res)
              }}
            />
            <div className='relative'>
              <DatePicker
                value={
                  dayjs(dateValue).isValid() ? dayjs(dateValue) : undefined
                }
                size='large'
                disabled={!usingDate}
                onChange={(value) => setDateValue(value ? value.format() : '')}
              />
              <div className='absolute left-0 -bottom-5 flex items-center gap-1'>
                <Switch
                  checked={usingDate}
                  onChange={(value) => setUsingDate(value)}
                  size='small'
                  className='bg-stone-400'
                />
                <span className='text-xs text-slate-600'>Use date</span>
              </div>
            </div>
          </div>
          <div className='md:px-20 lg:px-64 px-2 flex justify-center flex-wrap gap-2 mb-4 mt-12'>
            {selectedTimezones.map((zone) => {
              const isReduced = selectedTimezones.length > 10
              return (
                <button
                  key={zone.timezone.id}
                  onClick={() => removeTimezone(zone.timezone.id)}
                  className={`relative group h-8 border border-slate-400 rounded-full px-4 flex items-center overflow-hidden ${
                    isReduced ? ' gap-1' : ' gap-2'
                  }`}
                >
                  <span className='font-emoji'>
                    {handleUndefined<string, string>(
                      zone?.countryCode,
                      getFlagEmoji,
                    )}
                  </span>
                  <span className='whitespace-nowrap'>{`${
                    isReduced ? zone.countryCode : zone.countryName
                  } ${!isReduced ? `(${zone.timezone.initial})` : ''}`}</span>
                  <span className='absolute opacity-0 group-hover:opacity-100 transition-opacity h-full w-full left-0 right-0 flex items-center justify-center text-red-700 bg-[#fffa]'>
                    <Remove />
                  </span>
                </button>
              )
            })}
            <SelectTimezone data={data} />
          </div>
          <div className='flex flex-col px-4 items-center gap-4'>
            <Result />
            <div className='flex gap-2 items-center'>
              <SelectTemplate />
              <Switch
                checkedChildren='12H'
                unCheckedChildren='24H'
                className='bg-stone-400'
                checked={timeFormat}
                onChange={(value) => {
                  setTimeFormat(value)
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
