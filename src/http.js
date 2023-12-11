import { QueryClient } from "@tanstack/react-query"
import { collection, getDocs, doc, getDoc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "./firebase"
import { logOutWithRedirect } from "./utils/auth";
import { userExtendedSchema } from "./validation";

export const queryClient = new QueryClient()

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let data = [];
  querySnapshot.forEach((d) => {data.push({...d.data(), id: d.id})});
  return data;
}

export const fetchUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data= {...docSnap.data(), id: docSnap.id};
    return data;
  } else {
    throw new Error("User not found", {status: 404});
  }
}
export const createUser = async ({update, userId, user}) => {

  const validations = userExtendedSchema.safeParse(user)

  if (!validations.success) {
    const errors = {}
    for (const error of validations.error.errors) {
      if (!errors[error.path[0]]) errors[error.path[0]] = [error.message]
      else errors[error.path[0]].push(error.message)
    }

    const error = new Error('Valitation error check the fields', { status: 422 })
    error.errors = errors
    throw error
  }
  const data = validations.data
  try {
    if(update){
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        photoUrl: data.photoUrl,
        description: data.description,
        experience: data.experience,
        salary: data.salary,
        intro: data.intro,
        skills: data.skills,
        gallery: data.gallery,
        updatedAt: (new Date()).toISOString(),
      });
    } else {
      await setDoc(doc(db, "users", userId), {
        email: user.email,
        displayName: data.displayName,
        avatarUrl: data.avatarUrl,
        photoUrl: data.photoUrl,
        description: data.description,
        experience: data.experience,
        salary: data.salary,
        intro: data.intro,
        skills: data.skills,
        gallery: data.gallery,
        iUser: true,
        hidden:false,
        isAdmin: false,
        createdAt: (new Date()).toISOString(),
        updatedAt: (new Date()).toISOString(),
        likes: 0,
      })
    }
  } catch (e) {
    console.log(e)
    throw new Error( "Something went wrong", { status: 500 })
  }
}

export const deleteOwnUser = async (userId) => {
  let user = auth.currentUser;
  if(!user.uid === userId) {
    throw new Error("You can't delete another user's account", {status: 401});
  }
  try{
    await deleteDoc(doc(db, "users", user.uid));
    await user?.delete()
    console.log("User deleted");
    return await logOutWithRedirect();
  } catch(error) {
    throw new Error("An error ocurred while deleting the user", {status: 500});
  };
}
