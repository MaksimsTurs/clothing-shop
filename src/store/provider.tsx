'use client'

import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { I18nProviderClient } from '@/localization/client'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

import { persistor, store } from './store'

import type { PropsWithChildren } from 'react'
import type { Languages } from '@/localization/client'

import AuthProvider from '../custom-hook/useAuth/authProvider'

export default function Provider({ children, lan, clientID }: PropsWithChildren<{ lan: Languages, clientID: string }>) {
	return (
		<ReduxProvider store={store}>
			<PayPalScriptProvider options={{ clientId: clientID, currency: 'EUR' }}>
				<PersistGate persistor={persistor}>
					<AuthProvider>
						<I18nProviderClient locale={lan}>{children}</I18nProviderClient>
					</AuthProvider>
				</PersistGate>				
			</PayPalScriptProvider>
		</ReduxProvider>
	)
}
