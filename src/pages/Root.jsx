import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { Container } from "react-bootstrap";

function Root() {
  return (
    <Container>
      <MainNavigation />
      <main className="mt-4">
        <Outlet />
      </main>
    </Container>
  );
}

export default Root;
