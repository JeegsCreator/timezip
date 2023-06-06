import { useState } from 'react'
import Popup from 'reactjs-popup'
import { getFlagEmoji } from '@/app/utils'
import { useSelectedTimezones } from '@/store/useStore'
import { Country } from '@/types/timezone'
import { useMediaQuery } from 'react-responsive'
import { Close } from './icons'
import SelectTimezoneOption from '@/components/SelectTimezoneOption'
import { PlusOutlined } from '@ant-design/icons'

const TriggerButtonMobile = ({ onclick }: { onclick: () => void }) => {
  const { selectedTimezones } = useSelectedTimezones()

  if (selectedTimezones.length > 0) return (<button onClick={onclick} className='border border-slate-400 rounded-full h-8 aspect-square grid place-items-center text-xs'><PlusOutlined style={{ fontSize: '0.75rem' }} /></button>)

  return (
    <button onClick={onclick} className='border border-slate-400 rounded-full px-4 py-1 h-8 flex gap-1 items-center'>Add a timezone <PlusOutlined style={{ fontSize: '0.75rem' }} /></button>
  )
}

const TriggerButton = () => {
  const { selectedTimezones } = useSelectedTimezones()

  if (selectedTimezones.length > 0) return (<button className='border border-slate-400 rounded-full h-8 aspect-square grid place-items-center text-xs'><PlusOutlined style={{ fontSize: '0.75rem' }} /></button>)

  return (
    <button className='border border-slate-400 rounded-full px-4 py-1 h-8 flex gap-1 items-center'>Add a timezone <PlusOutlined style={{ fontSize: '0.75rem' }} /></button>
  )
}

const SelectTimezone = ({ data }: { data: Country[] | undefined }) => {
  const { addTimezone } = useSelectedTimezones()
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useMediaQuery({
    query: '(max-width: 1024px)'
  })

  const searchedData = (() => {
    const searchValue = inputValue.toLowerCase().trim()

    return data?.filter((country) => (
      country.countryName.toLowerCase().includes(searchValue) || country.Timezone.some(z => (z.fullName.toLowerCase().includes(searchValue) || z.zoneNames.some(n => n.toLowerCase().replaceAll('_', ' ').includes(searchValue))))
    ))
  })()

  if (isMobile) {
    return (
      <>
        <TriggerButtonMobile onclick={() => setIsOpen(true)} />
        <Popup
          position='right center'
          offsetX={20}
          open={isOpen}
          contentStyle={{
            padding: '12px',
            height: '100%',
            width: '100%'
          }}
          overlayStyle={{ backgroundColor: '#1111' }}
          modal
        >
          <div className='bg-white border border-slate-400 rounded-lg h-full grid grid-rows-popup'>
            <div className='border-b border-slate-400 h-10 relative'>
              <input
                type='text'
                placeholder='Search timezone...'
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='w-full h-full px-4 py-2 focus-visible:outline-slate-400 rounded-tr-lg rounded-tl-lg'
              />
              <button onClick={() => setIsOpen(false)} className='absolute h-10 w-16 text-slate-600 text-2xl top-0 right-0 font-bold border-l border-slate-400 grid place-items-center lg:opacity-0 lg:hidden'><Close /></button>
            </div>
            <div className='h-full overflow-y-auto overflow-x-hidden'>
              {searchedData?.map((country) => {
                if (country.Timezone.length > 1) {
                  return (
                    <SelectTimezoneOption key={country.id} country={country} addTimezone={addTimezone} />
                  )
                } else {
                  return (
                    <button
                      key={country.id}
                      onClick={() => { addTimezone({ country, zoneId: country.Timezone[0].id }) }}
                      className='border-b border-slate-400 w-full px-4 py-2 flex gap-4 items-center'
                    >
                      <p className='font-emoji text-2xl'>{getFlagEmoji(country.countryCode)}</p>
                      <div className='text-left'>
                        <p>{country.countryName}</p>
                      </div>
                    </button>
                  )
                }
              })}
            </div>
          </div>
        </Popup>
      </>
    )
  }

  return (
    <Popup
      trigger={TriggerButton}
      position='right center'
      offsetX={20}
      onClose={() => {
        setInputValue('')
      }}
      contentStyle={{
        width: '18rem',
        height: '500px'
      }}
    >
      <div className='bg-white border border-slate-400 rounded-lg h-full grid grid-rows-popup'>
        <div className='border-b border-slate-400 h-10 relative'>
          <input
            type='text'
            placeholder='Search timezone...'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className='w-full h-full px-4 py-2 focus-visible:outline-slate-400 rounded-tr-lg rounded-tl-lg'
          />
          <button onClick={() => setIsOpen(false)} className='absolute h-10 w-16 text-slate-600 text-2xl top-0 right-0 font-bold border-l border-slate-400 grid place-items-center lg:opacity-0 lg:hidden'><Close /></button>
        </div>
        <div className='h-full overflow-y-auto overflow-x-hidden'>
          {searchedData?.map((country) => {
            if (country.Timezone.length > 1) {
              return (
                <SelectTimezoneOption key={country.id} country={country} addTimezone={addTimezone} />
              )
            } else {
              return (
                <button
                  key={country.id}
                  onClick={() => { addTimezone({ country, zoneId: country.Timezone[0].id }) }}
                  className='border-b border-slate-400 w-full px-4 py-2 flex gap-4 items-center'
                >
                  <p className='font-emoji text-2xl'>{getFlagEmoji(country.countryCode)}</p>
                  <div className='text-left'>
                    <p>{country.countryName}</p>
                  </div>
                </button>
              )
            }
          })}
        </div>
      </div>
    </Popup>
  )
}

export default SelectTimezone
