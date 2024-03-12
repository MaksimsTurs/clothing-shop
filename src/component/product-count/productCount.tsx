'use client'

import scss from './productCount.module.scss'

import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@/store/store'
import type { ProductCountProps } from '@/component/product-count/productCount.type'

import { addCartProductCount, removeCartProductCount } from '@/store/user/user'
import { useScopedI18n } from '@/i18n/client'

export default function ProductCount({ product }: ProductCountProps) {
	const tr = useScopedI18n('Product-Count')

	const [productCount, setProductCount] = useState<number>(0)

	const dispatch = useDispatch<AppDispatch>()

	const incrimentCount = (): void => setProductCount(prev => prev + 1)

	const decrementCount = (): void => {
		if (productCount === 0) return
		setProductCount(prev => prev - 1)
	}

	const addProduct = (): void => {
		dispatch(addCartProductCount({ count: productCount, product: product! }))
		setProductCount(0)
	}

	const removeProduct = (): void => {
		dispatch(removeCartProductCount({ count: productCount, product: product! }))
		setProductCount(0)
	}

	return (
		<div className={scss.product_count_container}>
			<section className={scss.product_count_body}>
				<button onClick={decrementCount}>
					<svg viewBox='0 0 24 24'>
						<path d='M21.375 12C21.375 12.2984 21.2565 12.5845 21.0455 12.7955C20.8345 13.0065 20.5484 13.125 20.25 13.125H3.75C3.45163 13.125 3.16548 13.0065 2.9545 12.7955C2.74353 12.5845 2.625 12.2984 2.625 12C2.625 11.7016 2.74353 11.4155 2.9545 11.2045C3.16548 10.9935 3.45163 10.875 3.75 10.875H20.25C20.5484 10.875 20.8345 10.9935 21.0455 11.2045C21.2565 11.4155 21.375 11.7016 21.375 12Z' />
					</svg>
				</button>
				<p>{productCount}</p>
				<button onClick={incrimentCount}>
					<svg viewBox='0 0 20 20'>
						<path d='M19.375 10C19.375 10.2984 19.2565 10.5845 19.0455 10.7955C18.8345 11.0065 18.5484 11.125 18.25 11.125H11.125V18.25C11.125 18.5484 11.0065 18.8345 10.7955 19.0455C10.5845 19.2565 10.2984 19.375 10 19.375C9.70163 19.375 9.41548 19.2565 9.2045 19.0455C8.99353 18.8345 8.875 18.5484 8.875 18.25V11.125H1.75C1.45163 11.125 1.16548 11.0065 0.954505 10.7955C0.743526 10.5845 0.625 10.2984 0.625 10C0.625 9.70163 0.743526 9.41548 0.954505 9.2045C1.16548 8.99353 1.45163 8.875 1.75 8.875H8.875V1.75C8.875 1.45163 8.99353 1.16548 9.2045 0.954505C9.41548 0.743526 9.70163 0.625 10 0.625C10.2984 0.625 10.5845 0.743526 10.7955 0.954505C11.0065 1.16548 11.125 1.45163 11.125 1.75V8.875H18.25C18.5484 8.875 18.8345 8.99353 19.0455 9.2045C19.2565 9.41548 19.375 9.70163 19.375 10Z' />
					</svg>
				</button>
			</section>
			{product ? 
				<Fragment>
					<button onClick={addProduct} className={scss.product_dispatch_button}>{tr('add-to-cart')}</button>
					<button onClick={removeProduct} className={scss.product_dispatch_button}>{tr('remove-from-cart')}</button>
				</Fragment> : null
			}
		</div>
	)
}
