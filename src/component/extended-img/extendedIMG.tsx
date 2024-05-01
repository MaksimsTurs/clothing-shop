import type { ExtendedIMGProps } from "./extendedIMG.type";

import Image from "next/image";

import defaultIMG from './img/default-product-image.webp'

export default function ExtendedIMG({ height, width, className, src, style, alt, quality,  blurURL, onClick, onMouseEnter, onMouseLeave }: ExtendedIMGProps) {
  return <Image 
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave} 
          onClick={onClick}
          alt={alt} 
          src={src ?? defaultIMG} 
          height={height} 
          width={width} 
          className={className} 
          quality={quality}
          style={{...style, objectFit: 'cover'}}
          blurDataURL={blurURL}/>
}