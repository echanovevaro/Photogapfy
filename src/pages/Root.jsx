import { Outlet } from "react-router-dom"
import MainNavigation from "../components/MainNavigation"
import { Container } from "react-bootstrap"

function Root() {
  return (
    <Container>
      <MainNavigation />
      <main className="mt-4">
        <Outlet />
      </main>
    </Container>
  )
}

export default Root

// export async function loader() {
//   console.log("entrando a loader");
//   let token = localStorage.getItem("token");
//   console.log(token);
//   if (token) {
//     const expiration = localStorage.getItem("expiration");
//     if (!expiration || new Date(expiration) <= new Date()) {
//       console.log("expired");
//       // await fetch("/logout", { method: "post" });
//     } else {
//       const user = auth.currentUser;
//       let isAdmin = false;
//       let uid = null;
//       if (user !== null) {
//         uid = user.uid;
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);
//         isAdmin = docSnap.get("isAdmin");
//       }
//       return { token, uid, isAdmin };
//     }
//   }
//   return null;
// }
