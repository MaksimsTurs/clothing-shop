import scss from './starRating.module.scss'

import type { StarRatingProps } from './starRating.type'

export default function StarRating({ rating }: StarRatingProps) {
	return (
		<div className={scss.star_rating_container}>
			{[...Array(Math.floor(rating))].map((_rating, index) => (
				<svg key={index} viewBox='0 0 576 512'>
					<path d='M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z' />
				</svg>
			))}
			{!Number.isInteger(rating) && (
				<svg viewBox='0 0 576 512'>
					<path d='M288 0c-12.2 .1-23.3 7-28.6 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3L288 439.8V0zM429.9 512c1.1 .1 2.1 .1 3.2 0h-3.2z' />
				</svg>
			)}
			<p className={scss.product_rating}>
				{rating}/<span>5</span>
			</p>
		</div>
	)
}
