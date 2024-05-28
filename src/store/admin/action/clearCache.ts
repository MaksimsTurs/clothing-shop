import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";

const clearCache = createAsyncThunk(
  'admin/clear/cache',
  async(_, thunkApi) => {
    try {
      await fetcher.get('/admin/clear/cache')
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default clearCache