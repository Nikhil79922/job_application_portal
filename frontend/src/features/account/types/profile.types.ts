import type {
  MeUser,
} from "./me.types"

export interface ProfileResponse {

  success: boolean

  message: string

  data: MeUser
}