import findFrom from "./findFrom"
import replaceFrom from "./replaceFrom"

type DataUpdate<T> = { $push?: Partial<T> } & Partial<T>
type DataFilter<T> = { $in?: Partial<T>[] } & Partial<T>

export default function updateIn<T>(filter: DataFilter<T>, update: DataUpdate<T>, _in: any[]): T[] {
  const { $push, ...otherUpdate } = update

  const pushData: [string, unknown][] = Object.entries($push || {})
  const updateData: [string, unknown][] = Object.entries(otherUpdate)

  let findedItem = findFrom<T>(filter, _in) as T | undefined

  if(!findedItem) throw new Error(`Element with filter ${filter} in ${_in} not found!`)

  //@ts-ignore
  for(let [key, value] of updateData) if(!isObjectArray(findedItem[key])) findedItem[key] = value

  //@ts-ignore
  for(let [key, value] of pushData) findedItem[key] = [...findedItem[key], ...value]
  
  return replaceFrom<T>(filter, _in, findedItem)
}

function isObjectArray(array: any): boolean {
  return Array.isArray(array) && typeof array[0] === 'object'
}