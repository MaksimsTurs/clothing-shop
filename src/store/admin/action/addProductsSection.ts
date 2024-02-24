import { createAsyncThunk } from '@reduxjs/toolkit'

import fetcher from '@/lib/fetcher/fetcher'

import type { ServerResError } from '@/lib/fetcher/fetcher.type'

import { AddProductsSectionData, AddProductsSectionDataReturn } from '@/app/[locale]/admin/admin.type'

const addProductsSection = createAsyncThunk<AddProductsSectionDataReturn, AddProductsSectionData>(
	'admin/product-section/add',
	async(sectionData, thunkApi) => {
		try {
			const response = await fetcher.post<AddProductsSectionDataReturn>(`/admin/product-section/add`, sectionData)
			return response
		} catch (error) {
			return thunkApi.rejectWithValue((error as ServerResError).message)
		}
	}
)

export default addProductsSection