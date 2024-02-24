import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'
import type { UserExtended } from '../admin.type'
import { EditUserData } from '@/app/[locale]/user/userData.type'

const editUser = createAsyncThunk<UserExtended, FormData>(
	'admin/user/edit',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<UserExtended>(`/common/user/edit`, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue(error as string)
		}
	}
)

export default editUser