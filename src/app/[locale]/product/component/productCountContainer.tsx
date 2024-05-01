'use client'

import scss from '../page.module.scss'

import ProductCount from '@/component/product-count/productCount'

import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'
import type { ProductCountContainerProps } from '../page.type'

import { useSelector } from 'react-redux'
import { Fragment } from 'react'
import Link from 'next/link'
import { useCurrentLocale, useScopedI18n } from '@/localization/client'

export default function ProductCountContainer({ product }: ProductCountContainerProps) {
	const { yourself } = useSelector<RootState, UserInitState>(state => state.user)
	const language = useCurrentLocale()

	const t = useScopedI18n('product-page')

	return(
		<Fragment>
			{yourself ? 
				<section><ProductCount product={product}/></section> : 
				<section className={scss.product_user_undefined}>
					<Link href={`/${language}/registration`}>{t('sign-in')}</Link>
					<p>{t('or')}</p>
					<Link href={`/${language}/login`}>{t('log-in')}</Link>
					<p>{t('get-cart-acccess')!}</p>
				</section>}
		</Fragment>
	)
}
