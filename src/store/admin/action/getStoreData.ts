import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/lib/fetcher/fetcher";

import type { GetStoreData } from "../admin.type";

const getStoreData = createAsyncThunk<GetStoreData>(
  'admin/get-store',
  async (_, thunkApi) => {
    try {
      const response = await fetcher.get<GetStoreData>('/admin/get/store')
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default getStoreData