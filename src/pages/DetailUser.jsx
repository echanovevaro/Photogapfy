import { Details } from "../components/Details";
import { Outlet } from "react-router-dom";

function DetailUser() {
  return (
    <div className="pt-5">
      <Outlet />
      <Details />
    </div>
  );
}

export default DetailUser;
