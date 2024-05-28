import type { Filter } from "./dataTool.type"

export default function findMany<T>(filter: Filter<T>, from: any[]): T[] {
  let finded: T[] = []

  const { $in, $regex, ..._filter } = filter

  const toFilter = Object.entries(_filter)
  const toIn = Object.entries($in || {})
  const toRegexp = Object.entries($regex || {})[0]

  for(let index: number = 0; index < from.length; index++) {
    const item = from[index]

    if($regex) {
      const [key, value] = toRegexp
      if(RegExp(value as string, 'i').test(item[key])) finded.push(item)
    } else if($in) {
      for(let [key, strArray] of toIn) {
        if((strArray as any[]).includes(item[key as keyof T])) finded.push(item)
      }
    } else {
      for(let [key, value] of toFilter) {
        if(item[key] === value) finded.push(item)
      }
    }
  }

  return finded
}