import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { ProductData } from '../admin.type'

const insertProduct = createAsyncThunk<ProductData, FormData>(
  'admin/insert/product',
  async (newProduct, thunkApi) => {
    try {
      return await fetcher.post<ProductData>(`/admin/insert/product`, undefined, newProduct)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default insertProduct