'use client'

import scss from './page.module.scss'

import { Fragment, type SyntheticEvent, useState } from 'react'
import { Frown } from 'lucide-react'

import FilterWrapper from './component/filterWrapper'
import ProductsContainer from '@/component/product-container/productsContainer'
import Pagination from '@/component/page-pagination/pagePagination'
import FilterResult from './component/filterResult'
import Error from '../error'
import ProductLoaderContainer from '@/component/loader/product-loader-container/productLoadeContainer'

import type { FilterActionReturn, PageProps } from './page.type'

import { useScopedI18n } from '@/localization/client'

import useRequest from '@/custom-hook/useRequest/useRequest'

export default function Page({ searchParams }: PageProps) {
	const { page, title } = searchParams

	const [currPrice, setCurrPrice] = useState<number>(0)
	const [currRating, setCurrRating] = useState<number>(0)
	const [categories, setCategories] = useState<string[]>([])
	const [isFilterHidden, setFilterHidden] = useState<boolean>(true)

  const t = useScopedI18n('search')

	const filter = { 
		category: title ? [title] : categories.length > 0 ? categories : [], 
		page: page || 0, 
		price: currPrice, 
		rating: currRating
	}

	const changePrice = (event: SyntheticEvent<HTMLInputElement>): void => setCurrPrice(+event.currentTarget.value)
	const changeRating = (event: SyntheticEvent<HTMLInputElement>): void => setCurrRating(+event.currentTarget.value)

	const hideFilter = (): void => setFilterHidden(true)

	const resetState = (): void => {
		setCurrPrice(0)
		setCurrRating(0)
		setCategories([])
	}

	const { isPending, data, error, retry } = useRequest<FilterActionReturn>({
		key: `${filter.category.join(',') || 'null'}-${filter.page}-${filter.price}-${filter.rating}`,
		body: filter,
		URL: '/product/filter-and-pagination'
	})

	const getFilteredProducts = async (): Promise<any> => {
		retry()
		setFilterHidden(true)
	}

	const isMobile: boolean = window.matchMedia('(width <= 785px)').matches
		
	return(
		<div className={scss.search_page_container}>
			<aside className={(isFilterHidden && isMobile) ? `${scss.search_page_filter} ${scss.search_filer_hidden}` : scss.search_page_filter}>
				<div className={scss.search_filter_container}>
					<p className={scss.search_filter_title}>Filter</p>
					<button onClick={hideFilter} className={scss.search_filer_close_button}>&#10005;</button>
				</div>
				<FilterWrapper title={t('category')}>
					<ul className={scss.search_categories_list}>
						{data?.categories.map(category => <li key={category} className={categories.includes(category) ? scss.search_category_active : undefined} onClick={() => {
							if(categories.includes(category)) return setCategories(prev => prev.filter(_prev => _prev !== category))
							else return setCategories(prev => [...prev, category])
						}}>{category}</li>)}
					</ul>
				</FilterWrapper>
				<FilterWrapper title={t('price')}>
					<div className={scss.search_price_container}>
						<input onChange={changePrice} value={currPrice} min={0} max={500} className={scss.search_range_input} type="range" />
						<div className={scss.search_count_contaier}>
							<section>
								<p>0</p> 
								<p>€</p>
							</section>
							<section>
								<p>{currPrice}</p> 
								<p>€</p>
							</section>
						</div>
					</div>		
				</FilterWrapper>
				<FilterWrapper title={t('rating')}>
					<div className={scss.search_price_container}>
						<input onChange={changeRating} value={currRating} min={0} max={5} step={0.5} className={scss.search_range_input} type="range" />
						<div className={scss.search_count_contaier}>
							<section>0</section>
							<section>{currRating}</section>
						</div>
					</div>
				</FilterWrapper>
				<div className={scss.search_buttons}>
					<button onClick={getFilteredProducts}>{t('filter')}</button>
					<button onClick={resetState}>{t('reset')}</button>
				</div>
			</aside>
			<div className={scss.search_result_container}>
				<FilterResult maxProducts={data?.maxProducts || 0} productsRange={data?.productsRange || { max: 0, min: 0 }} selectedCategory={title} showFilter={setFilterHidden}/>
				{error ? <Error error={error} isChild/> :
					isPending ? <ProductLoaderContainer/> :
					data?.currPageProducts.length === 0 ? <div className={scss.search_product_empty}><Frown/><p>{t('no-products')}!</p></div> :
					<Fragment>
						<ProductsContainer data={data?.currPageProducts || []}/>
						<Pagination currentPage={Number(page) || 0} pagesCount={data?.maxPages || 0}/>
					</Fragment>}
			</div>
		</div>
	)
}	