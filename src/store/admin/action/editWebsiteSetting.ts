import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { WebsiteSettings } from '../admin.type'

const editWebsiteSetting = createAsyncThunk<WebsiteSettings, WebsiteSettings>(
  'admin/website-setting/edit',
  async (newSettings, thunkApi) => {
    try {
      return await fetcher.post<WebsiteSettings>('/admin/website-setting/edit', undefined, newSettings)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default editWebsiteSetting