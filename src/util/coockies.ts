type ParsedCookie = { [key: string]: string | undefined }

const cookies = {
  parse: function(): ParsedCookie {
    if(!document.cookie) return {}
    return Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')))
  },
  get: function<T>(key: string): T | undefined {
    const coockieValue = this.parse()[key]
    
    if(!coockieValue) return undefined
    else if(coockieValue.startsWith('{') && coockieValue.endsWith('}')) return JSON.parse(coockieValue)
    else return coockieValue as T
  },
  getMany: function<T>(keys: string[]): T {
    let coockie: ParsedCookie = {}
    const docCookies: ParsedCookie = this.parse()

    for(let index: number = 0; index < keys.length; index++) coockie[keys[index]] = docCookies[keys[index]]

    return coockie as T
  },
  set: function(key: string, newValue: any, expired?: number): void {
    const date = new Date()
    const docCookie: ParsedCookie = this.parse()

    date.setDate(date.getDay() + (expired || 2))

    if(typeof newValue === 'string') {
      docCookie[key] = newValue
      for(let [key, value] of Object.entries(docCookie)) document.cookie = `${key}=${value};path=/;expires=${date.toUTCString()};`
    } else if(typeof newValue === 'object') {
      const updatedCoockies = Object.entries({...docCookie, [key]: JSON.stringify(newValue) })
      for(let [_key, value] of updatedCoockies) document.cookie = `${_key}=${value};path=/;expires=${date.toUTCString()}`
    }
  }
}

export default cookies