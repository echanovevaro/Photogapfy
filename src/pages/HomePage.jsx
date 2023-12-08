import { Cards } from "../components/Cards";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../http";
import { Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <>
      <Outlet />
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {data && (
        <>
          <Cards users={data} />
        </>
      )}
    </>
  );
}

export default HomePage;
