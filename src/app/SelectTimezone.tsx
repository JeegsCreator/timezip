import { useState } from 'react'
import Popup from 'reactjs-popup'
import { getFlagEmoji } from './utils'
import { useSelectedTimezones } from '@/store/useStore'
import { Timezone } from '@/types/timezone'

const TriggerButton = () => {
  return (
    <button className='border border-slate-400 rounded-full px-4 py-1 h-10'>Add a timezone +</button>
  )
}

const SelectTimezone = ({ data }: { data: Timezone | undefined }) => {
  const { addTimezone } = useSelectedTimezones()
  const [inputValue, setInputValue] = useState('')
  const searchedData = data?.zones.filter(zone => {
    const normalizedInput = inputValue.toLowerCase().trim()

    return (zone.countryName.toLowerCase().includes(normalizedInput) || zone.zoneName.toLowerCase().includes(normalizedInput))
  })

  return (
    <Popup
      trigger={TriggerButton}
      position='right center'
      offsetX={20}
      contentStyle={{
        width: '18rem',
        height: '500px'
      }}
    >
      <div className='bg-white border border-slate-400 rounded-lg h-full grid grid-rows-popup'>
        <div className='border-b border-slate-400 h-10'>
          <input
            type='text'
            placeholder='Search timezone...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full h-full px-4 py-2 focus-visible:outline-slate-400 rounded-tr-lg rounded-tl-lg'
          />
        </div>
        <div className='h-full overflow-y-auto overflow-x-hidden'>
          {searchedData?.map((zone) => (
            <button
              key={zone.zoneName}
              onClick={() => { addTimezone(zone.zoneName) }}
              className='border-b border-slate-400 w-full px-4 py-2 flex justify-between items-center'
            >
              <div className='text-left'>
                <p>{zone.countryName}</p>
                <p className='text-sm text-slate-500'>{zone.zoneName}</p>
              </div>
              <p className='font-emoji text-2xl'>{getFlagEmoji(zone.countryCode)}</p>
            </button>
          ))}
        </div>
      </div>
    </Popup>
  )
}

export default SelectTimezone
