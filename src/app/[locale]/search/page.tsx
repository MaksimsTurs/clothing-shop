'use client'

import scss from './scss/page.module.scss'

import NMPagintion from '@/component/page-pagination/pagePagination'
import NMPorudctsContainer from '@/component/product-container/productsContainer'
import ProductsLoader from '@/component/loader/products-loader/productsLoader'
import Filter from './component/filter'

import { useState, memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { ProductInitState } from '@/store/product/product.type'
import type { FilterState, SearchProps } from './search.type'
import type { AppDispatch, RootState } from '@/store/store'

import getFilteredProduct from '@/store/product/action/getFilteredProducts'
import { useScopedI18n } from '@/i18n/client'

const Pagination = memo(NMPagintion)
const ProductsContainer = memo(NMPorudctsContainer)

export default function Search({ searchParams }: SearchProps) {
	const [filterState, setFilterState] = useState<FilterState>({ category: [], price: 0, rating: 0 })
	const [isFilterActive, setFilterActive] = useState<boolean>(false)
	const [isFilterVisible, setFilterVisible] = useState<boolean>(false)

	const tr = useScopedI18n('Search')

	const dispatch = useDispatch<AppDispatch>()

	const { currPageProducts, maxPages, isLoading, productsRange, productsLength } = useSelector<RootState, ProductInitState>(state => state.product)

	const isMobile = window.matchMedia('(width <= 760px)').matches

	const showFilterContainer = () => setFilterVisible(true)
	const hiddeFilterContainer = () => setFilterVisible(false)

	useEffect(() => {
		dispatch(getFilteredProduct({...filterState, page: searchParams.page || 0}))
	}, [searchParams.page, isFilterActive])

	return (
		<section className={scss.search_page_container}>
			{!isMobile && <Filter filterState={filterState} setFilterState={setFilterState} setFilterActive={setFilterActive}/>}
			<div className={isFilterVisible ? scss.search_filter_smaller_container : `${scss.search_filter_smaller_container} ${scss.search_filter_smaller_container_hidden}`}>
				<div className={scss.search_filter_smaller_body}>
					<section className={scss.search_filter_header}>
						<p>{tr('filters')}</p>
						<button onClick={hiddeFilterContainer}>
							<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path d="M15.5459 14.4541C15.7572 14.6654 15.876 14.952 15.876 15.2509C15.876 15.5498 15.7572 15.8365 15.5459 16.0478C15.3346 16.2592 15.0479 16.3779 14.749 16.3779C14.4501 16.3779 14.1635 16.2592 13.9521 16.0478L7.99996 10.0937L2.0459 16.0459C1.83455 16.2573 1.54791 16.376 1.24902 16.376C0.950136 16.376 0.663491 16.2573 0.452147 16.0459C0.240802 15.8346 0.12207 15.5479 0.12207 15.2491C0.12207 14.9502 0.240803 14.6635 0.452147 14.4522L6.40621 8.5L0.454022 2.54593C0.242677 2.33459 0.123945 2.04795 0.123945 1.74906C0.123945 1.45017 0.242677 1.16353 0.454022 0.952184C0.665366 0.74084 0.95201 0.622107 1.2509 0.622107C1.54978 0.622107 1.83643 0.74084 2.04777 0.952184L7.99996 6.90625L13.954 0.951246C14.1654 0.739902 14.452 0.62117 14.7509 0.62117C15.0498 0.62117 15.3364 0.739902 15.5478 0.951246C15.7591 1.16259 15.8778 1.44924 15.8778 1.74812C15.8778 2.04701 15.7591 2.33365 15.5478 2.545L9.59371 8.5L15.5459 14.4541Z" fill="black" fillOpacity="0.4"/>
							</svg>
						</button>
					</section>	
					{isMobile && <Filter isChild filterState={filterState} setFilterState={setFilterState} setFilterActive={setFilterActive} setFilterVisible={setFilterVisible}/>}
				</div>
			</div>
			<div className={scss.search_page_body}>
				<Pagination currentPage={searchParams.page || 0} pagesCount={maxPages}/>			
				<div className={scss.search_filter_data}>
					<p className={scss.search_curr_page_data}>{tr('showing')} {productsRange.min} - {productsRange.max} {tr('of')} {productsLength} {tr('products')}</p>
					{isMobile &&
						<svg onClick={showFilterContainer} width="32" height="32" viewBox="0 0 32 32" fill="none">
							<rect width="32" height="32" rx="16" fill="#F0F0F0"/>
							<path d="M16.75 15.75V21.5C16.75 21.6989 16.671 21.8897 16.5303 22.0303C16.3897 22.171 16.1989 22.25 16 22.25C15.8011 22.25 15.6103 22.171 15.4697 22.0303C15.329 21.8897 15.25 21.6989 15.25 21.5V15.75C15.25 15.5511 15.329 15.3603 15.4697 15.2197C15.6103 15.079 15.8011 15 16 15C16.1989 15 16.3897 15.079 16.5303 15.2197C16.671 15.3603 16.75 15.5511 16.75 15.75ZM20.5 20C20.3011 20 20.1103 20.079 19.9697 20.2197C19.829 20.3603 19.75 20.5511 19.75 20.75V21.5C19.75 21.6989 19.829 21.8897 19.9697 22.0303C20.1103 22.171 20.3011 22.25 20.5 22.25C20.6989 22.25 20.8897 22.171 21.0303 22.0303C21.171 21.8897 21.25 21.6989 21.25 21.5V20.75C21.25 20.5511 21.171 20.3603 21.0303 20.2197C20.8897 20.079 20.6989 20 20.5 20ZM22 17.5H21.25V10.5C21.25 10.3011 21.171 10.1103 21.0303 9.96967C20.8897 9.82902 20.6989 9.75 20.5 9.75C20.3011 9.75 20.1103 9.82902 19.9697 9.96967C19.829 10.1103 19.75 10.3011 19.75 10.5V17.5H19C18.8011 17.5 18.6103 17.579 18.4697 17.7197C18.329 17.8603 18.25 18.0511 18.25 18.25C18.25 18.4489 18.329 18.6397 18.4697 18.7803C18.6103 18.921 18.8011 19 19 19H22C22.1989 19 22.3897 18.921 22.5303 18.7803C22.671 18.6397 22.75 18.4489 22.75 18.25C22.75 18.0511 22.671 17.8603 22.5303 17.7197C22.3897 17.579 22.1989 17.5 22 17.5ZM11.5 18C11.3011 18 11.1103 18.079 10.9697 18.2197C10.829 18.3603 10.75 18.5511 10.75 18.75V21.5C10.75 21.6989 10.829 21.8897 10.9697 22.0303C11.1103 22.171 11.3011 22.25 11.5 22.25C11.6989 22.25 11.8897 22.171 12.0303 22.0303C12.171 21.8897 12.25 21.6989 12.25 21.5V18.75C12.25 18.5511 12.171 18.3603 12.0303 18.2197C11.8897 18.079 11.6989 18 11.5 18ZM13 15.5H12.25V10.5C12.25 10.3011 12.171 10.1103 12.0303 9.96967C11.8897 9.82902 11.6989 9.75 11.5 9.75C11.3011 9.75 11.1103 9.82902 10.9697 9.96967C10.829 10.1103 10.75 10.3011 10.75 10.5V15.5H10C9.80109 15.5 9.61032 15.579 9.46967 15.7197C9.32902 15.8603 9.25 16.0511 9.25 16.25C9.25 16.4489 9.32902 16.6397 9.46967 16.7803C9.61032 16.921 9.80109 17 10 17H13C13.1989 17 13.3897 16.921 13.5303 16.7803C13.671 16.6397 13.75 16.4489 13.75 16.25C13.75 16.0511 13.671 15.8603 13.5303 15.7197C13.3897 15.579 13.1989 15.5 13 15.5ZM17.5 12.5H16.75V10.5C16.75 10.3011 16.671 10.1103 16.5303 9.96967C16.3897 9.82902 16.1989 9.75 16 9.75C15.8011 9.75 15.6103 9.82902 15.4697 9.96967C15.329 10.1103 15.25 10.3011 15.25 10.5V12.5H14.5C14.3011 12.5 14.1103 12.579 13.9697 12.7197C13.829 12.8603 13.75 13.0511 13.75 13.25C13.75 13.4489 13.829 13.6397 13.9697 13.7803C14.1103 13.921 14.3011 14 14.5 14H17.5C17.6989 14 17.8897 13.921 18.0303 13.7803C18.171 13.6397 18.25 13.4489 18.25 13.25C18.25 13.0511 18.171 12.8603 18.0303 12.7197C17.8897 12.579 17.6989 12.5 17.5 12.5Z" fill="black"/>
						</svg>
					}
				</div>
				{!isLoading && currPageProducts.length > 0 ? (
					<ProductsContainer data={currPageProducts} />
				) : (
					<ProductsLoader />
				)}
			</div>
		</section>
	)
}
