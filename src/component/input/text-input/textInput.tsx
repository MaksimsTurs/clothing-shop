import scss from './textInput.module.scss'

import type { InputProps } from '../input.type'

import { CircleX } from 'lucide-react'
import { Fragment } from 'react'

export default function TextInput<T extends Record<string, any>>({ register, validate, errors, attributes, required }: InputProps<T>) {
	const { name, min, max } = attributes

	const error = errors?.[name]?.message as string | undefined

	return (
			<div className={scss.text_input_container}>
				<input 
					className={error ? `${scss.text_input_input} ${scss.text_input_error}` : scss.text_input_input}
					{...attributes }
					{...register(name, {
						required,
						minLength: min,
						maxLength: max,
						validate
					})}
				/>
				{error ? 
					<Fragment>
						<CircleX className={scss.text_input_error_icon}/>
						<div className={scss.text_input_error_container}>
							<span className={scss.text_input_error_message}>{error}</span>
						</div>
					</Fragment> : null}
			</div>
	)
}
