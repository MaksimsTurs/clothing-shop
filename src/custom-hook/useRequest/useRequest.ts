import { useEffect, useState } from "react"

import type { RequestState, UseRequestParams } from "./useRequesttype"

import Request from "./request"

const request = {...Request }

export default function useRequest<T>(requestOption: UseRequestParams) {
  const [fetchState, setFetchState] = useState<RequestState<T>>({ error: undefined, data: undefined, isPending: false })

  useEffect(() => {
    setFetchState((prev) => ({...prev, isPending: true }))
    request.fetch(requestOption)
      .then(data => setFetchState({ isPending: false, error: undefined, data }))
      .catch(error => setFetchState({ isPending: false, data: undefined, error }))
  }, [requestOption.key])

  const retry = (): void => {
    setFetchState((prev) => ({...prev, isPending: true }))
    request.fetch(requestOption)
      .then(data => setFetchState({ isPending: false, error: undefined, data }))
      .catch(error => setFetchState({ isPending: false, data: undefined, error }))
  }

  return {...fetchState, retry }
}