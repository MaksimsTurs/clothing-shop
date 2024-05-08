import type { TResponseError } from "@/global.type"
import type { CSSProperties, FormEventHandler, ReactNode } from "react"

export type FormWrapperProps = {
  title?: ReactNode | string
  className?: string
  onSubmit: FormEventHandler
  isLoading?: boolean
  serverError?: TResponseError
  link?: { text: string, linkURL: string }
  buttonLabel?: string
  styles?: { formStyle?: CSSProperties; formInputsStyle?: CSSProperties }
}
