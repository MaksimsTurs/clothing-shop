import scss from '../scss/selectWrapper.module.scss'

import type { PropsWithChildren } from 'react'

export default function SelectWrapper({ children, title }: PropsWithChildren<{ title: string }>) {
  return(
    <div>
      <h3 className={scss.select_body_title}>{title}</h3>
      <ul className={scss.select_body_wrapper}>{children}</ul>
    </div>
  )
}