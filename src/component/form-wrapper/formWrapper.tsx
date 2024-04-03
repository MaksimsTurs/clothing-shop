import scss from './formWrapper.module.scss'

import type { FormWrapperProps } from './formWrapper.type'
import type { PropsWithChildren } from 'react'

import Link from 'next/link'

import { useScopedI18n } from '@/i18n/client'

export default function FormWrapper({ onSubmit, title, children, serverError, link, styles, isLoading }: PropsWithChildren<FormWrapperProps>) {
	const tr = useScopedI18n("User-Log")

	return (
		<form onSubmit={onSubmit} encType='multipart/form-data' style={{...styles?.formStyle}} className={scss.form_container}>
			{title ? <h3 className={scss.form_header}>{title}</h3> : null}
			<section className={scss.form_inputs} style={{...styles?.formInputsStyle}}>
				{children}
				{
					serverError ? 
						<p className={scss.form_server_error}>
							<svg viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
							{serverError}
						</p> : null
				}
				<div className={scss.form_submit_container}>
					<button disabled={isLoading} type='submit'>{tr("submit-button")}</button>
				</div>
				{link ? <Link className={scss.form_account_link} href={link.linkURL}>{link.text}</Link> : null}
			</section>
		</form>
	)
}
