'use client'

import scss from './productsContainer.module.scss'

import type { ProductsContainerProps } from './productsContainer.type'

import Link from 'next/link'

import StarRating from '../star-rating/starRating'
import ProductCost from '../product-cost/productCost'
import Timer from '../timer/timer'
import ExtendedIMG from '../extended-img/extendedIMG'

import actionDeleteSection from '@/app/[locale]/home/action/actionDeleteSection'

import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function ProductsContainer({ data, title, viewAllLink, expiredDate }: ProductsContainerProps) {
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Products-Container')

	const time: number = expiredDate ? Date.parse(expiredDate) - Date.now() : 0

	if(time < 0 && title) async (): Promise<any> => await actionDeleteSection(title)

	return (
		<section className={scss.product_container}>
			{title ? (
				<div className={scss.product_title_container}>
					<h3 className={scss.product_title}>{title.toUpperCase()}</h3>
					{time > 0 && expiredDate ? <Timer expiredDate={expiredDate} /> : null}
				</div>
			) : null}
			<div className={scss.product_content}>
				{data.map(product => (
					<Link key={product._id} href={`/${currLanguage}/product/${product._id}`} className={scss.product_article_container}>
						<ExtendedIMG width={1440} height={200} className={scss.product_img} src={product.images[0]} alt={product.title}/>
						<h4 className={scss.product_name}>{product.title}</h4>
						<StarRating rating={product.rating || 0.00} />
						<ProductCost price={product.price} precent={product.precent} />
					</Link>
				))}
			</div>
			{viewAllLink ? (
				<div className={scss.product_view_all_link_container}>
					<Link className={scss.product_view_all_link} href={`/${currLanguage}/search${title ? `?title=${title}` : ''}`}>{tr('view-all.link')}</Link>
				</div>
			) : null}
		</section>
	)
}
