import scss from '../scss/modalWrapper.module.scss'

import type { PropsWithChildren } from 'react'

export default function ModalWrapper({ children }: PropsWithChildren) {
  return(
    <div className={scss.modal_container}>
      <div className={scss.modal_body}>{children}</div>
    </div>
  )
}