import scss from '../header.module.scss'

import Link from 'next/link'
import { CircleUser, ShoppingBagIcon } from 'lucide-react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import formatNumber from '@/util/formatNumber'

import { useCurrentLocale } from '@/localization/client'

import ExtendedIMG from '@/component/extended-img/extendedIMG'

export default function UserSection() {
	const language = useCurrentLocale()

	const { cart, yourself } = useSelector<RootState, UserInitState>(state => state.user)

	const cartCount: number = cart?.reduce((prev, curr) => prev + curr.count, 0)

	return (
		<section className={scss.header_user_action_container}>
			{yourself ? <Link href={`/${language}/cart`}>
				{!cartCount || cartCount === 0 ? null : <p>{formatNumber(cartCount)}</p>}
				<ShoppingBagIcon color='white'/>
			</Link> : null}
			<Link href={yourself ? `/${language}/user/${yourself.id}` : `/${language}/registration`}>
				{yourself && yourself.avatar ? (
					<ExtendedIMG className={scss.header_user_avatar} width={320} height={320} src={yourself.avatar} alt={yourself.name}/>
				) : <CircleUser color='white'/> }
			</Link>
		</section>
	)
}
