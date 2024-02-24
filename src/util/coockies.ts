const cookies = {
  parseCookie: function() {
    return Object.fromEntries(document.cookie.split(';').map(cookie => cookie.trim().split('=')))
  },
  getCookies: function(key: string) {
    return this.parseCookie()[key]
  },
  updateCookie: function(key: string) {}
}

export default cookies