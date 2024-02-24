import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'
import type { CreateNewProduct } from '../admin.type'

const addProduct = createAsyncThunk<CreateNewProduct, FormData>(
  'admin/product/add',
  async (newProduct, thunkApi) => {
    try {
      const response = await fetcher.post<CreateNewProduct>(`/admin/product/add`, newProduct)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue((error as ServerResError).message)
    }
  }
)

export default addProduct