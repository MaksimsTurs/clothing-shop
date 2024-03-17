import type { StaticImageData } from "next/image"

export type DropdownListProps = { data: ListLink[], listTitle: string }
export type ListLink = { icon?: StaticImageData, text: string, URL?: string, clickHandler?: () => any }