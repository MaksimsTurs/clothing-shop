'use client'

import scss from '../scss/searchForm.module.scss'

import type { ProductData } from '@/store/admin/admin.type'
import type { Fetching } from '@/global.type'

import Link from 'next/link'
import { type SyntheticEvent, useEffect, useState, useRef } from 'react'
import { Search } from 'lucide-react'

import fetcher from '@/util/fetcher/fetcher'

import useDebounce from '@/custom-hook/useDebounce'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'

export default function SearchForm() {
  const [searchValue, setSearchValue] = useState<string>('')
  const [result, setResult] = useState<Fetching<ProductData[]>>({ isLoading: false })
  const [isFocused, setFocused] = useState<boolean>(false)

  const debounceValue: string = useDebounce(searchValue, 1000)

  const formRef = useRef<HTMLFormElement>(null)

  const t = useScopedI18n('search-form')
  const language = useCurrentLocale()

  const liveSearch = (event: SyntheticEvent<HTMLInputElement>): void => setSearchValue(event.currentTarget.value)

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      setResult({ isLoading: true })

      try {
        const { products } = await fetcher.get<{ products: ProductData[] }>(`/product/find-by-title/${debounceValue}`)
        setResult({ isLoading: false, data: products })
      } catch(error) {
        setResult({ error: JSON.parse(error as string), isLoading: false })
      }
    }

    if(searchValue.length > 0) fetch()
    else setResult({ isLoading: false, data: [] })
  }, [debounceValue])

  useEffect(() => {
    const outsideClickHandler = (event: any): void => {
      if(formRef.current && formRef.current.contains(event.target)) return setFocused(true)
      setFocused(false)
    }

    document.addEventListener('click', outsideClickHandler)
  }, [])

  return(
    <form ref={formRef} className={scss.search_form_container}>
      <Search />
      <input spellCheck={false} onChange={liveSearch} value={searchValue} placeholder={t('placeholder')} type="text"/>
      {<ul style={{ display: isFocused ? 'block' : 'none' }} className={scss.search_form_list}>
        {result.isLoading ? <li className={scss.search_form_list_empty}>{t('loading')}</li> :
         result.error ? <li>{result.error.message}</li> :
         result.data?.length === 0 ? <li className={scss.search_form_list_empty}>{t('empty')}</li> :
         result.data && result.data.map(product => (<li key={product._id}><Link href={`/${language}/product/${product._id}`}>{product.title}</Link></li>))}
       </ul>}
    </form>
  )
}