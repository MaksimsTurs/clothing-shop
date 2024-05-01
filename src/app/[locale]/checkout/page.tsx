'use client'

import scss from './page.module.scss'

import { useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { TriangleAlert } from 'lucide-react'
import { SyntheticEvent, useState } from 'react'

import type { CartCheckResult, ToCheck } from './page.type'
import type { RootState } from '@/store/store'
import type { UserInitState } from '@/store/user/user.type'

import CheckoutPrice from './component/checkoutPrice'
import CheckoutProducts from './component/checkoutProducts'
import PaypalButton from './component/paypalButton'
import CheckoutLoader from './component/checkoutLoader'

import checkoutWarning from '@/util/checkoutWarnings'

import useRequest from '@/custom-hook/useRequest/useRequest'

import { useScopedI18n } from '@/localization/client'

export default function PaypalCheckout() {
	const [adress, setAdress] = useState<string>(localStorage.getItem('adress') || '')

	const id: string | null = useSearchParams().get('id')

  const t = useScopedI18n('checkout-page')

	const changeAdress = (event: SyntheticEvent<HTMLInputElement>): void => {
		setAdress(event.currentTarget.value)
		localStorage.setItem('adress', event.currentTarget.value)
	}

	const { cart } = useSelector<RootState, UserInitState>(state => state.user)

	const productIDs: ToCheck[] = cart.map(product => ({ _id: product._id, count: product.count }))

	const { data, isPending } = useRequest<CartCheckResult>({ URL: '/check-cart', body: id ? [{ _id: id, count: 1 }] : productIDs })

	localStorage.setItem('checkID', data?.checkID as string)

	return (
		<main className={scss.page_checkout_container}>
			{isPending ? (
				<CheckoutLoader />
			) : (
        <div className={scss.page_checkout_body}>
          {data?.warnings && data.warnings.length > 0 ? (
						<div className={scss.page_prices_warning_container}>
							<TriangleAlert width={20} height={20} />
							{data?.warnings.map(warning => <p key={warning}>{checkoutWarning(warning)}</p>)}
						</div>
					) : null}
          <div className={scss.page_prices_body}>
            <CheckoutProducts title={t('products-to-by')} products={data?.products}/>
            <div className={scss.page_product_price}>
              <CheckoutPrice
                title={t('end-price')}
                isLoading={isPending}
                prices={{
                  totalOrderPrice: data?.totalOrderPrice,
                  delivery: data?.delivery,
                  discount: data?.discount,
                  totalItemsPrice: data?.totalItemsPrice,
                  totalPriceWithDiscount: data?.totalPriceWithDiscount,
                }}
              />
              <input 
                onInput={changeAdress} 
                className={scss.page_order_adress} 
                value={adress} 
                type='text' 
                placeholder={t('address')} />
              {adress ? (
                <PaypalButton />
              ) : <p style={{ width: 'fit-content' }} className={scss.page_prices_warning_container}>{t('address-required')}!</p>}
            </div>
          </div>
        </div>
      )}
		</main>
	)
}
