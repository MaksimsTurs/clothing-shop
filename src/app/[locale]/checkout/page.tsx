'use client'

import scss from './page.module.scss'

import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { TriangleAlert } from 'lucide-react'

import type { CartCheckResult, ToCheck } from './page.type'
import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import CheckoutPrice from './component/checkoutPrice'
import CheckoutProducts from './component/checkoutProducts'
import Loading from './component/loading'

import checkoutWarning from '@/util/checkoutWarnings'

import useRequest from '@/custom-hook/useRequest/useRequest'

import { useCurrentLocale, useI18n } from '@/localization/client'

export default function PaypalCheckout() {
	const id: string | null = useSearchParams().get('id')

  const t = useI18n()
	const language = useCurrentLocale()

	const { cart } = useSelector<RootState, UserInitState>(state => state.user)

	const productIDs: ToCheck[] = cart.map(product => ({ _id: product._id, count: product.count }))

	const { data, isPending } = useRequest<CartCheckResult>({ URL: '/check-cart', body: id ? [{ _id: id, count: 1 }] : productIDs })
	
	const isEmpty: boolean = (data?.products.length === 0) && (data.totalItemsPrice <= 0)

	return (
		<main className={scss.page_checkout_container}>
			{isPending ? (
				<Loading />
			) : (
        <div className={scss.page_checkout_body}>
          {data?.warnings && data.warnings.length > 0 ? (
						<div className={scss.page_prices_warning_container}>
							<TriangleAlert width={20} height={20} />
							{data?.warnings.map(warning => <p key={warning}>{checkoutWarning(warning)}</p>)}
						</div>
					) : null}
          <div className={scss.page_prices_body}>
            <CheckoutProducts title={t('checkout-page.products-to-by')} products={data?.products}/>
            <div className={scss.page_product_price}>
              <CheckoutPrice
                title={t('total-price')}
                isLoading={isPending}
                prices={{ totalOrderPrice: data?.totalOrderPrice, delivery: data?.delivery, discount: data?.discount, totalItemsPrice: data?.totalItemsPrice, totalPriceWithDiscount: data?.totalPriceWithDiscount }}/>
							{isEmpty ? null : <Link href={`/${language}/checkout/create-order?checkID=${data?.checkID}`}>{t('checkout-page.create-order')}</Link>}
						</div>
          </div>
        </div>
      )}
		</main>
	)
}
