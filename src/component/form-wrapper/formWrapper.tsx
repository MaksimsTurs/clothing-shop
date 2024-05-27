import scss from './formWrapper.module.scss'

import type { FormWrapperProps } from './formWrapper.type'
import type { PropsWithChildren } from 'react'

import Link from 'next/link'

import { useScopedI18n } from '@/localization/client'

export default function FormWrapper({ 
	onSubmit, 
	title, 
	children, 
	serverError, 
	link, 
	styles, 
	isLoading, 
	className, 
	buttonLabel 
}: PropsWithChildren<FormWrapperProps>) {
	const t = useScopedI18n('form-wrapper')

	return (
		<form onSubmit={onSubmit} encType='multipart/form-data' style={{...styles?.formStyle}} className={`${className} ${scss.form_container}`}>
			{(typeof title === 'string' && title) ? <h3 className={scss.form_header}>{title}</h3> : title}
			<section className={scss.form_inputs} style={{...styles?.formInputsStyle}}>
				{children}
				{serverError ? <p className={scss.form_server_error}>{serverError.message}</p> : null}
				<div className={scss.form_submit_container}>
					<button disabled={isLoading} type='submit'>{buttonLabel || t("submit")}</button>
				</div>
				{link ? <Link className={scss.form_account_link} href={link.linkURL}>{link.text}</Link> : null}
			</section>
		</form>
	)
}
