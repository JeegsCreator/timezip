import { Clipboard } from '@/components/icons'
import { useSelectedHour, useSelectedTimezones, useTemplate } from '@/store/useStore'
import { ResultData } from '@/types/timezone'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import TemplateResult from './TemplateResult'
import { toast } from 'react-hot-toast'

const Result = () => {
  const [resultData, setResultData] = useState<ResultData[]>([])
  const resultRef = useRef<HTMLDivElement>(null)
  const { selectedHour, usingDate } = useSelectedHour()
  const selectedTimezones = useSelectedTimezones(state => state.selectedTimezones)
  const { template } = useTemplate()

  useEffect(() => {
    // console.log(dayjs.tz.guess())
    const res: ResultData[] = []

    selectedTimezones.forEach(zone => {
      const time = dayjs(selectedHour).tz(zone.timezone.zoneNames[0])
      const isStackable = res.findIndex(r => r.time.format() === time.format())

      if (isStackable === -1) {
        res.push({
          time,
          timezones: [zone]
        })
      } else {
        res[isStackable].timezones.push(zone)
      }
    })
    console.log(res)
    setResultData(res)
    // convertTimeZone(selectedHour, 7200)
  }, [selectedTimezones, selectedHour])

  return (
    <div className='relative w-full lg:w-1/3 border border-slate-500 rounded-lg px-14 py-8 text-xl leading-7'>
      <div ref={resultRef} className='h-full min-h-[150px] flex justify-center flex-col'>
        {/* {resultData.map((r, i) => {
          return (<TemplateResult key={i} info={r} template='@emoji @time-H:mm' />)
        })} */}
        {usingDate && <p className='mb-2'>{dayjs(selectedHour).format('D/MM/YYYY') + '\n'}</p>}
        {(resultData.length > 0)
          ? resultData.map((r, i) => {
            return (<TemplateResult key={i} info={r} template={template} />)
          })
          : <div className='w-full h-full grid place-items-center'><p className='text-slate-500 '>Add a timezone to start</p></div>}
      </div>
      <div className='absolute top-4 right-4'>
        <button
          className='w-10 aspect-square rounded-md border border-slate-500 grid place-items-center'
          onClick={() => {
            const content = resultRef.current?.textContent?.split(' ').join('\n')
            if (typeof content === 'string') navigator.clipboard.writeText(content)
            toast.success('output copied succesfully')
          }}
        >
          <Clipboard />
        </button>
      </div>
    </div>
  )
}

export default Result
