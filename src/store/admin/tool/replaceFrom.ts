export default function replaceFrom<T>(filter: Partial<T>, from: any[], newItem: any): T[] {
  let newArray: T[] = []

  for(let index: number = 0; index < from.length; index++) {
    for(let [key, value] of Object.entries(filter)) if(from[index][key] === value) newArray = [...newArray, newItem]
    else newArray = [...newArray, from[index]]
  }

  return newArray
}