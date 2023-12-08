/* eslint-disable react/prop-types */
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteOwnUser, fetchUser, queryClient } from "../http"
import { useNavigate, useRouteLoaderData } from "react-router-dom"
import { LazyLoadImage } from "react-lazy-load-image-component"
import "react-lazy-load-image-component/src/effects/blur.css"
import Button from "react-bootstrap/Button"
import Image from "react-bootstrap/Image"
import "bootstrap/dist/css/bootstrap.min.css"
import Card from "react-bootstrap/Card"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faImages } from "@fortawesome/free-solid-svg-icons"
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons"
import { faList } from "@fortawesome/free-solid-svg-icons"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
import Stack from "react-bootstrap/Stack"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

// avatarUrl
// description
// displayName
// salary
// likes
// experience
// skills
// gallery

export const Details = ({ id }) => {
  const navigate = useNavigate()
  const credentials = useRouteLoaderData("root")
  console.log(credentials?.isAdmin)
  console.log(id)
  const {
    data: user,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["users", { id }],
    queryFn: () => fetchUser(id),
    retry: false,
  })

  const { mutate, isPending: isDeletePending } = useMutation({
    mutationFn: deleteOwnUser,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ["users"] })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
      navigate("/photographers", { replace: true })
    },
  })

  return (
    <>
      {(isPending || isDeletePending) && <div>Loading...</div>}
      {isError && <Button variant="primary">Create Profile</Button>}
      {user && (
        <Card className="card d-flex flex-column p-0 m-4">
          {/* <Card.Img src={user.photoUrl} /> */}
          <Card.Body className="d-flex flex-column justify-content-start align-items-center p-4">
            <Stack
              direction="horizontal"
              className="d-flex justify-content-between align-items-center mb-5"
            >
              <Stack
                direction="horizontal"
                className="d-flex justify-content-center align-items-center gap-2"
              >
                <Image
                  className="avatar"
                  roundedCircle
                  width="48"
                  height="48"
                  src={user.avatarUrl}
                />
                <Stack className="d-flex justify-content-start align-items-start mb-0 text-muted">
                  <Card.Title className="mb-1">{user.displayName}</Card.Title>
                  <Stack
                    direction="horizontal"
                    className="d-flex justify-content-start align-items-center"
                  >
                    <small>{user.experience}</small>
                    <small>
                      <FontAwesomeIcon
                        icon={faThumbsUp}
                        className="ms-2"
                      />
                      <span className="mb-0"> {user.likes}</span>
                    </small>
                  </Stack>
                </Stack>
              </Stack>
              <Stack
                direction="horizontal"
                className="text-primary mb-0"
              >
                <h4>{Number(user.salary)}€/hour</h4>
              </Stack>
            </Stack>

            <Card.Text className="mb-5 mt-3">{user.description}</Card.Text>

            <Stack className="d-flex justify-content-start align-items-center mb-5 mt-3">
              <h6 className="mb-2 d-flex gap-2 align-items-center text-muted">
                <FontAwesomeIcon icon={faImages} />
                <span className="mb-0">Gallery</span>
              </h6>
              <Row className="d-flex justify-content-center align-items-center mb-2">
                <Col
                  xs={12}
                  md={10}
                >
                  <p className="text-center text-muted">
                    This section shows a set of previous works provided by the
                    photographer.
                  </p>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center align-items-center">
                <Col
                  className="gallery"
                  xs={12}
                >
                  {user.gallery.map((image, i) => (
                    <LazyLoadImage
                      key={i}
                      src={image}
                      alt="gallery"
                      effect="blur"
                      loading="lazy"
                      className="img-fluid"
                    />
                  ))}
                </Col>
              </Row>
            </Stack>
            <Stack className="d-flex justify-content-start align-items-center mt-3">
              <h6 className="mb-2 d-flex gap-2 align-items-center text-muted">
                <FontAwesomeIcon icon={faList} />
                <span className="mb-0">Skills</span>
              </h6>
              <Row className="d-flex justify-content-center align-items-center mb-2">
                <Col
                  xs={12}
                  md={10}
                >
                  <p className="text-center text-muted">
                    This section shows a list of skills or themes provided by
                    photographer.
                  </p>
                </Col>
              </Row>
            </Stack>
            <Row className="skills w-100">
              {user.skills.map((skill, i) => (
                <Col
                  key={i}
                  className=" p-0"
                  xs={12}
                >
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
          </Card.Body>
          {/* <Card.Footer className="d-flex justify-content-center align-items-center bg-white border-0 m-2">
        <Button variant="outline-primary">Learn more</Button>
      </Card.Footer> */}
          <Card.Footer className="text-primary d-flex justify-content-center">
            <Button variant="outline-primary">Hire me</Button>

            {/* <Button variant="outline-primary">Learn more</Button> */}
          </Card.Footer>
        </Card>
        // <>
        //   <div className={classes.card}>
        //     <div className={classes.cardheader}>
        //       <div className={classes.user}>
        //         <div className={classes.dates}>
        //           <img
        //             src={user.avatarUrl}
        //             alt={user.displayName}
        //           />
        //           <div>
        //             <h4>{user.displayName}</h4>
        //             <small>{user.email}</small>
        //           </div>
        //         </div>
        //         <h3>{user.description}</h3>
        //       </div>

        //       <div className={classes.cardbody}>
        //         <img
        //           src={user.photoUrl}
        //           alt={user.displayName}
        //           className={classes.image}
        //         />
        //       </div>
        //     </div>
        //     {credentials?.isAdmin && (
        //       <div className={classes.btn}>
        //         {credentials?.uid === id && (
        //           <button
        //             className={classes.btnDelete}
        //             onClick={() => mutate(id)}
        //           >
        //             Delete my account
        //           </button>
        //         )}
        //         <button className={classes.btnEdit}>Edit</button>
        //       </div>
        //     )}
        //     {!credentials?.isAdmin && credentials?.uid === id && (
        //       <div className={classes.btn}>
        //         <button
        //           className={classes.btnDelete}
        //           onClick={() => mutate(id)}
        //         >
        //           Delete my account
        //         </button>
        //         <button className={classes.btnEdit}>Edit</button>
        //       </div>
        //     )}
        //   </div>
        // </>
      )}
    </>
  )
}

/* eslint-disable react/prop-types */
