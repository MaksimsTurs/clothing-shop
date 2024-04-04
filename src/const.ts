import type { Currency } from "./global.type"
import type { RevalidateConf } from "./lib/fetcher/fetcher.type"

export const REVALIDATE_CONF: RevalidateConf = { cache: 'force-cache', time: 60 }
export const CURR_CURRENCY: Currency = '€'

export const PROD_API_URL: string = 'https://clothing-shop-api.vercel.app'
export const DEV_API_URL: string = 'http://localhost:4000'

export const PAYPAL_CLIENT_ID: string = 'AVFYw3ZWPOV2bLiPB40Y73orHILt5s7tpBnXiCkewatLIstMwsJ5EI9GoldnzZJIg3diqhltpHhTMOF-'
export const PAYPAL_SECRET_KEY_1: string = 'EKyQGPS4rBr3bWrDuWsHlE6r4FAE2_RKOXIfVARv7P5lsvu84ycsyy-be4tjcbSIRzT79byXfw9d-niH'
