import scss from '../scss/filterResult.module.scss'

import type { FilterResultProps } from '../page.type'

import { useScopedI18n } from '@/localization/client'
import { Filter } from 'lucide-react'

export default function FilterResult({ maxProducts, productsRange, showFilter, locationTitle }: FilterResultProps) {
  const t = useScopedI18n('search')

  const openFilter = (): void => {
    showFilter(false)
    document.body.style.overflow = 'hidden'
  }

  return(
    <section className={scss.result_container}>
      {locationTitle ? <h4 className={scss.result_category_title}>{locationTitle}</h4> : null}
      <p>{t('showed')} {productsRange.min} {t('of')} {productsRange.max} {t('products')}</p>
      <p>{t('total-products')} {maxProducts}</p>
      <button onClick={openFilter}><Filter size={14}/></button>
    </section>
  )
}