import ResponseError from "@/util/exeption/ResponseError"

import type { CSSProperties, FormEventHandler, ReactNode } from "react"

export type FormWrapperProps = {
  title?: ReactNode | string
  className?: string
  onSubmit: FormEventHandler
  isLoading?: boolean
  serverError?: ResponseError
  link?: { text: string, linkURL: string }
  styles?: { formStyle?: CSSProperties; formInputsStyle?: CSSProperties }
}
