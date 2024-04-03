import scss from './productCost.module.scss'

import { Fragment } from 'react'

import type { ProductCostProps } from './productCost.type'

import { CURR_CURRENCY } from '@/const'

export default function ProductCost({ price, precent }: ProductCostProps) {
	return (
		<section className={scss.product_cost_container}>
			<p className={scss.product_cost}>{precent ? (price - price * precent).toFixed(2) : price} {CURR_CURRENCY}</p>
			{precent ? (
				<Fragment>
					<p className={scss.product_old_cost}><del>{price} {CURR_CURRENCY}</del></p>
					<p className={scss.product_action_percentage}>{(precent * 100).toFixed()}%</p>
				</Fragment>
			) : null}
		</section>
	)
}
