import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { UserData } from '../admin.type'

const updateUser = createAsyncThunk<UserData, FormData>(
	'admin/update/user',
	async(data, thunkApi) => {
		try {
			return await fetcher.post<UserData>(`/admin/update/user`, undefined, data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default updateUser