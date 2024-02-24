import scss from './formWrapper.module.scss'

import type { FormWrapperProps } from './formWrapper.type'
import type { FieldValues } from 'react-hook-form'
import type { PropsWithChildren } from 'react'

import Link from 'next/link'
import { useScopedI18n } from '@/i18n/client'

export default function FormWrapper<T extends FieldValues>({
	onSubmit,
	title,
	children,
	serverError,
	link,
	styles,
	isLoading
}: PropsWithChildren<FormWrapperProps<T>>) {
	const tr = useScopedI18n("User-Log")

	return (
		<form
			onSubmit={onSubmit}
			encType='multipart/form-data'
			style={{...styles?.formStyle}}
			className={scss.form_container}>
			{title && <h3 className={scss.form_header}>{title}</h3>}
			<section className={scss.form_inputs} style={{...styles?.formInputsStyle}}>
				{children}
				{serverError && <p className={scss.form_server_error}>{serverError}</p>}
				<div className={scss.form_submit_container}>
					<button disabled={isLoading} type='submit'>{tr("submit-button")}</button>
				</div>
				{link && (
					<Link className={scss.form_account_link} href={link.linkURL}>
						{link.text}
					</Link>
				)}
			</section>
		</form>
	)
}
