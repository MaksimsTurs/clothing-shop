import scss from './starRating.module.scss'

import { Star, StarHalf } from 'lucide-react'

import type { StarRatingProps } from './starRating.type'

export default function StarRating({ rating }: StarRatingProps) {
	return (
		<div className={scss.star_rating_container}>
			{[...Array(Math.floor(rating || 0))].map((_rating, index) => <Star key={index}/>)}
			{!Number.isInteger(rating || 0.00) && <StarHalf />}
			<p className={scss.product_rating}>{rating || 0.00}/<span>5</span></p>
		</div>
	)
}
