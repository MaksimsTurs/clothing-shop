import scss from './productsContainer.module.scss'

import type { ProductsContainerProps } from './productsContainer.type'

import StarRating from '../star-rating/starRating'
import ProductCost from '../product-cost/productCost'
import Timer from '../timer/timer'
import ExtendedIMG from '../extended-img/extendedIMG'

import Link from 'next/link'
import { cookies } from 'next/headers'

import deleteSection from '@/app/[locale]/home/fetching/deleteSection'
import getTranslation from '@/localization/server'
import ProductCard from '../product-card/productCard'

export default async function ProductsContainer({ data, title, viewAllLink, expiredDate }: ProductsContainerProps) {
	const t = await getTranslation('products-container')
	const language = cookies().get('locale')

	const time: number = expiredDate ? Date.parse(expiredDate) - Date.now() : 0

	if(time < 0 && title) await deleteSection(title)

	return (
		<section className={scss.product_container}>
			{title ? (
				<div className={scss.product_title_container}>
					<h3 className={scss.product_title}>{title.toUpperCase()}</h3>
					{time > 0 && expiredDate ? <Timer expiredDate={expiredDate} /> : null}
				</div>
			) : null}
			<div className={scss.product_content}>{data?.map(product => <ProductCard product={product}/>)}</div>
			{viewAllLink ? (
				<div className={scss.product_view_all_link_container}>
					<Link className={scss.product_view_all_link} href={`/${language}/search${title ? `?title=${title}` : ''}`}>{t('link')}</Link>
				</div>
			) : null}
		</section>
	)
}
