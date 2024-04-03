import type { ExtendedIMGProps } from "./extendedIMG.type";

import defaultIMG from './img/default-product-image.webp'

import Image from "next/image";

export default function ExtendedIMG({ height, width, className, src, style, alt, quality, onClick, onMouseEnter, onMouseLeave }: ExtendedIMGProps) {
  return <Image 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave} 
          onClick={onClick}
          alt={alt} 
          src={src || defaultIMG} 
          height={height} 
          width={width} 
          className={className} 
          style={{...style, objectFit: 'cover'}} 
          quality={quality}/>
}