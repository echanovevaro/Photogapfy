import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./pages/Root";
import Errors from "./pages/Errors";
import HomePage from "./pages/HomePage";
import { queryClient } from "./http";
import DetailUser from "./pages/DetailUser";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { AuthProvider } from "./context/authContext";
import ProfileFormPage from "./pages/ProfileFormPage";
import { logOutWithRedirect } from "./utils/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Errors />,
    children: [
      {
        index: true,
        element: <Navigate to="/photographers" replace />,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logOutWithRedirect,
      },
      {
        path: "photographers",
        element: <HomePage />,
      },
      {
        path: "photographers/:id",
        element: <DetailUser />,
      },
      {
        path: "photographers/:id/edit",
        element: <ProfileFormPage />,
      },
      {
        path: "photographers/new",
        element: <ProfileFormPage />,
      },
    ],
  },
]);
function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
