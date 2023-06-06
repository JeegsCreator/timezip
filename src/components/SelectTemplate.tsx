import Popup from 'reactjs-popup'
import TemplateResult from './TemplateResult'
import { ResultData } from '@/types/timezone'
import dayjs from 'dayjs'
import { useTemplate, useSelectedHour } from '@/store/useStore'
import { useState } from 'react'

const templates = [
  '@(emoji) @(time-H:mmA)',
  '@(time-Ha)H @(emoji)',
  '@(emoji): @(time-hA)',
  '@(time-H:mm A) @(emoji)'
]

const SelectTemplate = () => {
  const { template, setTemplate } = useTemplate()
  const { selectedHour } = useSelectedHour()
  const [isOpen, setIsOpen] = useState(false)

  const info: ResultData = { time: dayjs(selectedHour), timezones: [{ countryCode: 'CO', countryId: 79, countryName: 'Colombia', timezone: { id: 141, initial: 'CO', fullName: 'Colombia', offset: -5, summerOffset: null, capital: true, zoneNames: ['America/Bogota'] } }] }

  const Trigger = () => (
    <button onClick={() => setIsOpen(true)} className='relative cursor-pointer w-64 md:w-80 rounded-md border border-slate-400 h-10 flex items-center'>
      <span className='absolute -top-2 left-2 bg-white px-2 text-xs text-slate-500'>Format</span>
      <p className='px-4 flex justify-between items-center gap-2 w-full'>
        <TemplateResult
          info={info}
          template={template}
        />
        <p className='text-sm text-slate-400 whitespace-nowrap text-ellipsis overflow-x-hidden w-full text-right'>{template}</p>
      </p>
    </button>
  )

  return (
    <Popup
      trigger={Trigger}
      nested
      position='top center'
      open={isOpen}
      contentStyle={{
        width: '20rem'
      }}
    >
      <div className='bg-white w-full rounded-md border border-slate-400'>
        {templates.map((temp, i) => (
          <button
            key={i}
            className='flex justify-between h-10 items-center w-full px-4 border-b border-slate-400 gap-2'
            onClick={() => {
              setTemplate(temp)
              setIsOpen(false)
            }}
          >
            <TemplateResult
              info={info}
              template={temp}
            />
            <p className='text-sm text-slate-400 whitespace-nowrap text-ellipsis overflow-x-hidden w-full text-right'>{temp}</p>
          </button>
        ))}
        {/* <Popup
          trigger={<button className='h-10 px-4 flex items-center w-full justify-between'>Personalize <EditOutlined /></button>}
          modal
          overlayStyle={{
            backgroundColor: '#11111111'
          }}
          contentStyle={{
            width: '80vw',
            height: '80vh'
          }}
        >
          <div className='w-full h-full bg-white shadow-lg border border-slate-500 rounded-lg grid grid-cols-2'>
            <div className='p-4 flex justify-center items-center flex-col'>
              <Input placeholder='Write your custom format' />
              <Switch
                checkedChildren='12H'
                unCheckedChildren='24H'
                className='bg-stone-400'
              />
            </div>
            <div className='p-2 bg-red-500 max-h-full overflow-y-auto'>info</div>
          </div>
        </Popup> */}
      </div>
    </Popup>
  )
}

export default SelectTemplate
