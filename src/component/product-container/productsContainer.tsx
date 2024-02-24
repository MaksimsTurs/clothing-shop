'use client'

import scss from './productsContainer.module.scss'

import type { ProductsContainerProps } from './productContainer.type'

import Link from 'next/link'
import Image from 'next/image'

import StarRating from '../star-rating/starRating'
import ProductCost from '../product-cost/productCost'
import Timer from '../timer/timer'
import { useCurrentLocale, useScopedI18n } from '@/i18n/client'

export default function ProductsContainer({
	data,
	title,
	viewAllLink,
	expiredDate,
}: ProductsContainerProps) {
	const currLanguage = useCurrentLocale()
	const tr = useScopedI18n('Products-Container')

	return (
		<section className={scss.product_container}>
			{title && expiredDate ? (
				<div className={scss.product_title_container}>
					<h3 className={scss.product_title}>{title.toUpperCase()}</h3>
					<Timer expiredDate={expiredDate} />
				</div>
			) : (
				title && <h3 className={scss.product_title}>{title.toUpperCase()}</h3>
			)}
			<div className={scss.product_content}>
				{data.map(product => (
					<Link
						key={product._id}
						href={`/${currLanguage}/product/${product._id}`}
						className={scss.product_article_container}>
						<Image
							width={1440}
							height={200}
							className={scss.product_img}
							src={product.images[0]}
							alt={product.title}
							priority
						/>
						<h4 className={scss.product_name}>{product.title}</h4>
						<StarRating rating={product.rating || 0} />
						<ProductCost cost={product.price} precent={product.precent} />
					</Link>
				))}
			</div>
			{viewAllLink && (
				<div className={scss.product_view_all_link_container}>
					<Link
						className={scss.product_view_all_link}
						href={`/${currLanguage}/search${title ? `?title=${title}` : ''}`}>
						{tr('view-all.link')}
					</Link>
				</div>
			)}
		</section>
	)
}
