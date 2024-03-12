import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { UserExtended } from '../admin.type'

const editUser = createAsyncThunk<UserExtended, FormData>(
	'admin/user/edit',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<UserExtended>(`/common/user/edit`, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error)
		}
	}
)

export default editUser