import { getFlagEmoji } from '@/app/utils'
import { Country } from '@/types/timezone'
import { CaretRightOutlined } from '@ant-design/icons'
import { useState } from 'react'

const SelectTimezoneOption = ({ country, addTimezone }: {
  country: Country
  addTimezone: ({ country, zoneId }: { country: Country, zoneId: number }) => void }) => {
  const [open, setOpen] = useState(false)

  return (
    <div key={country.id}>
      <button
        className='border-b border-slate-400 w-full px-4 py-2 flex justify-between items-center'
        title={country.countryName}
        onClick={() => {
          setOpen(prev => !prev)
        }}
      >
        <div className='flex gap-2 items-center w-select'>
          <p className='font-emoji text-xl'>{getFlagEmoji(country.countryCode)}</p>
          <p className='text-ellipsis whitespace-nowrap w-full overflow-hidden text-left'>{country.countryName}</p>
        </div>
        <div className='aspect-square h-full flex items-center'>
          <div className={`transition-transform origin-center text-stone-500 ${open ? 'rotate-90' : ''}`}>
            <CaretRightOutlined />
          </div>
        </div>
      </button>
      <div className={`overflow-hidden transition-["height"] ${open ? 'h-auto' : 'h-0'}`}>
        {
          country.Timezone.sort((a, b) => {
            if (a.capital) return -1
            if (b.capital) return 1
            return 0
          }).map(t => {
            const Trigger = () => (
              <button
                onClick={() => addTimezone({ country, zoneId: t.id })}
                className='border-b border-slate-400 w-full pl-6 px-4 py-2 flex justify-between items-center bg-slate-50 text-sm'
              >
                <div className='flex gap-2 items-center'>
                  <span>{`${t.zoneNames[0].split('/').reverse()[0].replaceAll('_', ' ')}`}</span>
                  {t.capital && <span className='px-1 border rounded-full border-green-400 bg-green-100 text-green-800 text-xs'>Capital</span>}
                </div>
                <div className='text-xs text-slate-500 flex flex-col items-end'>
                  <span>{`${t.initial} (UTC${(t.offset >= 0) ? `+${t.offset}` : t.offset})`}</span>
                </div>
              </button>
            )

            return (
              <Trigger key={t.id} />
              // <Popup
              //   key={t.id}
              //   trigger={Trigger}
              //   position='left center'
              //   offsetX={10}
              //   on='hover'
              // >
              //   <div className='bg-white px-8 py-4'>
              //     {t.zoneNames.map((zone, i) => (
              //       <p key={i}>{zone.split('/').reverse()[0].replaceAll('_', ' ')}</p>
              //     ))}
              //   </div>
              // </Popup>
            )
          })
        }
      </div>
    </div>
  )
}

export default SelectTimezoneOption
