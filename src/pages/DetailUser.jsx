import { Details } from "../components/Details";
import { Outlet, useParams } from "react-router-dom";

function DetailUser() {
  const { id } = useParams();
  return (
    <div className="pt-5">
      <Outlet />
      <Details id={id} />
    </div>
  );
}

export default DetailUser;
