import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "./authProvider";

import type { AuthOption, UserSession } from "./useAuth.type";

import fetcher from "@/util/fetcher/fetcher";
import createFormData from "@/util/createFormData";
import cookies from "@/util/coockies";

export default function useAuth() {
  const authContext = useContext(AuthContext)
  const router = useRouter()

  return {
    ...authContext.state,
    create: async function(authOption: AuthOption) {
      try {
        authContext.setState!({ isLoading: true, error: undefined })
        
        const response = await fetcher.post<UserSession>(authOption.URL, undefined, authOption.body, authOption.header)
         
        cookies.set('EB_TOKEN', response.token, 2)
        authContext.setState!({ isLoading: false, error: undefined, user: response })

        if(authOption.redirectOnSucces) router.push(authOption.redirectOnSucces)
      } catch(error) {
        authContext.setState!({ isLoading: false, error: JSON.parse(error as string) })
      }
    },
    update: async function(authOption: Pick<AuthOption, 'URL' | 'body'>) {
      try {
        authContext.setState!({ isLoading: true, error: undefined })

        await fetcher.post<UserSession>(authOption.URL, undefined, createFormData({...authOption.body, token: authContext.state?.user, id: authContext.state?.user?.id }))
      } catch(error) {
        authContext.setState!({ isLoading: false, error: JSON.parse(error as string) })
      }
    },
    isAuth: async function() {
      try {
        authContext.setState!({ isLoading: true, error: undefined })

        const token = cookies.get('EB_TOKEN') || authContext.state?.user?.token
        const response = await fetcher.post<UserSession | undefined>(`/user/auth`, undefined, undefined, { 'Authorization': `Bearer ${token}` })
        
        authContext.setState!({ error: undefined, isLoading: false, user: response })
      } catch(error) {
        authContext.setState!({ isLoading: false })
      }
    },
    quit: function (authOption: Partial<Pick<AuthOption, 'redirectOnSucces'>>) {
      authContext.setState!({ user: undefined, isLoading: false })
      cookies.set('EB_TOKEN', 'undefined')
      if(authOption.redirectOnSucces) router.replace(authOption.redirectOnSucces)
    }
  }
}