import { useState } from 'react'
import Popup from 'reactjs-popup'
import { getFlagEmoji } from './utils'
import { useSelectedTimezones } from '@/store/useStore'
import { Country } from '@/types/timezone'
// import { useMediaQuery } from 'react-responsive'
import { Close } from './icons'
import SelectTimezoneOption from '@/components/SelectTimezoneOption'

// const TriggerButtonMobile = ({ onclick }: { onclick: () => void }) => {
//   return (
//     <button className='border border-slate-400 rounded-full px-4 py-1 h-10' onClick={onclick}>Add a timezone +</button>
//   )
// }

const TriggerButton = () => {
  return (
    <button className='border border-slate-400 rounded-full px-4 py-1 h-10'>Add a timezone +</button>
  )
}

const SelectTimezone = ({ data }: { data: Country[] | undefined }) => {
  const { addTimezone } = useSelectedTimezones()
  const [inputValue, setInputValue] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  // const isMobile = useMediaQuery({
  //   query: '(max-width: 1024px)'
  // })

  const searchedData = (() => {
    const searchValue = inputValue.toLowerCase().trim()

    return data?.filter((country) => (
      country.countryName.toLowerCase().includes(searchValue) || country.Timezone.some(z => (z.fullName.toLowerCase().includes(searchValue) || z.zoneNames.some(n => n.toLowerCase().replaceAll('_', ' ').includes(searchValue))))
    ))
  })()

  // if (isMobile) {
  //   return (
  //     <>
  //       <TriggerButtonMobile onclick={() => setIsOpen(true)} />
  //       <Popup
  //         position='right center'
  //         offsetX={20}
  //         open={isOpen}
  //         contentStyle={{
  //           padding: '12px',
  //           height: '100%',
  //           width: '100%'
  //         }}
  //         overlayStyle={{ backgroundColor: '#1111' }}
  //         modal
  //         nested
  //       >
  //         <div className='bg-white border border-slate-400 rounded-lg h-full grid grid-rows-popup'>
  //           <div className='border-b border-slate-400 h-10 relative'>
  //             <input
  //               type='text'
  //               placeholder='Search timezone...'
  //               value={inputValue}
  //               onChange={(e) => setInputValue(e.target.value)}
  //               className='w-full h-full px-4 py-2 focus-visible:outline-slate-400 rounded-tr-lg rounded-tl-lg'
  //             />
  //             <button onClick={() => setIsOpen(false)} className='absolute h-10 w-16 text-slate-600 text-2xl top-0 right-0 font-bold border-l border-slate-400 grid place-items-center lg:opacity-0 lg:hidden'><Close /></button>
  //           </div>
  //           <div className='h-full overflow-y-auto overflow-x-hidden'>
  //             {data?.map((country) => (
  //               <button
  //                 key={country.id}
  //                 onClick={() => { addTimezone({ country, zoneId: }) }}
  //                 className='border-b border-slate-400 w-full px-4 py-2 flex justify-between items-center'
  //               >
  //                 <div className='text-left'>
  //                   <p>{country.countryName}</p>
  //                   <p className='text-sm text-slate-500'>{country.countryCode}</p>
  //                 </div>
  //                 <p className='font-emoji text-2xl'>{getFlagEmoji(country.countryCode)}</p>
  //               </button>
  //             ))}
  //           </div>
  //         </div>
  //       </Popup>
  //     </>
  //   )
  // }

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
