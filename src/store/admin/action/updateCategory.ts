import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { InsertOrUpdateCategory, ProductCategory } from '../admin.type'

const updateCategory = createAsyncThunk<ProductCategory, InsertOrUpdateCategory>(
  'admin/update/category',
  async (newData, thunkApi) => {
    try {
      return await fetcher.post<ProductCategory>(`/admin/update/category`, undefined, newData)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default updateCategory