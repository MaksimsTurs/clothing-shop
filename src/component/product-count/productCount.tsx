'use client'

import scss from './productCount.module.scss'

import { Fragment, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Minus, Plus, ShoppingBag, Trash } from 'lucide-react'

import type { AppDispatch } from '@/store/store'
import type { ProductCountProps } from '@/component/product-count/productCount.type'

import { insertProductCount, removeProductCount } from '@/store/user/user'
import { useScopedI18n } from '@/localization/client'

export default function ProductCount({ product }: ProductCountProps) {
	const [productCount, setProductCount] = useState<number>(0)

	const dispatch = useDispatch<AppDispatch>()

	const t = useScopedI18n('product-page')

	const incrimentCount = (): void => {
		if(productCount >= product.stock) return
		setProductCount(prev => prev + 1)
	}

	const decrementCount = (): void => {
		if (productCount === 0) return
		setProductCount(prev => prev - 1)
	}

	const addProduct = (): void => {
		dispatch(insertProductCount({ count: productCount, product: product! }))
		setProductCount(0)
	}

	const removeProduct = (): void => {
		dispatch(removeProductCount({ count: productCount, product: product! }))
		setProductCount(0)
	}

	return (
		<div className={scss.product_count_container}>
			<section className={scss.product_count_body}>
				<button onClick={decrementCount}><Minus/></button>
				<p>{productCount}</p>
				<button onClick={incrimentCount}><Plus/></button>
			</section>
			{product ? 
				<Fragment>
					<button title={t('insert-product-in-cart')} onClick={addProduct} className={scss.product_dispatch_button}><ShoppingBag /></button>
					<button title={t('remove-product-from-cart')} onClick={removeProduct} className={scss.product_dispatch_button}><Trash /></button>
				</Fragment> : null}
		</div>
	)
}
