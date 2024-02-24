import scss from '../scss/multipleInput.module.scss'

import type { PropsWithChildren } from 'react'

export default function MultipleInput({ children }: PropsWithChildren) {
  return(
    <div className={scss.multiple_input_container}>
      {children}
    </div>
  )
}