import type { Filter } from "./too.type"

export default function findMany<T>(filter: Filter<T>, from: any[]): T[] {
  let finded: T[] = []

  const { $in, ..._filter } = filter

  const toFilter = Object.entries(_filter)
  const toIn = Object.entries($in || {})

  for(let index: number = 0; index < from.length; index++) {
    const item = from[index]

    if($in) {
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