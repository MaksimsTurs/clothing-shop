export default function formatDate(date: string, withCount?: boolean) {
  const currDate = new Date(date)
  const currTimeStamp = Date.now()
  const wasTimpeStamp = Date.parse(date)

  const difference = currTimeStamp - wasTimpeStamp

  const differenceDays = Math.ceil(difference / (1000 * 60 * 60 * 24));

  const wasDate = String(currDate).split(' ').slice(0, 5)

  if(withCount) return `${wasDate[2]} ${wasDate[1]} ${wasDate[3]} ${wasDate[0]} (${differenceDays} days ago!)`
  
  return `${wasDate[2]} ${wasDate[1]} ${wasDate[3]} ${wasDate[0]}`
}