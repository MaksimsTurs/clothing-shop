import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { WebsiteSettings } from '../admin.type'

const updateSetting = createAsyncThunk<WebsiteSettings, WebsiteSettings>(
  'admin/update/settings',
  async (newSettings, thunkApi) => {
    try {
      return await fetcher.post<WebsiteSettings>('/admin/update/setting', undefined, newSettings)
    } catch (error) {
      return thunkApi.rejectWithValue(error)
    }
  }
)

export default updateSetting