import scss from '../scss/dataImage.module.scss'

import type { DataImageProps } from '../page.type'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

import { Fragment } from 'react'
import Link from 'next/link'

export default function DataImage({ images }: DataImageProps) {
  return(
    <Fragment>
      {Array.isArray(images) ?
        <div className={scss.data_images_container}>{images.length > 0 ? images.map(src => (
          <Link key={src} target='_blank' href={src}>
            <ExtendedIMG src={src} alt={src} width={100} height={100}/>
          </Link>
        )) : null}</div> :
        <div className={scss.data_images_container}>{images ? (
          <Link target='_blank' href={images}>
            <ExtendedIMG src={images} alt={images} width={100} height={100}/>
          </Link>
        ) : null}</div>}
    </Fragment>
  )
}