import scss from './textAreatInput.module.scss'

import type { InputProps } from '../input.type'

export default function TextAreaInput<T extends Record<any, any>>({ attributes, register }: InputProps<T>) {
	const { name } = attributes

	return (
		<div className={scss.text_area_container}>
			<textarea rows={9} className={scss.text_area} {...attributes } {...register(name)} />
		</div>
	)
}
