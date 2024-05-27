import { createAsyncThunk } from "@reduxjs/toolkit";

import fetcher from "@/util/fetcher/fetcher";

import type { RemoveItemAction } from "../admin.type";

const removeItem = createAsyncThunk<Required<RemoveItemAction>, RemoveItemAction>(
  'admin/remove/item',
  async({ from, id }, thunkApi) => {
    try {
      const response = await fetcher.get<{ id: string }>(`/admin/remove/item/${id}/${from}`)
      return {...response, from }
    } catch(error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default removeItem