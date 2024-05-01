import scss from './productCost.module.scss'

import { Fragment } from 'react'

import type { ProductCostProps } from './productCost.type'

export default function ProductCost({ price, precent, className }: ProductCostProps) {
	return (
		<section className={`${scss.product_cost_container} ${className}`}>
			<p className={scss.product_cost}>{precent ? (price - price * precent).toFixed(2) : price}€</p>
			{precent ? (
				<Fragment>
					<p className={scss.product_old_cost}><del>{price}€</del></p>
					<p className={scss.product_action_percentage}>{(precent * 100).toFixed()}%</p>
				</Fragment>
			) : null}
		</section>
	)
}
