import scss from './selectInput.module.scss'

import type { FieldValues } from 'react-hook-form'
import type { SelectInputProps } from '../input.type'

import SelectWrapper from '@/app/[locale]/admin/component/selectWrapper'

export default function SelectInput<T extends FieldValues>({ options, title, selected, setSelect }: SelectInputProps<T>) {
  const choseItem = (chose: string): void => {
    if(selected === chose) setSelect('')
    else setSelect(chose)
  }

  return(
    <SelectWrapper title={title}>
      {options.length > 0 ? 
        options.map(option => (
          <li 
              onClick={() => choseItem(option)}
              key={option} 
              className={option === selected ? `${scss.selection_active} ${scss.selection_item}` : scss.selection_item}>{option}</li>
          )) : <li className={scss.selection_item}>None</li>}
    </SelectWrapper>
  )
}