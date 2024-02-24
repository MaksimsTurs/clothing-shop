import { createAsyncThunk } from "@reduxjs/toolkit";

import type { UserLocalData } from "../user.type";

import fetcher from "@/lib/fetcher/fetcher";

const editUser = createAsyncThunk<UserLocalData, FormData>(
  'user/edit',
  async(userData, thunkApi) => {
    try {
      const response = await fetcher.post<UserLocalData>(`/common/user/edit`, userData)
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default editUser