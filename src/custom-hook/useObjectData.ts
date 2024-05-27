import { useState } from "react";

export default function useObjectData<T>(init: T) {
  const [objectData, setData] = useState<T>(init)

  const chage = (key: keyof T, value: any): void => setData(prev => ({...prev, [key]: value }))

  const reset = (): void => setData(init)

  return { objectData, chage, reset }
}