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
    const expiredIn = ((expired || 1) * 24) * 60 * 60    
    document.cookie = `${key}=${newValue};Max-Age=${expiredIn};SameSite=Strict;Secure;Path=/`
  }
}

export default cookies