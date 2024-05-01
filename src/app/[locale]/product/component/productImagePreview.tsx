'use client'

import scss from '../scss/productImagePreview.module.scss'

import type { ProductImagePreviewProps } from '../page.type'
import type { StaticImageData } from 'next/image'

import { useState } from 'react'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

export default function ProductImagePreview({ images }: ProductImagePreviewProps) {
  const [currentIMG, setCurrentIMG] = useState<{src: string | StaticImageData, index: number}>({ index: 0, src: images[0] })

  return(
    <aside className={scss.image_preview_container}>
      <div className={scss.image_preview_images}>
        {images.map((image, index) => (
          <ExtendedIMG 
            key={index} 
            className={currentIMG.index === index ? scss.image_active : undefined} 
            onClick={() => setCurrentIMG({ index, src: image })} 
            src={image} 
            width={100} 
            height={100} 
            quality={100}
            alt={`Slide ${index + 1}`} />
          ))}
      </div>
      <ExtendedIMG className={scss.image_preview_current_img} quality={100} src={currentIMG.src} width={300} height={300} alt='Current slide'/>
    </aside>
  )
}