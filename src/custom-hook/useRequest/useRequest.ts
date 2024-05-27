import { useEffect, useState } from "react"

import type { RequestState, UseRequestParams } from "./useRequesttype"

import Request from "./request"

export default function useRequest<T>(requestOption: UseRequestParams) {
  const [fetchState, setFetchState] = useState<RequestState<T>>({ error: undefined, data: undefined, isPending: false })

  useEffect(() => {
    if(Array.isArray(requestOption.fetchOnNotEmpty) &&  requestOption.fetchOnNotEmpty.length === 0) {
      return setFetchState({ isPending: false, data: undefined, error: undefined })
    }

    if(typeof requestOption.fetchOnNotEmpty === 'string' && requestOption.fetchOnNotEmpty.length === 0) {
      return setFetchState({ isPending: false, data: undefined, error: undefined })
    }
    
    setFetchState((prev) => ({...prev, isPending: true }))
    Request.fetch(requestOption)
      .then(data => setFetchState({ isPending: false, error: undefined, data }))
      .catch(error => setFetchState({ isPending: false, data: undefined, error }))
  }, [requestOption.key])

  const retry = (): void => {
    setFetchState((prev) => ({...prev, isPending: true }))
    Request.fetch(requestOption)
      .then(data => setFetchState({ isPending: false, error: undefined, data }))
      .catch(error => setFetchState({ isPending: false, data: undefined, error }))
  }

  return {...fetchState, retry }
}