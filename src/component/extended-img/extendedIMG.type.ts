import type { StaticImageData } from "next/image"
import type { CSSProperties, MouseEventHandler } from "react"

export type ExtendedIMGProps = { 
  alt: string, 
  src?: string | StaticImageData, 
  width?: number, 
  height?: number, 
  className?: string, 
  style?: CSSProperties,
  quality?: number 
  onClick?: MouseEventHandler<HTMLElement> 
  onMouseEnter?: MouseEventHandler<HTMLElement> 
  onMouseLeave?: MouseEventHandler<HTMLElement> 
}