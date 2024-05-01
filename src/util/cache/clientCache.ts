import type { ClientCache } from "./clientCache.type";

export default function createCache(): ClientCache {
  return ({
    _storage: {},
    delete: function(key: any) {
      delete this._storage[key]
    },
    get: function(key: any) {
      const isObject = this._isObject(key)

      if(isObject) return JSON.parse(this._storage[String(key)])
      else if(typeof isObject === 'undefined') return undefined
      else return this._storage[key]
    },
    set: function(key: string, prop: any) {
      this._storage[String(key)] = JSON.stringify(prop).trim()
    },
    _isObject: function(key: string) {
      const cache = (this._storage[key] as string | undefined)

      if(!cache) return undefined
      else if(cache[0] === '{' && cache[cache.length - 1] === '}') return true
      else return false
    }
  })
}