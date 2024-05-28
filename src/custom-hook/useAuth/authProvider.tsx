import { type PropsWithChildren, createContext, useState } from "react";

import type { AuthContextObject, UserSession } from "./useAuth.type";

export const AuthContext = createContext<AuthContextObject>({ setUser: undefined, user: undefined })

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserSession | undefined>(undefined)

  return <AuthContext.Provider value={{ setUser, user }}>{children}</AuthContext.Provider>
}