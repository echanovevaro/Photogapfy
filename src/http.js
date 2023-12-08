import { QueryClient } from "@tanstack/react-query"
import { collection, getDocs, doc, getDoc, deleteDoc } from "firebase/firestore";
import { auth, db } from "./firebase"
import { logOut } from "./utils/auth";
import { redirect } from "react-router-dom";

export const queryClient = new QueryClient()

export const fetchUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  let data = [];
  querySnapshot.forEach((d) => {data.push({...d.data(), id: d.id})});
  console.log(data);
  return data;
}

export const fetchUser = async (userId) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data= {...docSnap.data(), id: docSnap.id};
    console.log(data);
    return data;
  } else {
    throw new Error("User not found", {status: 404});
  }
}
export const createUser = async (user) => {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })

  return response.json()
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
    logOut();
    return redirect("/auth?mode=login");
  }catch(error) {
    throw new Error("An error ocurred while deleting the user", {status: 500});
  };
}
