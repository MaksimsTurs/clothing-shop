type IsIncludeInsertProps = {
  includeOption: IncludeOption
  newPropOption: NewPropOption
}

type IncludeOption = {
  inclArray: string[]
  inclKey: string
}

type NewPropOption = {
  newPropKey: string
  newPropName: string
}

type InsertProp = {
  newPropKeys: string[]
  newPropValue: any[]
}

export function isInclude(inclArray: string[], inclKey: string): boolean {
  return inclArray.includes(inclKey)
}

export function isIncludeInsertProp(option: IsIncludeInsertProps, copyFrom: any[]) {
  let newArray: any[] = []
  const { includeOption: { inclArray, inclKey }, newPropOption: { newPropKey, newPropName } } = option

  for(let index: number = 0; index < copyFrom.length; index++) {
    if(isInclude(inclArray, copyFrom[index][inclKey])) newArray = [...newArray, {...copyFrom[index], [newPropName]: copyFrom[index][newPropKey] }]
  }

  return newArray
}

export function replaceWhenInclude(includeProp: IncludeOption, replaceFrom: any[], newElem: any) {
  let newArray: any[] = []
  const { inclArray, inclKey } = includeProp

  for(let index: number = 0; index < replaceFrom.length; index++) {
    if(isInclude(inclArray, replaceFrom[index][inclKey]) && newElem[inclKey] === replaceFrom[index][inclKey]) {
      newArray = [...newArray, newElem]
    } else {
      newArray = [...newArray, newElem[index]]
    }
  }

  return newArray
}

export function replaceByCondition(condKey: string, replaceFrom: any[], newElem: any) {
  let newArray: any[] = []

  for(let index: number = 0; index < replaceFrom.length; index++) {
    if(replaceFrom[index][condKey] === newElem[condKey]) {
      newArray = [...newArray, newElem]
    } else {
      newArray = [...newArray, replaceFrom[index]]
    }
  }

  return newArray
}