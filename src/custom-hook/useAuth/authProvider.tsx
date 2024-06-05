import { type PropsWithChildren, createContext, useState } from "react";

import type { AuthContextObject, UserAuthState } from "./useAuth.type";

export const AuthContext = createContext<AuthContextObject>({ setState: undefined, state: undefined })

export default function AuthProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<UserAuthState>({ isLoading: false })

  return <AuthContext.Provider value={{ setState, state }}>{children}</AuthContext.Provider>
}