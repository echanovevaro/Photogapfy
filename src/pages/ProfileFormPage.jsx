import { Navigate, useParams } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import UserForm from "../components/UserForm";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../http";

function ProfileFormPage() {
  const { id } = useParams();
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
  } else if (currentUser.uid !== id) {
    return <Navigate to={`/photographers/${currentUser.uid}`} replace />;
  }

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["users", { id }],
    queryFn: () => fetchUser(id),
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
        <Navigate to="/photographers/new" replace />
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
