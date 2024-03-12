import type { CSSProperties, FormEventHandler } from "react"

export type FormWrapperProps = {
  title?: string
  onSubmit: FormEventHandler
  isLoading?: boolean
  serverError?: string
  link?: { text: string, linkURL: string }
  styles?: { formStyle?: CSSProperties; formInputsStyle?: CSSProperties }
}
