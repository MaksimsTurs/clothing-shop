import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number) {
  const [debounceValue, setDebounceValue] = useState<string>(value)

  useEffect(() => {
    const timeOutID = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeOutID)
  }, [value])

  return debounceValue
}