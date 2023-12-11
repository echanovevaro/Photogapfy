/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOwnUser, fetchUser, queryClient } from "../http";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { faThumbsUp } from "@fortawesome/free-regular-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { useAuthContext } from "../context/authContext";

export const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();

  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["users", { id }],
    queryFn: () => fetchUser(id),
    retry: (failureCount, error) => {
      if (error.message === "User not found") return false;
      return failureCount < 2;
    },
  });

  const { mutate, isPending: isDeletePending } = useMutation({
    mutationFn: deleteOwnUser,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["users"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      navigate("/photographers", { replace: true });
    },
  });

  return (
    <>
      {(isPending || isDeletePending) && (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {isError && error.message === "User not found" && (
        <Navigate to="/photographers/new" replace />
      )}
      {user && (
        <>
          <Card className="card d-flex flex-column p-0 m-4 mt-0 border-0 border-bottom">
            <h6 className="display-6 text-primary mb-3">
              Professional profile
            </h6>
            <Card.Body className="d-flex flex-column justify-content-start align-items-center p-4 border-top pt-5">
              <section id="header" className="w-100">
                <Stack
                  direction="horizontal"
                  className="d-flex justify-content-between align-items-center mb-5"
                >
                  <Stack
                    direction="horizontal"
                    className="d-flex justify-content-center align-items-center gap-2"
                  >
                    <Image
                      roundedCircle
                      width="46"
                      height="46"
                      src={user.avatarUrl}
                    />
                    <div className="d-flex flex-column justify-content-center align-items-start mb-0">
                      <h6 className="mb-1 section-title">{user.displayName}</h6>
                      <small className="text-primary">{user.experience}</small>
                    </div>
                  </Stack>
                  <div className="d-flex flex-column justify-content-between align-items-end">
                    <div className="d-flex justify-content-end align-items-center text-primary gap-2 mb-1 fw-lighter">
                      <small className="font-smaller">
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </small>
                      <span>{user.likes}</span>
                    </div>
                    <h6 className="section-title mb-0 mt-0 p-0">
                      {Number(user.salary)}€/hour
                    </h6>
                  </div>
                </Stack>
              </section>
              <div className="mb-5 mt-1">
                {user.description.split(/\n/).map((line) => (
                  <Card.Text key={line}>{line}</Card.Text>
                ))}
              </div>

              <section id="skills" className="w-100">
                <Stack className="d-flex justify-content-start align-items-center mt-5">
                  <h6 className="mb-2 d-flex gap-2 align-items-center section-title">
                    <small className="font-smaller">
                      <FontAwesomeIcon icon={faList} />
                    </small>
                    <span className="mb-0">Skills</span>
                  </h6>
                  <Row className="d-flex justify-content-center align-items-center mb-2">
                    <Col xs={12} md={10}>
                      <p className="text-center text-grey">
                        This section shows a list of skills or themes provided
                        by photographer.
                      </p>
                    </Col>
                  </Row>
                </Stack>
                <Row className="skills w-100 mb-5">
                  {user.skills.map((skill, i) => (
                    <Col key={i} className=" p-0" xs={12}>
                      <Card className="p-4">
                        <Card.Text>
                          <FontAwesomeIcon
                            icon={faCheck}
                            className="text-primary"
                          />
                          <span> {skill}</span>
                        </Card.Text>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </section>
              <section id="gallery" className="w-100">
                <Stack className="d-flex justify-content-start align-items-center mt-5">
                  <h6 className="mb-2 d-flex gap-2 align-items-center">
                    <FontAwesomeIcon icon={faImages} />
                    <span className="mb-0 section-title">Gallery</span>
                  </h6>
                  <Row className="d-flex justify-content-center align-items-center mb-2">
                    <Col xs={12} md={10}>
                      <p className="text-center text-grey">
                        This section shows a set of previous works provided by
                        the photographer.
                      </p>
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center align-items-center">
                    <Col className="gallery" xs={12}>
                      {user.gallery.map((image, i) => (
                        <Card key={i}>
                          <LazyLoadImage
                            src={image}
                            alt="gallery"
                            effect="blur"
                            loading="lazy"
                            className="card-img"
                          />
                        </Card>
                      ))}
                    </Col>
                  </Row>
                </Stack>
              </section>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-end gap-2">
              {currentUser?.uid === id && (
                <>
                  <Button variant="outline-danger">Delete account</Button>
                  <Button
                    as={Link}
                    variant="outline-primary"
                    to={`/photographers/${currentUser.uid}/edit`}
                  >
                    Edit profile
                  </Button>
                </>
              )}
              {currentUser?.uid !== id && (
                <Button variant="outline-primary">Hire me</Button>
              )}
            </Card.Footer>
          </Card>
        </>
      )}
    </>
  );
};
