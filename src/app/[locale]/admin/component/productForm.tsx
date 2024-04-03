'use client'

import { useForm, type SubmitHandler } from 'react-hook-form'
import { Fragment, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import type { ProductFormProps } from '../admin.type'
import type { AppDispatch, RootState } from '@/store/store'
import type { AdminInitState } from '@/store/admin/admin.type'
import type { ProductData } from '@/store/admin/admin.type'

import FormWrapper from '@/component/form-wrapper/formWrapper'
import TextInput from '@/component/input/text-input/textInput'
import TextAreaInput from '@/component/input/text-area-input/textAreatInput'
import SelectInput from '@/component/input/select-input/selectInput'
import MultipleInput from '@/component/form-wrapper/component/multipleInput'
import ImgInput from '@/component/input/file-input/fileInput'
import FetchLoader from '@/component/loader/fetch-loader/fetchLoader'

import addProduct from '@/store/admin/action/addProduct'

import createFormData from '@/util/createFormData'

export default function ProductForm({ dispatchFunc, formWrapperTitle, findedProduct, section }: ProductFormProps) {
	const [selectedOption, setSelectOption] = useState<{ _id: string, title: string } | undefined>(section)
	
	const dispatch = useDispatch<AppDispatch>()
	
	const { isAdminActionLoading, productsSection, adminActionError } = useSelector<RootState, AdminInitState>(state => state.admin)
	
	const { register,	handleSubmit, formState: { errors } } = useForm<ProductData>({ mode: 'onSubmit' })

	//If product have sectionID then render 'None' on the section list
	const options: { _id: string, title: string }[] = findedProduct?.sectionID ? [] : productsSection.map(section => ({ _id: section._id, title: section.title }))
	
	const productHandler: SubmitHandler<ProductData> = (productData) => {
		const formData: FormData = createFormData(productData)

		formData.append('selectedSection', JSON.stringify(selectedOption))
		
		// Need for update the Product data.
		if(findedProduct) formData.append('productID', findedProduct._id)

		if(dispatchFunc) return dispatch(dispatchFunc(formData))
			
		dispatch(addProduct(formData))
	}

	return (
		<Fragment>
			{isAdminActionLoading && <FetchLoader />}
			<FormWrapper 
				serverError={adminActionError?.message} 
				onSubmit={handleSubmit(productHandler)} 
				isLoading={false} 
				title={formWrapperTitle} 
				styles={{ formStyle: { justifyContent: 'start' }, formInputsStyle: { maxWidth: '34rem' }}}>
				<TextInput<ProductData> 
					htmlFor='title'
					errors={errors}
					register={register} 
					type='text' 
					placeholder='Название продукта'/>
				<SelectInput<ProductData> selectedOption={selectedOption} setSelectOption={setSelectOption} options={options}/>
				<MultipleInput>
					<TextInput<ProductData> 
						htmlFor='price' 
						placeholder='Цена' 
						type='number' 
						register={register}
						minNum={0}
						errors={errors}/>
					<TextInput<ProductData> 
						htmlFor='stock' 
						placeholder='В наличии' 
						type='number' 
						register={register}
						errors={errors}/>
				<TextInput<ProductData> htmlFor='rating' placeholder='Рейтинг' type='number' step={0.1} maxNum={5} register={register}/>
				</MultipleInput>
				<TextAreaInput<ProductData> htmlFor='description' placeholder='Описание продукта' register={register}/>
				<ImgInput<ProductData> htmlFor='images' register={register} isMultiple labelText='Картинки продукта'/>
			</FormWrapper>
		</Fragment>
	)
}