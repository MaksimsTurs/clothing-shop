type IncludeOption<T> = { inclArray: string[], inclKey: keyof T }

export function isInclude(inclArray: string[], inclKey: string): boolean {
  return inclArray.includes(inclKey)
}

export function insertWhenInclude<T>(insertFrom: any[], includeOption: IncludeOption<T>): T[] {
  let newArray: T[] = []

  const { inclArray, inclKey } = includeOption

  for(let index: number = 0; index < insertFrom.length; index++) {
    if(isInclude(inclArray, insertFrom[index][inclKey])) newArray = [...newArray, insertFrom[index]]
  }

  return newArray
}

export function replaceByKey<T>(key: keyof T, replaceFrom: any[], newElem: T): T[] {
  let newArray: T[] = []

  for(let index: number = 0; index < replaceFrom.length; index++) {
    if(replaceFrom[index][key] === newElem[key]) {
      newArray = [...newArray, newElem]
    } else {
      newArray = [...newArray, replaceFrom[index]]
    }
  }

  return newArray
}