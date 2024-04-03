'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { I18nProviderClient } from '@/i18n/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { persistor, store } from './store'

import type { PropsWithChildren } from 'react'

import { PAYPAL_CLIENT_ID } from '@/const'

import queryCache from '@/util/queryCache'

export default function Provider({ children, locale }: PropsWithChildren<{ locale: string }>) {
	return (
		<QueryClientProvider client={queryCache}>
			<PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'EUR' }}>
				<I18nProviderClient locale={locale}>
					<ReduxProvider store={store}>
						<PersistGate loading={null} persistor={persistor}>
							{children}
						</PersistGate>
					</ReduxProvider>
				</I18nProviderClient>
			</PayPalScriptProvider>	
		</QueryClientProvider>
	)
}
