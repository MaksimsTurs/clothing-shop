import scss from './checkboxInput.module.scss'

import type { FieldValues } from 'react-hook-form';
import type { CheckBoxInputProps } from '../input.type';

export default function CheckBoxInput<T extends FieldValues>({ attributes, label, register }: CheckBoxInputProps<T>) {
  const { name, defaultValue } = attributes

  return(
    <label className={scss.checkbox_container} htmlFor={name}>
      <p>{label}</p>
      <input type="checkbox" defaultChecked={defaultValue} id={name} {...register(name)}/>
      <span className={scss.checkbox_checkmark}></span>
    </label>
  )
}