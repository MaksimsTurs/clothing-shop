'use client'

import scss from '../scss/userCartData.module.scss'

import { useSelector } from 'react-redux'
import Link from 'next/link'
import Image from 'next/image'

import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'
import { useCurrentLocale } from '@/i18n/client'

export default function UserCartData() {
	const currLanguage = useCurrentLocale()
	const { cart } = useSelector<RootState, UserInitState>(state => state.user)

	return (
		<div className={scss.user_cart_data_container}>
			{cart.length === 0 ? (
				<div className={scss.user_cart_empty}>
          <p>You cart have no Products!</p>
          <Link href={`/${currLanguage}/search`}>Find Products?</Link>
        </div>
			) : (
				<ul className={scss.user_cart_product_list}>
					{cart.slice(0, 4).map(product => (
						<li className={scss.user_cart_product_item} key={product._id}>
							<Image width={1440} height={1440} src={product.images[0]} alt={product.title}/>
						</li>
					))}
					{cart.length > 9 ? <li className={scss.user_cart_product_cart_link}><Link href={'/cart'}>...</Link></li> : null}
				</ul>
			)}
		</div>
	)
}
