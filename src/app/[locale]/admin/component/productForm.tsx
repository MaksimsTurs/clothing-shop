'use client'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { ProductFormAction, ProductFormProps } from '../admin.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { AdminInitState } from '@/store/admin/admin.type'
import type { UserInitState } from '@/store/user/user.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import TextAreaInput from '@/component/input/text-area-input/textAreatInput'
import SelectInput from '@/component/input/select-input/selectInput'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import ImgInput from '@/component/input/file-input/fileInput'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'
import addProduct from '@/store/admin/action/addProduct'

export default function ProductForm({ dispatchFunc, formWrapperTitle, productID, section }: ProductFormProps) {
	const dispatch = useDispatch<AppDispatch>()
	
	const { isAdminActionLoading, productsSection } = useSelector<RootState, AdminInitState>(state => state.admin)
	const { userLocal } = useSelector<RootState, UserInitState>(state => state.user)

	const [selectedOption, setSelectOption] = useState<{ _id: string, title: string } | undefined>(section)
	
	const { register,	handleSubmit } = useForm<ProductFormAction>()
	const createProduct: SubmitHandler<ProductFormAction> = (productData) => {
		const productFormData = new FormData()

		for (let [key, value] of Object.entries(productData)) {
			if (value instanceof FileList) {
				for (let image in value) if(value[image] instanceof File) productFormData.append('images', value[image])
			} else {
				productFormData.append(key, value as string)
			}
		}

		productFormData.append('token', userLocal?.token || 'null')
		productFormData.append('selectedSection', JSON.stringify(selectedOption))
		
		if(productID) productFormData.append('productID', productID)

		if(dispatchFunc) {
			dispatch(dispatchFunc(productFormData))
		} else {
			dispatch(addProduct(productFormData))
		}
	}

	return (
		<Fragment>
			{isAdminActionLoading && <FetchLoader />}
			<FormWrapper<ProductFormAction>
				onSubmit={handleSubmit(createProduct)}
				isLoading={false}
				title={formWrapperTitle}>
				<TextInput<ProductFormAction>
					htmlFor='title'
					register={register}
					type='text'
					placeholder='Product Name'
				/>
				<SelectInput<ProductFormAction>
					selectedOption={selectedOption}
					setSelectOption={setSelectOption}
					options={productsSection.map(section => ({ _id: section._id, title: section.title }))}
				/>
				<MultipleInput>
					<TextInput<ProductFormAction>
						htmlFor='price'
						placeholder='Cost'
						type='number'
						register={register}
					/>
					<TextInput<ProductFormAction>
						htmlFor='inStock'
						placeholder='In stock'
						type='number'
						register={register}
					/>
				</MultipleInput>
				<TextAreaInput<ProductFormAction>
					htmlFor='description'
					placeholder='Product Description'
					register={register}
				/>
				<ImgInput<ProductFormAction>
					htmlFor='images'
					register={register}
					isMultiple
					labelText='Add Product images'
				/>
			</FormWrapper>
		</Fragment>
	)
}
