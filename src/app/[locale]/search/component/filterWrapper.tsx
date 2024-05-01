import scss from '../scss/filterWrapper.module.scss'

import { type PropsWithChildren, useState } from 'react'

import type { FilterWrapperProps } from '../page.type'

export default function FilterWrapper({ title, children }: PropsWithChildren<FilterWrapperProps>) {
  const [isOpen, setOpen] = useState<boolean>(false)

  const showHidde = () => setOpen(prev => !prev)

  return(
    <section className={scss.filter_container}>
      <h5 className={scss.filter_title} onClick={showHidde}>{title}</h5>
      <div className={isOpen ? scss.filter_children_open : scss.filter_children}>{children}</div>
    </section>
  )
}