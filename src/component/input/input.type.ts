import type { Dispatch, SetStateAction } from "react"
import type { UseFormRegister, FieldValues, FieldErrors, Path, ValidationRule } from "react-hook-form"

export type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  validate?: (string: string) => string | undefined
  errors?: FieldErrors<T>
  attributes: Attributes<T>
  required?: { message: string, value: boolean }
}

export type Attributes<T> = {
  className?: string
  name: Path<T>
  defaultValue?: any
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'date' | 'number' | 'datetime-local' | 'file'
  value?: string
  step?: number
  min?: number | ValidationRule<any>
  max?: number | ValidationRule<any>
  multiple?: boolean
}

export interface ImgInputProps<T extends FieldValues> extends Omit<InputProps<T>, 'type'> { 
  labelText: string
  isSubmited?: boolean
}

export interface CheckBoxInputProps<T extends FieldValues> extends InputProps<T> { label: string }

export interface SelectInputProps<T extends FieldValues> extends Omit<InputProps<T>, 'register' | 'attributes'> {
  options: string[]
  selected: string
  setSelect: Dispatch<SetStateAction<string>>
  title: string
}
