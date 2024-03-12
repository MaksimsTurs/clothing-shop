import { createAsyncThunk } from "@reduxjs/toolkit";

import type { GetFilteredProduct, GetFilteredProductReturn } from "../product.type"

import fetcher from "@/lib/fetcher/fetcher";

const getFilteredProduct = createAsyncThunk<GetFilteredProductReturn, GetFilteredProduct>(
  'product/filter',
  async (filter, thunkApi) => {
    try {
      const response = fetcher.post<GetFilteredProductReturn>('/product/pagination/filter', filter)
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default getFilteredProduct