'use server'

import fetcher from '@/lib/fetcher/fetcher'

import { REVALIDATE_CONF } from '@/const'

import type { GetAll } from '../page.type'
import type { ServerResError } from '@/lib/fetcher/fetcher.type'

import parseJSONError from '@/lib/parseJSONError/parseJSONError'

export default async function actionGetAll(): Promise<GetAll | ServerResError> {
  try {
    return await fetcher.get<GetAll>('/', REVALIDATE_CONF)
  } catch(error) {
    return parseJSONError(error)
  }
}
