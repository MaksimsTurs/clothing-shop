import { RefObject } from "react";

type Refs = {
  closeButtRef: RefObject<HTMLButtonElement>
  continerRef: RefObject<HTMLElement>
}

export default function outsideClickHandler(target: any, currState: boolean, refs: Refs) {
  const { closeButtRef, continerRef } = refs

  if(continerRef.current?.contains(target)) return true
  if(!continerRef.current?.contains(target)) return false
  if(target === closeButtRef.current) return true
  return false
}