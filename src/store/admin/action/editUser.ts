import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/util/fetcher/fetcher'

import type { UserData } from '../admin.type'

const editUser = createAsyncThunk<UserData, FormData>(
	'admin/user/edit',
	async(data, thunkApi) => {
		try {
			return await fetcher.post<UserData>(`/admin/user/edit`, undefined, data)
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editUser