'use client'

import { useScopedI18n } from '@/localization/client'
import scss from './pagePagination.module.scss'

import type { PaginationProps } from './pagePagination.type'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function Pagination({ currentPage, pagesCount }: PaginationProps) {
  const t = useScopedI18n('page-pagination')
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const title: string | null = searchParams.get('title')

  const goToPreviousPage = (): void => {
    const prevPage: number = currentPage - 1 !== -1 ? --currentPage : 0
    router.push(`/search?page=${prevPage}${title ? `&title=${title}` : ''}`)
  }

  const goToNextPage = (): void => {
    const nextPage: number = currentPage >= (pagesCount - 1) ? (pagesCount - 1) : ++currentPage
    router.push(`/search?page=${nextPage}${title ? `&title=${title}` : ''}`)
  }

  const sliceStart: number = (+currentPage - 2) < 0 ? 0 : (+currentPage - 2)
  const sliceEnd: number = +currentPage + 3

  return(
    <section className={scss.pagination_container}>
      <button className={scss.pagination_button} onClick={goToPreviousPage}>
        <svg viewBox="0 0 14 14">
          <path d="M12.8332 6.99996H1.1665M1.1665 6.99996L6.99984 12.8333M1.1665 6.99996L6.99984 1.16663" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <p>{t('past')}</p>
      </button>
      <div className={scss.pagination_link_container}>
        {currentPage <= pagesCount && currentPage > 2 && <button className={scss.pagination_link}>...</button>}
        {[...Array(pagesCount)].map((_, index) => (
          <Link 
            className={index == currentPage ? `${scss.pagination_link} ${scss.pagination_link_active}` : scss.pagination_link}
            key={index} 
            href={`/search?page=${index}${title ? `&title=${title}` : ''}`}
            >{index}</Link>
          )).slice(sliceStart, sliceEnd)}
        {!(currentPage >= pagesCount - 3) && <button className={scss.pagination_link}>...</button>}
      </div>
      <button className={scss.pagination_button} onClick={goToNextPage}>
        <p>{t('next')}</p>
        <svg viewBox="0 0 14 14">
          <path d="M12.8332 6.99996H1.1665M1.1665 6.99996L6.99984 12.8333M1.1665 6.99996L6.99984 1.16663" stroke="black" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </section>
  )
} 