type DataUpdate<T> = { $push?: Partial<T> } & Partial<T>
type DataFilter<T> = { $in?: { [key: string]: any[] } } & Partial<T>

export default function update<T>(filter: DataFilter<T>, update: DataUpdate<T>, array: any[]) {
  let updated: any[] = []

  const { $push, ..._update } = update
  const { $in, ..._filter } = filter

  const toPush: [string, any][] = Object.entries($push || {})
  const toIn: [string, any[]][] = Object.entries($in || {})
  const toFilter: [string, any][] = Object.entries(_filter)

  for(let index: number = 0; index < array.length; index++) {
    let toUpdate: T = array[index]
    
    if($in) {
      for(let [key, value] of toIn) {
        if(valueByKeyIsArray(toUpdate[key as keyof T])) {
          //This code will be called when key is equal to "productsID" (for example), because in Category/Action "productsID" is a array of stirngs 
          if((toUpdate[key as keyof T] as any[]).includes(value)) updated.push({...toUpdate, ..._update })
          else updated.push(toUpdate)
        } else {
          //This code will be called when "_id" (for example) included in array that was be passed as param  
          if(value.includes(toUpdate[key as keyof T])) updated.push({...toUpdate, ..._update })
          else updated.push(toUpdate)  
        }
      }
    } else {
      for(let [key, value] of toFilter) {
        if($push && toUpdate[key as keyof T] === value) {
          for(let [pushKey, pushValue] of toPush) {
            updated.push({...toUpdate, [pushKey]: [...(toUpdate[pushKey as keyof T] as any[]), ...pushValue]  })
          }
        } else if(toUpdate[key as keyof T] === value) updated.push({...toUpdate, ..._update })
        else updated.push(toUpdate)
      }
    }
  }

  return updated
}

function valueByKeyIsArray(value: any) {
  return Array.isArray(value)
}

function isObjectArray(array: any): boolean {
  return Array.isArray(array) && typeof array[0] === 'object'
}