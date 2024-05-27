'use client'

import scss from './fileInput.module.scss'

import { ChangeEvent, useEffect, useState } from 'react'
import { ImageUp, X } from 'lucide-react'
import Image from 'next/image'

import type { ImgInputProps } from '../input.type'
import type { FieldValues } from 'react-hook-form'

export default function ImgInput<T extends FieldValues>({ register, labelText, attributes, isSubmited }: ImgInputProps<T>) {
	const [imgURLs, setImgURLs] = useState<string[]>([])

	const inputSupplyFormat: string[] = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']

	const changeIMG = (event: ChangeEvent<HTMLInputElement>): void => {
		const files = event.currentTarget['files'] || []
		const filesArray = Array.from(files) as File[]
		for (let file in filesArray) {
      if(inputSupplyFormat.includes(files[file].type)) {
				if(attributes.multiple)	setImgURLs(prev => [...prev, URL.createObjectURL(files[file])])
				else setImgURLs([URL.createObjectURL(filesArray[file])])
			}
    }
	}

	const removeIMG = (url: string): void => {
		setImgURLs(prev => prev.filter(currURL => currURL !== url))
	}

	useEffect(() => {
		setImgURLs([])
	}, [isSubmited])

	return (
		<label className={`${attributes.className} ${scss.file_input_container}`} htmlFor={labelText}>
			{imgURLs.length <= 0 ? 
				<section className={scss.file_input_label}>
					<ImageUp />
					<p>{labelText}</p>
				</section> : null}
			<input id={labelText} accept={inputSupplyFormat.join(',')} {...register(attributes.name, { onChange: changeIMG })} {...attributes}/>
			{imgURLs.map(url => 
				<div key={url} className={scss.file_input_img_peview}>
					<button type='button' onClick={() => removeIMG(url)} className={scss.file_input_remove_button}><X /></button>
					<Image src={url} width={1440} height={1440} alt='Uploaded image'/>
				</div>)}
		</label>
	)
}
