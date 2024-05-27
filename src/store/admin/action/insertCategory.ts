import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { InsertOrUpdateCategory, ProductCategory } from '../admin.type'

const insertCategory = createAsyncThunk<ProductCategory, InsertOrUpdateCategory>(
  'admin/insert/category',
  async (newProduct, thunkApi) => {
    try {
      return await fetcher.post<ProductCategory>(`/admin/insert/category`, undefined, newProduct)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default insertCategory