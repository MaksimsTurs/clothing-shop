
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import { AuthContext } from "./authProvider";

import type { Fetching } from "@/global.type";
import type { AuthOption, UserSession } from "./useAuth.type";

import fetcher from "@/util/fetcher/fetcher";
import createFormData from "@/util/createFormData";
import cookies from "@/util/coockies";

export default function useAuth() {
  const [state, setState] = useState<Pick<Fetching<undefined>, 'error' | 'isLoading'>>({ isLoading: false, error: undefined })

  const authContext = useContext(AuthContext)
  const router = useRouter()

  const authFunctions = {
    ...state,
    user: authContext.user,
    auth: async function(authOption: AuthOption) {
      try {
        setState({ isLoading: true, error: undefined })
        let response: UserSession | undefined = undefined

        if(authOption.type === 'get') response = await fetcher.get(authOption.URL, undefined, authOption.header)
        else response = await fetcher.post(authOption.URL, undefined, authOption.body, authOption.header)
        
        authContext.setUser!(response)
        setState({ isLoading: false, error: undefined })
        if(authOption.redirectOnSucces) router.replace(authOption.redirectOnSucces)
      } catch(error) {
        setState({ isLoading: false, error: JSON.parse(error as string) })
      }
    },
    update: async function(authOption: Pick<AuthOption, 'URL' | 'body'>) {
      try {
        setState({ isLoading: true, error: undefined })
        await fetcher.post<UserSession>(authOption.URL, undefined, createFormData({...authOption.body, token: authContext.user?.token, id: authContext.user?.id }))
        setState({ isLoading: false, error: undefined })
      } catch(error) {
        setState({ isLoading: false, error: JSON.parse(error as string) })
      }
    },
    isAuth: async function() {
      try {
        setState({ isLoading: true, error: undefined })
        const token = cookies.get('token') || authContext.user?.token
        const response = await fetcher.post<UserSession | undefined>(`/user/auth`, undefined, undefined, { 'Authorization': `Bearer ${token}` })
        authContext.setUser!(response)
        setState({ isLoading: false, error: undefined })
      } catch(error) {
        setState({ isLoading: false, error: JSON.parse(error as string) })
      }
    },
    quit: function (authOption: Partial<Pick<AuthOption, 'redirectOnSucces'>>) {
      authContext.setUser!(undefined)
      if(authOption.redirectOnSucces) router.replace(authOption.redirectOnSucces)
    }
  }

  return authFunctions
}