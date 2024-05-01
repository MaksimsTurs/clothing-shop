'use client'

import scss from './fileInput.module.scss'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import type { ImgInputProps } from '../input.type'
import type { FieldValues } from 'react-hook-form'

export default function ImgInput<T extends FieldValues>({ register, labelText, attributes, isSubmited }: ImgInputProps<T>) {
	const [imgSrc, setImgSrc] = useState<string[]>([])

	const { name, isMultiple } = attributes

	const inputSupplyFormat: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

	const choseImg = (event: any): void => {
		const files = Array.from(event.target.files) as File[]
		for (let file in files) {
      if(inputSupplyFormat.includes(files[file].type)) setImgSrc(prev => [...prev, URL.createObjectURL(files[file])])
    }
	}

	useEffect(() => {
		setImgSrc([])
	}, [isSubmited])

	return (
		<div className={scss.file_input_container}>
			{imgSrc.length > 0 ? (
				<section style={{ borderRadius: '10px', width: '100%', height: '5rem' }}>
				 {isMultiple ? <label htmlFor='more-img' className={scss.file_input_more}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
						<input id='more-img' type='file' multiple accept={'image/png,  image/jpg, image/jpeg, image/webp'} {...register(name, { onChange: choseImg })} />
					</label> : null}
					{imgSrc.map((blob, currIndex) => (
						<div key={currIndex} className={scss.file_input_body}>
							<Image width={1440} height={1440} className={scss.file_input_img} src={blob} alt='Image to upload'/>
							<button
								className={scss.file_input_remove_button}
								type='button'
								onClick={() => setImgSrc(prev => prev.filter((_prev, prevIndex) => currIndex !== prevIndex))}>
								&#10005;
							</button>
						</div>
					))}
				</section>
			) : (
				<label style={{ borderRadius: '10px', width: '100%', height: '5rem' }}>
					{labelText}
					<input type='file' multiple={isMultiple} accept={'image/png,  image/jpg, image/jpeg, image/webp'} {...register(name, { onChange: choseImg })} />
				</label>
			)}
		</div>
	)
}
