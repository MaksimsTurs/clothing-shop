'use client'

import scss from './page.module.scss'

import { Fragment, memo, type SyntheticEvent, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Frown } from 'lucide-react'

import _ProductCard from '@/component/product-card/productCard'
import _Pagination from '@/component/page-pagination/pagePagination'
import FilterWrapper from './component/filterWrapper'
import FilterResult from './component/filterResult'
import Error from '../error'
import ProductLoaderContainer from '@/component/loader/product-loader-container/productLoadeContainer'

import type { FilterActionReturn, FilterState, PageProps } from './page.type'

import { useCurrentLocale, useScopedI18n } from '@/localization/client'

import useRequest from '@/custom-hook/useRequest/useRequest'
import useObjectData from '@/custom-hook/useObjectData'

const Pagination = memo(_Pagination)
const ProductCard = memo(_ProductCard)

export default function Page({ searchParams }: PageProps) {
	const { page, id, location } = searchParams

	const [isFilterHidden, setFilterHidden] = useState<boolean>(true)

	const { objectData, chage, reset } = useObjectData<FilterState>({ price: 0, rating: 0, categoriesID: [] })

	const router = useRouter()
  const t = useScopedI18n('search')
	const language = useCurrentLocale()

	const isFirstRender = useRef<boolean>(true)

	const isMobile: boolean = window.matchMedia('(width <= 785px)').matches

	const sortFirstRenderOption = { location, id, page: page || 0 } 
	const sortNextRendersOption = {...objectData, page: page || 0 }

	const { isPending, data, error, retry } = useRequest<FilterActionReturn>({ 
		URL: '/product/filter-and-pagination', 
		body: (isFirstRender.current && location) ? sortFirstRenderOption : sortNextRendersOption,
		disbleCache: true,
		key: `${page}`
	})

	const changePrice = (event: SyntheticEvent<HTMLInputElement>): void => chage('price', +event.currentTarget.value)
	const changeRating = (event: SyntheticEvent<HTMLInputElement>): void => chage('rating', +event.currentTarget.value)

	const resetState = (): void => {
		reset()
		router.replace(`/${language}/search?page=0`)
		document.body.style.overflow = 'auto'
	}

	const filter = async (): Promise<void> => {
		retry()
		setFilterHidden(true)
		isFirstRender.current = false
		router.replace(`/${language}/search?page=0`)
		document.body.style.overflow = 'auto'
	}

	const selectCategory = (category: { title: string, _id: string }): void => {
		if(objectData.categoriesID.includes(category._id)) chage('categoriesID', objectData.categoriesID.filter(id => id !== category._id))
		else chage('categoriesID', [...objectData.categoriesID, category._id])
	}

	const hideFilter = (): void => {
		setFilterHidden(true)
		document.body.style.overflow = 'auto'
	}
		
	return(
		<div className={scss.search_page_container}>
			<aside className={(isFilterHidden && isMobile) ? `${scss.search_page_filter} ${scss.search_filer_hidden}` : scss.search_page_filter}>
				<div className={scss.search_filter_container}>
					<p className={scss.search_filter_title}>Filter</p>
					<button onClick={hideFilter} className={scss.search_filer_close_button}>&#10005;</button>
				</div>
				<FilterWrapper title={t('category')}>
					<ul className={scss.search_categories_list}>
						{(data?.categories.length || 0) > 0 ? 
							data?.categories.map(category => 
								<li 
									key={category.title} 
									className={objectData.categoriesID.includes(category._id) ? scss.search_category_active : undefined}
									onClick={() => selectCategory(category)}>
										{category.title}
								</li>) : <li className={scss.search_categories_list_empty}>No categories found!</li>}
					</ul>
				</FilterWrapper>
				<FilterWrapper title={t('price')}>
					<div className={scss.search_price_container}>
						<input onChange={changePrice} value={objectData.price} min={0} max={500} className={scss.search_range_input} type="range" />
						<div className={scss.search_count_contaier}>
							<section>
								<p>0</p> 
								<p>€</p>
							</section>
							<section>
								<p>{objectData.price}</p> 
								<p>€</p>
							</section>
						</div>
					</div>		
				</FilterWrapper>
				<FilterWrapper title={t('rating')}>
					<div className={scss.search_price_container}>
						<input onChange={changeRating} value={objectData.rating} min={0} max={5} step={0.5} className={scss.search_range_input} type="range" />
						<div className={scss.search_count_contaier}>
							<section>0</section>
							<section>{objectData.rating}</section>
						</div>
					</div>
				</FilterWrapper>
				<div className={scss.search_buttons}>
					<button onClick={filter}>{t('filter')}</button>
					<button onClick={resetState}>{t('reset')}</button>
				</div>
			</aside>
			<div className={scss.search_result_container}>
				<FilterResult maxProducts={data?.maxProducts || 0} productsRange={data?.productsRange || { max: 0, min: 0 }} locationTitle={data?.locationTitle} showFilter={setFilterHidden}/>
				{error ? <Error error={error} isChild/> :
					isPending ? <ProductLoaderContainer/> :
					(data?.currPageProducts.length === 0 || !data?.currPageProducts) ? <div className={scss.search_product_empty}><Frown/><p>{t('no-products')}!</p></div> :
					<Fragment>
						<Pagination currentPage={Number(page) || 0} pagesCount={data?.maxPages || 0}/>
						<div className={scss.search_result_products}>
							{data!.currPageProducts.map(product => <ProductCard key={product._id} precent={product.precent} product={product}/>)}
						</div>
						<Pagination currentPage={Number(page) || 0} pagesCount={data?.maxPages || 0}/>
					</Fragment>}
			</div>
		</div>
	)
}	