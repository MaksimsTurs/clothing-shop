'use client'

import scss from '../scss/filter.module.scss'

import type { FilterProps } from '../search.type'

import FilterContainerWrapper from './filterContainerWrapper'
import Category from './category'
import FilterRange from './filterRange'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function Filer({ filterState, isChild, setFilterState, setFilterVisible, refetch }: FilterProps) {
  const router = useRouter()
  const currLanguage = useCurrentLocale()
  const params = useSearchParams()

  const tr = useScopedI18n('Search')

  const title = params.get('title')

  const filterProducts = (): void => {
    router.push(`/${currLanguage}/search?page=0${title ? `&title=${title}` : ''}`)
    if(setFilterVisible) setFilterVisible(false)
    refetch()
  }

  const resetFilter = (): void => {
    router.push(`/${currLanguage}/search?page=0`)
    setFilterState(() => ({ category: [], price: 0, rating: 0 }))
  }

  return(
    <aside style={isChild ? { width: '100%', border: 'none' } : { width: '20rem' }} className={scss.filter_container}>
      <FilterContainerWrapper title={tr('category')}>
        <Category setFilterState={setFilterState} filterState={filterState}/>
      </FilterContainerWrapper>
      <FilterContainerWrapper title={tr('price')}>
        <FilterRange setFilterState={setFilterState} filterState={filterState} filterKey='price' min={0} max={2000}/>
      </FilterContainerWrapper>
      <FilterContainerWrapper title={tr('rating')}>
        <FilterRange setFilterState={setFilterState} filterState={filterState} filterKey='rating' max={5} min={0}/>
      </FilterContainerWrapper>
      <div className={scss.filter_submit_buttons_container}>
        <button onClick={filterProducts}>{tr('filter')}</button>
        <button onClick={resetFilter}>{tr('reset')}</button>
      </div>
    </aside>
  )
}