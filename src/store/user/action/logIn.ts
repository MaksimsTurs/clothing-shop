import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { UserClient } from "../user.type";
import type { UserLogin } from "@/app/[locale]/login/page.type";

const logIn = createAsyncThunk<UserClient, UserLogin>(
  'user/login',
  async(data, thunkApi) => {
    try {
      return await fetcher.post<UserClient>('/user/login', undefined, data)
    } catch(error) {
      return thunkApi.rejectWithValue(new ResponseError(error))
    }
  }
)

export default logIn