'use client'

import scss from '../scss/productImagePreview.module.scss'

import type { ProductImagePreviewProps } from '../product.type'

import { useEffect, useState } from 'react'
import Image from 'next/image'

export default function ProductImagePreview({ images }: ProductImagePreviewProps) {
  const [currentIMG, setCurrentIMG] = useState<{src: string, index: number}>({ index: 0, src: images[0] })

  useEffect(() => {
    setCurrentIMG({ index: 0, src: images[0] })
  }, [images])

  return(
    <aside className={scss.image_preview_container}>
      <div className={scss.image_preview_images}>
        {
          images.map((image, index) => (
            <Image 
              key={index}
              className={currentIMG.index === index ? scss.image_active : undefined}
              onClick={() => setCurrentIMG({ index, src: image })}
              src={image}
              width={85}
              height={85}
              alt={`Product image ${index}`}
            />
          ))
        }
      </div>
      <Image
        className={scss.image_preview_current_img}
        src={currentIMG.src}
        width={300}
        height={290}
        alt='Current slide Image'
        priority
        quality={100}
      />
    </aside>
  )
}