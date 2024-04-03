import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/lib/fetcher/fetcher";

import type { RemoveFrom } from "../admin.type";

const removeItem = createAsyncThunk<{ id: string, from: RemoveFrom }, { id: string, from: RemoveFrom }>(
  'admin/item/remove', 
  async({ from, id }, thunkApi) => {
    try {
      const response = await fetcher.get<{ id: string }>(`/admin/delete-item/${id}/${from}`)
      return {...response, from }
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default removeItem