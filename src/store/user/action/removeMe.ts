import { createAsyncThunk } from "@reduxjs/toolkit"

import fetcher from "@/lib/fetcher/fetcher"

const removeMe = createAsyncThunk<{ isRemoved: boolean }, string>(
  'user/remove',
  async (token, thunkApi) => {
    try {
      const response = await fetcher.get<{ isRemoved: boolean }>(`/user/delete/${token}`)
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default removeMe