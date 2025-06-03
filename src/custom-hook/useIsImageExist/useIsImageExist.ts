import type { UseIsImageExistReturn } from './useIsImageExist.type'
import type { StaticImageData } from 'next/image'

import { useState, useEffect } from 'react'

export default function useIsImageExist(src?: string | StaticImageData): UseIsImageExistReturn {
	const [imageCheckState, setImageCheckState] = useState<UseIsImageExistReturn>({ isLoading: false, isExist: false, url: src })

	useEffect(() => {
		async function checkSrc() {
			if(src) {
				setImageCheckState(curr => ({...curr, isLoading: true }))
				const response = await fetch(typeof src === "string" ? src : src.src);
				setImageCheckState({ isExist: response.ok, isLoading: false, url: src })
			}
		} 

		checkSrc();
	}, [])

	return imageCheckState;
}