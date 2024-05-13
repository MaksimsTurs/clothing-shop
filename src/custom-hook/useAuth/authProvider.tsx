import { type PropsWithChildren, createContext, useState } from "react";

import type { AuthContextObject, UserSession } from "./useAuth.type";

import cookies from "@/util/coockies";

export const AuthContext = createContext<AuthContextObject>({ setUser: undefined, user: undefined })

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, _setUser] = useState<UserSession | undefined>(undefined)

  const setUser = new Proxy(_setUser, {
    apply: function(_target, _this, argArray) {
      const _user = argArray[0] as UserSession
      _setUser(_user)
      if(_user) cookies.set('token', _user.token, 2)
      else cookies.set('token', 'undefined')
    }
  })

  return <AuthContext.Provider value={{ setUser, user }}>{children}</AuthContext.Provider>
}