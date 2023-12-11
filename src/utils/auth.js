
import { auth } from "../firebase"

export function logOut() {
  try {
    auth.signOut()
  } catch (error) {
    throw new Error("An error ocurred while loging out", { status: 500 })
  }
  return null
}
