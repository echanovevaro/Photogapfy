import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import UserForm from "../components/UserForm";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../http";

function ProfileFormPage() {
  const { currentUser } = useAuthContext();
  if (currentUser == false) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-75">
        <Spinner animation="grow" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  } else if (!currentUser) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users", { id: currentUser.uid }],
    queryFn: () => fetchUser(currentUser.uid),
    retry: (failureCount, error) => {
      if (error.message === "User not found") return false;
      return failureCount < 2;
    },
    staleTime: Infinity,
  });

  if (isError && error.message !== "User not found") {
    throw error;
  }
  return (
    <>
      {isPending && (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {isError && error.message === "User not found" && (
        <div className="pt-5">
          <UserForm />
        </div>
      )}
      {data && (
        <div className="pt-5">
          <UserForm user={data} />
        </div>
      )}
    </>
  );
}

export default ProfileFormPage;
