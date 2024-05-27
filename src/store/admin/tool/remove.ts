import type { Filter } from "./too.type"

export default function remove<T>(filter: Filter<T> | string, from: any[]): T[] {
  if(typeof from[0] === 'string') return removeString<T>(filter as string, from)
  if(typeof from[0] === 'object') return removeObject<T>(filter as Filter<T>, from)
  return from
}

function removeObject<T>(filter: Filter<T>, from: any[]): T[] {
  let array: T[] = []	  
  let filterCache: [string, any][] | undefined = undefined

  const { $in, ..._filter } = filter

  for(let index: number = 0; index < from.length; index++) {
    const item = from[index]

    if(!filterCache) {
      filterCache = Object.entries(_filter)
      for(let [key, value] of filterCache) {
        if(item[key] !== value) {
          array.push(item)
          break
        }
      }
    } else if(filterCache) {
      for(let [key, value] of filterCache) {
        if(item[key] !== value) {
          array.push(item)
          break
        }
      }
    }
  }

  return array
}

function removeString<T>(str: string, from: string[]): T[] {
  let array: T[] = [] 
  for(let index: number = 0; index < from.length; index++) if(str !== from[index]) array.push(from[index] as T)
  return array
}