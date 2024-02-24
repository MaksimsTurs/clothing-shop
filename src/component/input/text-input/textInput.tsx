import scss from './textInput.module.scss'

import type { TextNumberInputProps } from '../input.type'

export default function TextInput<T extends Record<any, any>>({
	register,
	validation,
	htmlFor,
	errors,
	type,
	placeholder,
	max,
	min,
	required,
	step,
	value
}: TextNumberInputProps<T>) {
	return (
			<div className={scss.text_input_container}>
				<input
					className={scss.text_input_input}
					step={step || 1}
					min={0}
					type={type}
					value={value}
					placeholder={placeholder}
					{...register(htmlFor, {
						required,
						validate: validation,
						minLength: min,
						maxLength: max   
					})}
				/>
				{errors?.[htmlFor]?.message && <span className={scss.text_input_error}>{errors?.[htmlFor]?.message as string}</span>}
			</div>
	)
}
