import scss from './selectInput.module.scss'

import type { FieldValues } from 'react-hook-form'
import type { SelectInputProps } from '../input.type'

export default function SelectInput<T extends FieldValues>({ options, selected, setSelect }: SelectInputProps<T>) {
  return(
    <section className={scss.select_container}>
      <ul>
        {options.length > 0 ? 
          options.map(option => (
            <li 
              onClick={() => {
                if(selected === option) setSelect('')
                else setSelect(option)
              }}
              key={option} 
              className={option === selected ? scss.selected_selected : undefined}>{option}</li>
          )) : <li className={scss.select_empty}>None</li>}
      </ul>
    </section>
  )
}