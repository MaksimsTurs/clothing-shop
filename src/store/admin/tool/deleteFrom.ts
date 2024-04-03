//Remove item by value of key or by value
export default function deleteFrom<T>(filter: Partial<T> | string, from?: any[]): T[] | undefined {
  if(!from) return undefined
  
  if(typeof from[0] === 'string') return deleteString<T>(filter as string, from)
  if(typeof from[0] === 'object') return deleteObject<T>(filter as Partial<T>, from)
  return undefined
}

function deleteObject<T>(filter: Partial<T>, from: any[]): T[] {
  let newArray: T[] = []	  
  let filterCache: [string, unknown][] | undefined = undefined

  for(let index = 0; index < from.length; index++) {
    if(!filterCache && from.length > 2) {
      filterCache = Object.entries(filter)
      for(let [key, value] of filterCache) if(from[index][key] !== value) newArray = [...newArray, from[index]]
    } else if(filterCache) {
      for(let [key, value] of filterCache) if(from[index][key] !== value) newArray = [...newArray, from[index]]
    } else {
      for(let [key, value] of Object.entries(filter)) if(from[index][key] !== value) newArray = [...newArray, from[index]]
    }
  }
  return newArray
}

function deleteString<T>(str: string, from: string[]): T[] {
  let newArray: T[] = []
  
  for(let index in from) if(str.trim().toLowerCase() !== from[index].trim().toLowerCase()) [...newArray, from[index]]
  return newArray
}