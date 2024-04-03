import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { UserData } from '../admin.type'

const editUser = createAsyncThunk<UserData, FormData>(
	'admin/user/edit',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<UserData>(`/common/user/edit`, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editUser