import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";

import type { RemoveItemAction } from "../admin.type";

const removeItem = createAsyncThunk<Required<RemoveItemAction>, RemoveItemAction>(
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