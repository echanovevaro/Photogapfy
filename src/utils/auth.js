
import { auth } from "../firebase"

export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration")
  const expirationDate = new Date(storedExpirationDate)
  const now = new Date()
  const duration = expirationDate.getTime() - now.getTime()
  return duration
}

export function getAuthToken() {
  const token = localStorage.getItem("token")

  if (!token) {
    return null
  }

  const tokenDuration = getTokenDuration()

  if (tokenDuration < 0) {
    return null
  }

  return token
}

export async function tokenLoader() {
  const token = getAuthToken()
  if (token) {
    console.log("tokenLoader: token exists")
    const user = auth.currentUser
    if (user) {
      console.log("tokenLoader: user exists")
      const uid = user.uid
      console.log("tokenLoader: uid = " + uid)
      const docRef = doc(db, "users", user.uid)
      const docSnap = await getDoc(docRef)
      console.log("tokenLoader: docSnap = " + JSON.stringify(docSnap))
      let isAdmin = docSnap.get("isAdmin")
      console.log("tokenLoader: isAdmin = " + isAdmin)
      return { token, uid, isAdmin }
    }
    return { token }
  }
  return null
}

export function checkAuthLoader() {
  const token = getAuthToken()

  if (!token || !auth.currentUser) {
    return redirect("/auth?mode=login")
  }
  return auth.currentUser.uid
}

export function logOut() {
  try {
    auth.signOut()
  } catch (error) {
    throw new Error("An error ocurred while loging out", { status: 500 })
  }
  return null
}
