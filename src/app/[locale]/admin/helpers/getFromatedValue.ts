import formatDate from "@/lib/formatDate/formatDate"

export default function getFormatedValue(value: any, key?: string) {
  switch(key) {
    case 'expiredDate':
      return formatDate(value)
    case 'updatedAt':
      return formatDate(value, true)
    case 'createdAt':
      return formatDate(value, true)
    case 'precent':
      return `${((value as number) * 100).toFixed(2)}%`
    case 'price':
      return `${value}$`
  }
  
  if(key === 'stock' || key === 'rating') return `${value}`

  if(typeof value === 'string' && !Number.isInteger(value)) return value
  
  if(value === undefined || value === null) return false

  if(value < 10) return `0${value}`
  
  return value
}