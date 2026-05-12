import { User } from "./user.type"

export interface AuthState {
  user: User | null
  
  accessToken: string | null

  isAuthenticated: boolean

  setAuth: (
    user: User,
    accessToken: string
  ) => void

  logout: () => void

  hasHydrated: boolean

  setHasHydrated: (
    state: boolean
  ) => void

  hasTriedRestore: boolean

setHasTriedRestore:
  (state: boolean) => void
}