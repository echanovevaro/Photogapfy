import { Cards } from "../components/Cards";
import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../http";
import { Outlet } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useEffect, useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useSearchContext } from "../context/searchContext";

function HomePage() {
  const { term } = useSearchContext();
  const [orderBy, setOrderBy] = useState("likes");
  useEffect(() => {
    window.addEventListener("scroll", handleOnScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleOnScroll);
    };
  }, []);
  const { status, data, error, fetchNextPage } = useInfiniteQuery({
    queryKey: ["users", { orderBy, term }],
    queryFn: ({ pageParam }) => fetchUsers(orderBy, pageParam, term),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.id,
  });

  const handleOrderBy = (order) => {
    setOrderBy(order);
  };

  function handleOnScroll(e) {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;
    if (bottom) {
      fetchNextPage();
    }
  }

  return (
    <>
      <Outlet />
      {status === "pending" && (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {status === "error" && (
        <Alert variant="danger">Error: {error.message}</Alert>
      )}
      {data && (
        <div className="p-4">
          <Cards
            data={data}
            handleOrder={handleOrderBy}
            onScroll={handleOnScroll}
            orederedBy={orderBy}
          />
        </div>
      )}
    </>
  );
}

export default HomePage;
