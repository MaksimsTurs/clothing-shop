import scss from './productCost.module.scss'

import { Fragment } from 'react'

import type { ProductCostProps } from './productCost.type'

export default function ProductCost({ cost, precent }: ProductCostProps) {
	return (
		<section className={scss.product_cost_container}>
			<p className={scss.product_cost}>{precent ? (cost - cost * precent).toFixed(2) : cost}$</p>
			{precent ? (
				<Fragment>
					<p className={scss.product_old_cost}>
						<del>{cost}$</del>
					</p>
					<p className={scss.product_action_percentage}>{precent * 100}%</p>
				</Fragment>
			) : null}
		</section>
	)
}
