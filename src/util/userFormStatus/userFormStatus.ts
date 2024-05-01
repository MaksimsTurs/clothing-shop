import type { UserClient } from "@/store/user/user.type";

import './style.scss'

export default function userFormStatus(errors?: any, yourself?: UserClient) {
  const isFormOk: boolean = (Object.keys(errors).length === 0) ? true : false
	const scssClass: string = (isFormOk && yourself) ? 'title_success' : isFormOk ? 'title_default' : 'title_notvalid'
 
  return { isFormOk, scssClass }
}