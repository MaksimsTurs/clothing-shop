import scss from './selectInput.module.scss'

import type { SelectInputProps } from '../input.type'

export default function SelectInput<T extends Record<any, any>>({
	setSelectOption,
	options,
	selectedOption,
}: SelectInputProps<T>) {
	return (
		<div className={scss.select_input_container}>
			<section className={scss.select_select}>
				{options && options.length > 0 ? (
					options.map(item => (
						<option
							key={item._id}
							style={{background: item._id === selectedOption?._id ? 'rgba(0, 0, 0, 0.1)' : undefined}}
							className={scss.select_option}
							onClick={() => setSelectOption(item)}>
							{item.title}
						</option>
					))
				) : (
					<option className={scss.select_option}>None</option>
				)}
			</section>	
		</div>
	)
}
