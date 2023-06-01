import moment from 'moment'

export function getFlagEmoji (countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export function getFormatedHour () {
  const hour = new Date().getHours()
  return `${hour}:00`
}

export function formatTime (time: number) {
  const parseTime = String(time)
  if (parseTime.length === 1) return '0' + parseTime
  return time
}

export const convertTimeZone = (selectedHour: string, fromUTMOffset: number) => {
  const hourSelected = moment(selectedHour, 'HH:mm')
  const hourDestiny = hourSelected.clone().utcOffset(fromUTMOffset / 60)
  const hourSelectedDayOfWeek = hourSelected.day()
  const hourDestinyDayOfWeek = hourDestiny.day()

  // const isSameDay = (hourSelectedDayOfWeek === hourDestinyDayOfWeek)
  const destinyIsDayAfter = (hourSelectedDayOfWeek < hourDestinyDayOfWeek || (hourSelectedDayOfWeek === 6 && hourDestinyDayOfWeek === 0))
  const destinyIsDayBefore = (hourSelectedDayOfWeek > hourDestinyDayOfWeek || (hourSelectedDayOfWeek === 0 && hourDestinyDayOfWeek === 6))

  const hours = formatTime(hourDestiny.hours())
  const minutes = formatTime(hourDestiny.minutes())
  if (destinyIsDayAfter) return `${hours}:${minutes} - next day`
  if (destinyIsDayBefore) return `${hours}:${minutes} - day before`
  return `${hours}:${minutes}`
}

export function handleUndefined <type, returnType = void> (value: type | undefined, fallback: (value: type) => returnType) {
  if (value !== undefined) return fallback(value)
}

export function getTimezoneTime ({
  date,
  countryCode,
  timeZone,
  hourCycle
}: {
  date: Date
  countryCode: string
  timeZone: string
  hourCycle: 'h12' | 'h11' | 'h23' | 'h24'
}) {
  return date.toLocaleString(`en-${countryCode}`, { timeZone, hourCycle })
}
