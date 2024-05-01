import type { StaticImageData } from "next/image"
import type { ReactNode } from "react"

export type DropdownListProps = { data: ListLink[], listTitle: string }
export type ListLink = { icon?: StaticImageData | ReactNode, text: string, URL?: string, clickHandler?: any}