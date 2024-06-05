'use client'

import scss from '../scss/searchForm.module.scss'

import type { ProductData } from '@/store/admin/admin.type'

import Link from 'next/link'
import { type SyntheticEvent, useState, useRef } from 'react'
import { Search } from 'lucide-react'

import useDebounce from '@/custom-hook/useDebounce'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'
import useRequest from '@/custom-hook/useRequest/useRequest'
import useModal from '@/custom-hook/useModal'

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState<string>('')

  const formRef = useRef<HTMLFormElement>(null)

  const debounceValue: string = useDebounce(searchValue, 1000)
  const isShowed: boolean = useModal(formRef)
  const { isPending, data } = useRequest<{ products: ProductData[] }>({ key: debounceValue, URL: `/product/find-by-title/${debounceValue}`, fetchOnNotEmpty: debounceValue })

  const t = useScopedI18n('search-form')
  const language = useCurrentLocale()

  const liveSearch = (event: SyntheticEvent<HTMLInputElement>): void => setSearchValue(event.currentTarget.value)

  return(
    <form ref={formRef} className={scss.search_form_container}>
      <Search />
      <input onChange={liveSearch} value={searchValue} placeholder={t('placeholder')} type="text"/>
      <ul style={{ display: isShowed ? 'block' : 'none' }} className={scss.search_form_list}>
        {isPending ? <li className={scss.search_form_list_empty}>{t('loading')}...</li> :
         (data?.products?.length === 0 || !data?.products) ? <li className={scss.search_form_list_empty}>{t('empty')}</li> :
         data ? data.products.map(product => (<li key={product._id}><Link href={`/${language}/product/${product._id}`}>{product.title}</Link></li>)) : null}
       </ul>
    </form>
  )
}