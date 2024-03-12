import scss from './textAreatInput.module.scss'

import type { TextNumberInputProps } from '../input.type'

export default function TextAreaInput<T extends Record<any, any>>({ htmlFor, register, placeholder }: TextNumberInputProps<T>) {
	return (
		<div className={scss.text_area_container}>
			<textarea rows={9} className={scss.text_area} placeholder={placeholder} {...register(htmlFor)} />
		</div>
	)
}
