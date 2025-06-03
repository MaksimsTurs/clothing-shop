import type { StaticImageData } from "next/image"

export type UseIsImageExistReturn = {
	isLoading: boolean
	isExist: boolean
	url?: string | StaticImageData
}