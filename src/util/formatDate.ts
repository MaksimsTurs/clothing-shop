const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

const days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
]

export default function formatDate(date?: string, withCount?: boolean): string {
  if(!date) return 'Дата не задана!'

  const dayweakmonth = ['дня', 'неделю', 'месяц']

  const currDate: Date = new Date(date)
  const yetTimestamp: number = Date.now()
  const furtherTimpeStamp: number = Date.parse(date)

  const differenceDays: number = Math.ceil((furtherTimpeStamp - yetTimestamp) / (1000 * 60 * 60 * 24))

  const dayDate = currDate.getDate()
  const dayName = days[currDate.getDay() + 1]
  const monthName = months[currDate.getMonth() + 1]

  return `${dayName} ${dayDate} ${monthName} (через ${differenceDays} ${dayweakmonth[0]})`
}