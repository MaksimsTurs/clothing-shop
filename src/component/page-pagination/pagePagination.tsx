'use client'

import scss from './pagePagination.module.scss'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import type { PaginationProps } from './pagePagination.type'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { MoveLeft, MoveRight } from 'lucide-react'

export default function Pagination({ currentPage, pagesCount }: PaginationProps) {
  const t = useScopedI18n('page-pagination')
  const language = useCurrentLocale()
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const title: string | null = searchParams.get('title')
  const location: string | null = searchParams.get('location')
  const id: string | null = searchParams.get('id')

  const goToPreviousPage = (): void => {
    const prevPage: number = currentPage - 1 !== -1 ? --currentPage : 0
    const params = `${title ? `&title=${title}` : ''}${location ? `&location=${location}` : ''}${id ? `&id=${id}` : ''}`
    router.push(`/${language}/search?page=${prevPage}${params}`)
  }

  const goToNextPage = (): void => {
    const nextPage: number = currentPage >= (pagesCount - 1) ? (pagesCount - 1) : ++currentPage
    const params = `${title ? `&title=${title}` : ''}${location ? `&location=${location}` : ''}${id ? `&id=${id}` : ''}`
    router.push(`/${language}/search?page=${nextPage}${params}`)
  }

  const sliceStart: number = (+currentPage - 2) < 0 ? 0 : (+currentPage - 2)
  const sliceEnd: number = +currentPage + 3

  return(
    <section className={scss.pagination_container}>
      <button className={scss.pagination_button} onClick={goToPreviousPage}>
        <MoveLeft />
        <p>{t('past')}</p>
      </button>
      <div className={scss.pagination_link_container}>
        {currentPage <= pagesCount && currentPage > 2 && <button className={scss.pagination_link}>...</button>}
        {[...Array(pagesCount)].map((_, index) => (
          <Link 
            className={index == currentPage ? `${scss.pagination_link} ${scss.pagination_link_active}` : scss.pagination_link}
            key={index} 
            href={`/${language}/search?page=${index}${title ? `&title=${title}` : ''}`}
            >{index}</Link>
          )).slice(sliceStart, sliceEnd)}
        {!(currentPage >= pagesCount - 3) && <button className={scss.pagination_link}>...</button>}
      </div>
      <button className={scss.pagination_button} onClick={goToNextPage}>
        <p>{t('next')}</p>
        <MoveRight />
      </button>
    </section>
  )
} 