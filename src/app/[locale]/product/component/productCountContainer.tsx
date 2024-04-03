'use client'

import scss from '../scss/page.module.scss'

import ProductCount from '@/component/product-count/productCount'

import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'
import type { ProductCountContainerProps } from '../product.type'

import { useSelector } from 'react-redux'

export default function ProductCountContainer({ product }: ProductCountContainerProps) {
	const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

	return <section className={scss.product_border_bottom}>{userLocal ? <ProductCount product={product} /> : null}</section>
}
