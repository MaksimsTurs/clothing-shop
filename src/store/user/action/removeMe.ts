import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";
import ResponseError from "@/util/exeption/ResponseError";

const removeMe = createAsyncThunk<void, string>(
  'user/remove',
  async(data, thunkApi) => {
    try {
      await fetcher.get(`/user/remove/${data}`)
    } catch(error) {
      return thunkApi.rejectWithValue(new ResponseError(error))
    }
  }
)

export default removeMe