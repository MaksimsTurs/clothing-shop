import scss from './productsContainer.module.scss'

import type { ProductsContainerProps } from './productsContainer.type'

import Timer from '../timer/timer'
import ProductCard from '../product-card/productCard'

import Link from 'next/link'
import { cookies } from 'next/headers'

import deleteSection from '@/app/[locale]/home/fetching/deleteSection'
import getTranslation from '@/localization/server'

export default async function ProductsContainer({ data, title, viewAllLink, expiredAt, precent, id, location }: ProductsContainerProps) {
	const t = await getTranslation('products-container')
	const language = cookies().get('locale')?.value || 'en'

	const time: number = expiredAt ? Date.parse(expiredAt) - Date.now() : 0

	if(time < 0 && title) await deleteSection(title)

	return (
		<section className={scss.product_container}>
			{title ? (
				<div className={scss.product_title_container}>
					<h3 className={scss.product_title}>{title.toUpperCase()}</h3>
					{time > 0 && expiredAt ? <Timer expiredAt={expiredAt} /> : null}
				</div>
			) : null}
			<div className={scss.product_content}>{data?.map(product => <ProductCard product={product} precent={product.precent || precent}/>)}</div>
			{viewAllLink ? (
				<div className={scss.product_view_all_link_container}>
					<Link className={scss.product_view_all_link} href={`/${language}/search${title ? `?id=${id}&location=${location}` : ''}`}>{t('link')}</Link>
				</div>
			) : null}
		</section>
	)
}