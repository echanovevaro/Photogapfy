import { Cards } from "../components/Cards";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../http";
import { Outlet } from "react-router-dom";
// import { Details } from "../components/Details"

function HomePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <>
      <Outlet />
      {isLoading && <div>Loading...</div>}
      {data && (
        <>
          <Cards users={data} />
        </>
      )}
    </>
  );
}

export default HomePage;
