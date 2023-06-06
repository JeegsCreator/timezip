import { getFlagEmoji } from '@/app/utils'
import { useSelectedHour } from '@/store/useStore'
import { ResultData } from '@/types/timezone'
import dayjs from 'dayjs'
import parse from 'html-react-parser'

const TemplateResult = ({ info, template }: { info: ResultData, template: string }) => {
  const { timeFormat, selectedHour } = useSelectedHour()

  const templateCommands = {
    emoji: (info: ResultData, params: string[]) => `<span className='font-emoji'>${info.timezones.map(t => getFlagEmoji(t.countryCode)).join('')}</span>`,
    time: (info: ResultData, params: string[]) => {
      let format = params[0]
      if (timeFormat) {
        format = format.replace('H', 'h')
      } else {
        format = format.replace('h', 'H').replace('a', '').replace('A', '')
      }

      const selectedTime = dayjs(selectedHour)
      const isSameDay = selectedTime.day() === info.time.day()

      if (isSameDay) {
        return info.time.format(format)
      } else {
        let dayDelay: string
        console.log(selectedTime.day(), info.time.day())
        if (((selectedTime.day() !== 6 || info.time.day() === 5) && (selectedTime.day() > info.time.day())) || ((selectedTime.day() === 0) && (info.time.day() === 6))) {
          dayDelay = '(Previous day)'
        } else if ((selectedTime.day() < info.time.day()) || ((selectedTime.day() === 6) && (info.time.day() === 0))) {
          dayDelay = '(Next day)'
        } else {
          dayDelay = 'else'
        }

        return `${dayDelay} ${info.time.format(format)}`
      }
    },
    default: (info: ResultData, params: string[]) => ''
  }

  type Commands = (keyof typeof templateCommands) | 'default'

  const changes = template.split('@(').map((s, i) => {
    const res = s.split(')')
    const [command, ...params] = res[0].split('-')
    // @ts-expect-error
    const commandVerified: Commands = Object.keys(templateCommands).includes(command) ? command : 'default'
    res[0] = (commandVerified === 'default') ? ((i === 0) ? s : `@${s}`) : templateCommands[commandVerified](info, params)

    return res.join('')
  })

  return (<p className='whitespace-nowrap'>{parse(changes.join('') + '&nbsp')}</p>)
}

export default TemplateResult
