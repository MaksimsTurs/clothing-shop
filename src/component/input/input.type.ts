import { Dispatch, SetStateAction } from "react"
import type { UseFormRegister, FieldValues, FieldErrors, Path } from "react-hook-form"

export type InputProps<T extends FieldValues> = {
  register: UseFormRegister<T>
  htmlFor: Path<T>
  type?: 'text' | 'email' | 'number' | 'password' | 'date'
  errors?: FieldErrors<T>
  serverError?: string
  required?: { message: string, value: boolean }
  validation?: (string: string) => string | undefined
}

export interface TextNumberInputProps<T extends FieldValues> extends InputProps<T> {
  value?: string
  placeholder?: string
  step?: number
  min?: { message: string, value: number }
  max?: { message: string, value: number }
  maxNum?: number
  minNum?: number
}

export interface ImgInputProps<T extends FieldValues> extends Omit<InputProps<T>, 'type'> {
  isMultiple?: boolean
  labelText: string
}

export interface SelectInputProps<T extends FieldValues> extends Omit<InputProps<T>, 'register' | 'htmlFor' | 'type'> {
  options?: { _id: string, title: string }[]
  selectedOption?: { _id: string, title: string }
  setSelectOption: Dispatch<SetStateAction<{ _id: string, title: string } | undefined>>
}