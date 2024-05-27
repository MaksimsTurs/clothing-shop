import { type RefObject, useEffect, useState } from "react";

export default function useModal(ref: RefObject<Element>, clickRef?: RefObject<Element>) {
  const [isShowed, setIsShowed] = useState<boolean>(false)

  useEffect(() => {
    const changeState = (event: any) => {
      if(clickRef?.current && event.target === clickRef.current) setIsShowed(true)
      else if(ref.current && ref.current.contains(event.target)) setIsShowed(true)
      else setIsShowed(false)
    }

    document.addEventListener('click', changeState)

    return () => {
      document.removeEventListener('click', changeState)
    }
  }, [])

  return isShowed
}