type ParsedCookie = { [key: string]: any }

const cookies = {
  getParsedCookie: function(): ParsedCookie {
    if(!document.cookie) return {}
    return Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')))
  },
  getCookie: function(key: string): any {
    return this.getParsedCookie()[key]
  },
  getAllCookie: function(): ParsedCookie {
    return this.getParsedCookie()
  },
  updateCookie: function(key: string, newValue: string): void {
    const docCookie: ParsedCookie = this.getAllCookie()

    docCookie[key] = newValue
    
    for(let [key, value] of Object.entries(docCookie)) document.cookie = `${key}=${value};path=/`
  }
}

export default cookies