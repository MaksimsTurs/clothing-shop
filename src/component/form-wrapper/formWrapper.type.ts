import type { CSSProperties, FormEventHandler } from "react"
import type { FieldValues } from "react-hook-form"

export type FormWrapperProps<T extends FieldValues> = {
  title?: string
  onSubmit: FormEventHandler
  isLoading?: boolean
  serverError?: string
  link?: { text: string, linkURL: string }
  styles?: { formStyle?: CSSProperties; formInputsStyle?: CSSProperties }
}
