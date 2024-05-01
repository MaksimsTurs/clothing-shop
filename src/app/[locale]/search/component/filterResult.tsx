import scss from '../scss/filterResult.module.scss'

import type { FilterResultProps } from '../page.type'

import { useScopedI18n } from '@/localization/client'
import { Filter } from 'lucide-react'

export default function FilterResult({ maxProducts, productsRange, selectedCategory, showFilter }: FilterResultProps) {
  const t = useScopedI18n('search')

  return(
    <section className={scss.result_container}>
      {selectedCategory ? <h4 className={scss.result_category_title}>{selectedCategory}</h4> : null}
      <p>{t('showed')} {productsRange.min} {t('of')} {productsRange.max} {t('products')}</p>
      <p>{t('total-products')} {maxProducts}</p>
      <button onClick={() => showFilter(false)}><Filter size={14}/></button>
    </section>
  )
}