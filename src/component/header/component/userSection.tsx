import scss from '../scss/userSection.module.scss'

import Link from 'next/link'
import { CircleUser, ShoppingBagIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import formatNumber from '@/util/formatNumber'

import { useCurrentLocale } from '@/localization/client'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

import useAuth from '@/custom-hook/useAuth/useAuth'

export default function UserSection() {
	const language = useCurrentLocale()

	const { cart } = useSelector<RootState, UserInitState>(state => state.user)
	const { user } = useAuth()

	const cartCount: number = cart?.reduce((prev, curr) => prev + curr.count, 0)

	return (
		<section className={scss.header_user_action_container}>
			<Link href={`/${language}/cart`}>
				{!cartCount || cartCount === 0 ? null : <p>{formatNumber(cartCount)}</p>}
				<ShoppingBagIcon />
			</Link>
			<Link href={user ? `/${language}/user/${user.id}` : `/${language}/registration`}>
				{user ? (
					<ExtendedIMG className={scss.header_user_avatar} width={320} height={320} src={user.avatar} alt={user.name}/>
				) : <CircleUser /> }
			</Link>
		</section>
	)
}
