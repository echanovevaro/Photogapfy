import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

export default function Errors() {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong";
  if (error.status === 404) {
    title = "Page not found";
    message = "Sorry, the page you requested could not be found.";
  }

  return (
    <>
      <h1>{title}</h1>
      <p>{message}</p>
    </>
  );
}
