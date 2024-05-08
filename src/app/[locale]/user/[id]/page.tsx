import scss from '../page.module.scss'

import type { PageProps } from '../page.type'
import type { Metadata } from 'next'

import getUserByID from '../fetching/getUserByID'

import defaultMetadata from '../../defaultMeta'

import { CircleUserRound, ShoppingBasket, AlignJustify } from 'lucide-react'

import UserDataWrapper from '../component/userDataWrapper'
import UserHeader from '../component/userHeader'
import OrderList from '../component/orderList'
import CartList from '../component/cartList'

import getTranslation from '@/localization/server'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const user = await getUserByID(params.id)

	return {...defaultMetadata(), title: user.name }
}

export default async function Page({ params }: PageProps) {
  const user = await getUserByID(params.id)
	const t = await getTranslation('user-page')

	return (
		<main className={scss.user_page_container}>
			<div className={scss.user_page_body}>
				<UserDataWrapper title={`${t('user-information')}:`} icon={<CircleUserRound/>}>
					<UserHeader userData={user}/>
				</UserDataWrapper>
				<UserDataWrapper title={`${t('user-orders')}:`} icon={<ShoppingBasket/>}>
					<OrderList orders={user.order}/>
				</UserDataWrapper>
				<UserDataWrapper title={`${t('user-cart')}:`} icon={<AlignJustify/>}>
					<CartList/>
				</UserDataWrapper>
			</div>
		</main>
	)
}