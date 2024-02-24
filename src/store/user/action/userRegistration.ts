import { createAsyncThunk } from "@reduxjs/toolkit";

import type { UserLocalData } from "../user.type";
import type { ServerResError } from "@/lib/fetcher/fetcher.type";

import fetcher from "@/lib/fetcher/fetcher";

const userRegistration = createAsyncThunk<UserLocalData, FormData>(
  'user/registration',
  async (userData, thunkApi) => {
    try {
      const response = await fetcher.post<UserLocalData>('/user/registration', userData)
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error as string)
    }
  }
)

export default userRegistration