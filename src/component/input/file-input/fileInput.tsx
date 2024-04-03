'use client'

import scss from './fileInput.module.scss'

import { useState } from 'react'

import type { ImgInputProps } from '../input.type'
import type { FieldValues } from 'react-hook-form'

export default function ImgInput<T extends FieldValues>({ register, htmlFor, isMultiple, labelText }: ImgInputProps<T>) {
	const [imgSrc, setImgSrc] = useState<string[]>([])

	const inputSupplieFormat: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

	const choseImg = (event: any) => {
		const files = Array.from(event.target.files) as File[]

		for (let file in files) {
      if(inputSupplieFormat.includes(files[file].type)) setImgSrc(prev => [...prev, URL.createObjectURL(files[file])])
    }
	}

	const multipleLabelStyle = isMultiple
		? { borderRadius: '5px', width: '100%', height: '6rem' }
		: { borderRadius: '50%', width: '6rem', height: '6rem' }

	return (
		<div className={scss.file_input_container}>
			{imgSrc.length > 0 ? (
				<section style={multipleLabelStyle}>
					{imgSrc.map((blob, currIndex) => (
						<div key={currIndex} className={scss.file_input_body}>
							<img
								className={scss.file_input_img}
								src={blob}
								alt='Image to upload'
							/>
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
				<label style={multipleLabelStyle}>
					{labelText}
					<input type='file' multiple={isMultiple} accept={'image/png,  image/jpg, image/jpeg, image/webp'} {...register(htmlFor, { onChange: choseImg })} />
				</label>
			)}
		</div>
	)
}
