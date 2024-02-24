type ParsedCookie = { [key: string]: string }

const cookies = {
  getParsedCookie: function(): ParsedCookie {
    if(!document.cookie) return {}
    return Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')))
  },
  getCookies: function(key: string) {
    return this.getParsedCookie()[key]
  },
  getAllCookie: function() {
    return this.getParsedCookie()
  },
  updateCookie: function(key: string, newValue: string) {
    const docCookie = this.getAllCookie()

    docCookie[key] = newValue
    
    for(let [key, value] of Object.entries(docCookie)) document.cookie = `${key}=${value};path=/`
  }
}

export default cookies