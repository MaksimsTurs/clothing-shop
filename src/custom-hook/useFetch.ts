import { useState, useEffect } from "react";

type UseFetchOption = { URL: string, deps?: any | any[], body?: any, headers?: Headers, fetchByRender?: boolean }
type FetchResponse = {}

export default function useFetch<T>(option: UseFetchOption) {
  const [data, setData] = useState<T | undefined>(undefined)
  const [fetchResponse, setFetchResponse] = useState<FetchResponse | undefined>(undefined)
  
  const { URL, body, fetchByRender, headers } = option

  useEffect(() => {
    const fetchData = async () => {

    }

    // if(fetchByRender) fetchByRender()
  })
}