import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { UserClient } from "../user.type";

const registration = createAsyncThunk<UserClient, FormData>(
  'user/registration',
  async(data, thunkApi) => {
    try {
      return await fetcher.post<UserClient>('/user/registration', undefined, data)
    } catch(error) {
      return thunkApi.rejectWithValue(new ResponseError(error))
    }
  }
)

export default registration