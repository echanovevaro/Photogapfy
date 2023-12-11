
import { redirect } from "react-router-dom";
import { auth } from "../firebase"

export function logOutWithRedirect() {
  try {
    auth.signOut()
  } catch (error) {
    throw new Error("An error ocurred while loging out", { status: 500 })
  }
  return redirect("/auth?mode=login");
}

export function logOut() {
  try {
    auth.signOut()
  } catch (error) {
    throw new Error("An error ocurred while loging out", { status: 500 })
  }
  return null;
}
