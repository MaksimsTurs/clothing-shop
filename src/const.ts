import type { RevalidateConf } from "./lib/fetcher/fetcher.type"

export const REVALIDATE_CONF: RevalidateConf = { cache: 'no-cache' }

export const PROD_API_URL = 'https://clothing-shop-api.vercel.app'
export const DEV_API_URL = 'http://localhost:4000'
