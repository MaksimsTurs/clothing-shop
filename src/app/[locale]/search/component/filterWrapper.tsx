import scss from '../scss/filterWrapper.module.scss'

import { isValidElement, type PropsWithChildren, ReactNode, useState } from 'react'

import type { FilterWrapperProps } from '../page.type'
import { useI18n } from '@/localization/client'

export default function FilterWrapper({ title, children }: PropsWithChildren<FilterWrapperProps>) {
  const t = useI18n()

  const [isOpen, setOpen] = useState<boolean>(false)

  const showHidde = (): void => setOpen(prev => !prev)

  const categoryMult = isValidElement(children) ? (children?.props?.children?.length || 1) : 1

  const height = (title === t('search.category') && isOpen) ? (40 * categoryMult) : 
                 (title === t('search.price') && isOpen) ? 75 : 
                 (title === t('search.rating') && isOpen) ? 75 : 0

  return(
    <section className={scss.filter_container}>
      <h5 className={scss.filter_title} onClick={showHidde}>{title}</h5>
      <div style={{ height }} className={scss.filter_children}>{children}</div>
    </section>
  )
}