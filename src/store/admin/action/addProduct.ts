import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { CreateNewProduct } from '../admin.type'

const addProduct = createAsyncThunk<CreateNewProduct, FormData>(
  'admin/product/add',
  async (newProduct, thunkApi) => {
    try {
      const response = await fetcher.post<CreateNewProduct>(`/admin/product/add`, undefined, newProduct)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default addProduct