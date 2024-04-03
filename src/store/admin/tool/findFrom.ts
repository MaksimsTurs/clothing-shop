export default function findFrom<T>(filter: Partial<T> | string, from?: any[]): T | string | undefined {
  if(!from) return undefined

  if(typeof filter === 'object') return findObject<T>(filter as Partial<T>, from)
  if(typeof filter === 'string') return findString(filter as string, from)
}

function findObject<T>(filter: Partial<T>, from: any[]): T | undefined {
  for(let index = 0; index < from.length; index++) {
    for(let [key, value] of Object.entries(filter)) if(from[index][key] === value) return from[index] as T
  }
}

function findString(filter: string, from: any[]): string | undefined {
  for(let index = 0; index < from.length; index++) if(filter === from[index]) return from[index]
}