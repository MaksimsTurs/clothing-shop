'use client'

import scss from './productsContainer.module.scss'

import type { ProductsContainerProps } from './productsContainer.type'

import StarRating from '../star-rating/starRating'
import ProductCost from '../product-cost/productCost'
import Timer from '../timer/timer'
import ExtendedIMG from '../extended-img/extendedIMG'

import Link from 'next/link'

import deleteSection from '@/app/[locale]/home/fetching/deleteSection'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'

export default function ProductsContainer({ data, title, viewAllLink, expiredDate }: ProductsContainerProps) {
	const t = useScopedI18n('products-container')
	const language = useCurrentLocale()

	const time: number = expiredDate ? Date.parse(expiredDate) - Date.now() : 0

	if(time < 0 && title) async (): Promise<any> => await deleteSection(title)

	return (
		<section className={scss.product_container}>
			{title ? (
				<div className={scss.product_title_container}>
					<h3 className={scss.product_title}>{title.toUpperCase()}</h3>
					{time > 0 && expiredDate ? <Timer expiredDate={expiredDate} /> : null}
				</div>
			) : null}
			<div className={scss.product_content}>
				{data?.map(product => (
					<Link key={product._id} href={`/${language}/product/${product._id}`} className={scss.product_article_container}>
						<div className={scss.product_description}>{product.description ? <p>{product.description}</p> : <p className={scss.product_no_description}>No description!</p>}</div>
						<ExtendedIMG width={1440} height={200} className={scss.product_img} src={product.images[0]} alt={product.title}/>
						<section className={scss.product_data_container}>
							<h4 className={scss.product_name}>{product.title}</h4>
							<StarRating rating={product.rating || 0.00} />
							<ProductCost price={product.price} precent={product.precent} />
						</section>
					</Link>))}
			</div>
			{viewAllLink ? (
				<div className={scss.product_view_all_link_container}>
					<Link className={scss.product_view_all_link} href={`/${language}/search${title ? `?title=${title}` : ''}`}>{t('link')}</Link>
				</div>
			) : null}
		</section>
	)
}
