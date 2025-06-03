import type { ExtendedIMGProps } from './extendedIMG.type'
import type { StaticImageData } from 'next/image'

import useIsImageExist from '@/custom-hook/useIsImageExist/useIsImageExist'

import Image from "next/image"

import defaultIMG from './img/default-product-image.webp'

export default function ExtendedIMG({ src, style, ...props }: ExtendedIMGProps) {
	const { isExist, url } = useIsImageExist(src)
	const isString = typeof url === "string"

  return <Image {...props} src={!isExist ? defaultIMG : isString ? url! : (url as StaticImageData).src} style={{...style, objectFit: 'cover'}}/>
}