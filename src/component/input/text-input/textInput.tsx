import scss from './textInput.module.scss'

import type { InputProps } from '../input.type'

export default function TextInput<T extends Record<string, any>>({ register, validate, errors, attributes, required }: InputProps<T>) {
	const { name, min, max } = attributes

	const error = errors?.[name]?.message as string

	return (
			<div className={scss.text_input_container}>
				<input 
					className={error ? `${scss.text_input_input} ${scss.text_input_error}` : scss.text_input_input}
					{...attributes }
					{...register(name, {
						required,
						minLength: min,
						maxLength: max,
						//@ts-ignore
						validate
					})}
				/>
				{error ? <span className={scss.text_input_error_message}>{error}</span> : null}
			</div>
	)
}
