import { Form as RouterForm, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuthContext } from "../context/authContext";
import { useEffect, useState } from "react";
import { useSearchContext } from "../context/searchContext";

function MainNavigation() {
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [scollClass, setScrollClass] = useState("");
  const { onSearch } = useSearchContext();

  useEffect(() => {
    window.addEventListener("scroll", stickNavbar);

    return () => {
      window.removeEventListener("scroll", stickNavbar);
    };
  }, []);

  const stickNavbar = () => {
    if (window !== undefined) {
      let windowHeight = window.scrollY;
      windowHeight > 80 ? setScrollClass("border-bottom") : setScrollClass("");
    }
  };

  function handleSearch(e) {
    e.preventDefault();
    const search = e.target[0].value;
    if (search.trim() !== "") {
      onSearch(search);
    } else {
      onSearch(undefined);
    }
    navigate("/photographers", { replace: true });
  }

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className={`bg-white-opacity-blur sticky-top p-3 ${scollClass}`}
    >
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>
            Photogra<b>Fy</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link eventKey="1" as={Link} to="/photographers">
              Photographers
            </Nav.Link>
            {currentUser && (
              <Nav.Link
                eventKey="2"
                as={Link}
                to={`/photographers/${currentUser.uid}`}
              >
                Profile
              </Nav.Link>
            )}
            {!currentUser && (
              <NavDropdown title="Authentication" id="navbarScrollingDropdown">
                <NavDropdown.Item eventKey="3" as={Link} to="/auth?mode=login">
                  Login
                </NavDropdown.Item>

                <NavDropdown.Item eventKey="4" as={Link} to="/auth?mode=signup">
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {currentUser && (
              <RouterForm method="post" action="/logout">
                <Nav.Link as={Button} eventKey="5" type="submit">
                  Logout
                </Nav.Link>
              </RouterForm>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={(e) => handleSearch(e)}>
            <Form.Control
              type="search"
              placeholder="Search by name"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary" type="submit">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavigation;
