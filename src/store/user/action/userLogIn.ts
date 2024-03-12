import { createAsyncThunk } from "@reduxjs/toolkit";

import type { UserLocalData } from "../user.type";
import type { UserLogin } from "@/app/[locale]/login/login.type";

import fetcher from "@/lib/fetcher/fetcher";

const userLogin = createAsyncThunk<UserLocalData, UserLogin>(
  'user/login',
  async (userData, thunkApi) => {
    try {
      const response = await fetcher.post<UserLocalData>('/user/login', userData)
      return response
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default userLogin