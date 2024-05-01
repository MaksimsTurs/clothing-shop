import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

import type { UserClient } from "../user.type";

const editMe = createAsyncThunk<UserClient, FormData>(
  'user/edit',
  async(data, thunkApi) => {
    try {
      return await fetcher.post<UserClient>('/user/edit', undefined, data)
    } catch(error) {
      return thunkApi.rejectWithValue(new ResponseError(error))
    }
  }
)

export default editMe