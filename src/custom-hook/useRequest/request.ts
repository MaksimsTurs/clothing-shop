import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { UseRequestParams, RequestConstructor } from "./useRequesttype";

const Request: RequestConstructor = {
  cache: new Map<string, any>(),
  fetch: async function(params: UseRequestParams) {
    try {
      let response = this.cache.get(params.key || '')
      if(response) return response
      else if(params.URL && !params.body) {
        response = await fetcher.get(params.URL)
        if(params.key) this.cache.set(params.key, response)
        return response
      } else {
        response = await fetcher.post(params.URL!, undefined, params.body!)
        if(params.key) this.cache.set(params.key, response)
        return response
      }
    } catch(error) {
      throw new ResponseError((error as ResponseError).message)
    }
  }
}

export default Request