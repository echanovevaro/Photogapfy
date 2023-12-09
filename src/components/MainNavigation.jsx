import { Form as RouterForm, Link, useSubmit } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useAuthContext } from "../context/authContext";

// import classes from "./MainNavigation.module.css"

function MainNavigation() {
  const { currentUser } = useAuthContext();

  return (
    <Navbar expand="lg" className="bg-white-opacity-blur sticky-top p-3">
      <Container fluid>
        <Link to="/">
          <Navbar.Brand>
            Photogra<b>Fy</b>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/photographers">
              Photographers
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to={`/photographers/${currentUser.uid}`}>
                Profile
              </Nav.Link>
            )}
            {!currentUser && (
              <NavDropdown title="Authentication" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/auth?mode=login">
                  Login
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} to="/auth?mode=signup">
                  Sign up
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {currentUser && (
              <RouterForm method="post" action="/logout">
                <button className="nav-link">Logout</button>
              </RouterForm>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

{
  /* <header
      className={classes.header}
      style={
        token
          ? { justifyContent: "space-between" }
          : { justifyContent: "flex-end" }
      }
    >
      {token && (
        <NavLink
          to="/users"
          className={({ isActive }) => (isActive ? classes.active : undefined)}
          end
        >
          Home
        </NavLink>
      )}
      <nav>
        <ul className={classes.list}>
          {token && (
            <>
              <li>
                <NavLink
                  to={`/users/${credentials.uid}`}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end
                >
                  My Profile
                </NavLink>
              </li>
              {isAdmin && (
                <li>
                  <NavLink
                    to="/users/new"
                    className={({ isActive }) =>
                      isActive ? classes.active : undefined
                    }
                  >
                    New User
                  </NavLink>
                </li>
              )}
              <li>
                <RouterForm method="post" action="/logout">
                  <button>Logout</button>
                </RouterForm>
              </li>
            </>
          )}
          {!token && (
            <>
              <li>
                <NavLink
                  to="/auth?mode=login"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Log in
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/auth?mode=signup"
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                >
                  Sign up
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header> */
}

export default MainNavigation;
