// function UserForm({inputData,onSubmit, children}) {
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../http";
import { createUser } from "../http";
import { useNavigate } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { useAuthContext } from "../context/authContext";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { CardBody, InputGroup, ListGroup } from "react-bootstrap";
import { useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";

function UserForm() {
  const [skills, setSkills] = useState([]);
  const [photos, setPhotos] = useState([]);
  const newSkillRef = useRef(null);
  const newPhotoRef = useRef(null);
  const { currentUser } = useAuthContext();

  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ keyQuery: ["users"] }).then(() => {
        return navigate(`/photographers/${currentUser.uid}`, { replace: true });
      });
    },
  });
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const inputData = Object.fromEntries(formData);
    mutate(inputData);
  }

  function handleRemoveSkill(index) {
    setSkills((prev) => {
      const newSkills = prev.filter((_, i) => i !== index);
      console.log("quedan", newSkills);
      return newSkills;
    });
  }

  function handleAddSkill() {
    console.log("entra");
    if (newSkillRef.current?.value?.trim().length > 0) {
      console.log("existe valor", newSkillRef.current.value);
      setSkills([...skills, newSkillRef.current.value]);
    }
    newSkillRef.current.value = "";
  }

  function handleRemovePhoto(index) {
    setPhotos((prev) => {
      const newPhotos = prev.filter((_, i) => i !== index);
      console.log("quedan", newPhotos);
      return newPhotos;
    });
  }

  function handleAddPhoto() {
    console.log("entra");
    if (newPhotoRef.current?.value?.trim().length > 0) {
      console.log("existe valor", newPhotoRef.current.value);
      setPhotos([...photos, newPhotoRef.current.value]);
    }
    newPhotoRef.current.value = "";
  }

  return (
    <>
      {isPending && (
        <div className="d-flex justify-content-center align-items-center vh-75">
          <Spinner animation="grow" role="status" variant="primary">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      <Card.Body className="p-4 pt-0 m-1 mt-0">
        <Form as={Col} onSubmit={handleSubmit} xs={12} md={10} lg={8}>
          <h6 className="display-6 text-primary mb-3">
            Create your public profile
          </h6>
          <div className="p-3 border-top pt-5">
            <h6 className="mb-3 section-title fs-5">General information</h6>
            {error?.message && (
              <small style={{ color: "red" }}>{data.message}</small>
            )}

            <FloatingLabel
              controlId="floatingDisplayName"
              label="Full name"
              className="mb-2"
            >
              <Form.Control
                type="text"
                name="displayName"
                placeholder="Full name"
              />
            </FloatingLabel>
            {error?.errors?.displayName.map((msg, i) => (
              <Form.Text key={i} className="text-danger">
                {msg}
              </Form.Text>
            ))}

            <FloatingLabel
              controlId="floatingAvatarUrl"
              label="Avatar URL"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Avatar URL"
                name="avatarUrl"
              />
            </FloatingLabel>
            {error?.errors?.avatarUrl.map((msg, i) => (
              <Form.Text key={i} className="text-danger">
                {msg}
              </Form.Text>
            ))}

            <FloatingLabel
              controlId="floatingSelect"
              label="Experience"
              className="mb-2"
            >
              <Form.Select label="Select an option" name="experience">
                <option>Select an option</option>
                <option value="junior">{"< 1 year"}</option>
                <option value="senior">1 to 3 years</option>
                <option value="pro">{"> 3 years"}</option>
              </Form.Select>
            </FloatingLabel>
            {error?.errors?.experience.map((msg, i) => (
              <Form.Text key={i} className="text-danger">
                {msg}
              </Form.Text>
            ))}

            <FloatingLabel
              controlId="floatingIntro"
              label="Profile introduction"
              className="mb-2"
            >
              <Form.Control
                as="textarea"
                style={{ height: "80px" }}
                placeholder="Brief introductioon about your services"
                name="intro"
              />
            </FloatingLabel>
            {error?.errors?.intro.map((msg, i) => (
              <Form.Text key={i} className="text-danger">
                {msg}
              </Form.Text>
            ))}

            <FloatingLabel
              controlId="floatingPhotoUrl"
              label="Profile photo URL"
              className="mb-2"
            >
              <Form.Control
                type="text"
                placeholder="Representative photography URL"
                name="photoUrl"
              />
              {error?.errors?.photoUrl.map((msg, i) => (
                <Form.Text key={i} className="text-danger">
                  {msg}
                </Form.Text>
              ))}
            </FloatingLabel>

            <InputGroup className="mb-2">
              <InputGroup.Text id="basic-addon-salary">€/hour</InputGroup.Text>
              <Form.Control
                placeholder="Salary"
                aria-describedby="basic-addon-salary"
                name="salary"
                type="number"
                step={1}
                min={0}
              />
            </InputGroup>
            {error?.errors?.salary.map((msg, i) => (
              <Form.Text key={i} className="text-danger">
                {msg}
              </Form.Text>
            ))}

            <div className="mb-2">
              <FloatingLabel
                controlId="floatingDescription"
                label="Description"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "150px" }}
                  placeholder="Full description of your services"
                  name="description"
                />
                {error?.errors?.description.map((msg, i) => (
                  <Form.Text key={i} className="text-danger">
                    {msg}
                  </Form.Text>
                ))}
              </FloatingLabel>
            </div>

            <Card.Subtitle className="mb-3 section-title mt-5">
              Skills
            </Card.Subtitle>
            <Form.Group as={Row} className="mb-0">
              <InputGroup>
                <Form.Control
                  placeholder="Add a new skill"
                  aria-label="New skill"
                  ref={newSkillRef}
                  id="skill"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleAddSkill()}
                >
                  Add
                </Button>
              </InputGroup>
              {error?.errors?.skills.map((msg, i) => (
                <Form.Text key={i} className="text-danger">
                  {msg}
                </Form.Text>
              ))}
            </Form.Group>

            <div className="mb-2 skills">
              {skills.map((skill, i) => (
                <Card key={i} className="p-2">
                  <Stack
                    direction="horizontal"
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>
                      <FontAwesomeIcon
                        icon={faCheck}
                        className="text-primary"
                      />
                      <span> {skill}</span>
                    </span>
                    <small>
                      <CloseButton
                        onClick={() => handleRemoveSkill(i)}
                        className="text-danger"
                      />
                    </small>
                  </Stack>
                </Card>
              ))}
            </div>

            <Card.Subtitle className="mb-3 section-title mt-5">
              Gallery
            </Card.Subtitle>
            <Form.Group as={Row}>
              <InputGroup className="mb-2">
                <Form.Control
                  placeholder="Add a new photo URL"
                  aria-label="New photo URL"
                  ref={newPhotoRef}
                  id="photo"
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => handleAddPhoto()}
                >
                  Add
                </Button>
              </InputGroup>
              {error?.errors?.gallery.map((msg, i) => (
                <Form.Text key={i} className="text-danger">
                  {msg}
                </Form.Text>
              ))}
            </Form.Group>

            <div className="mb-2 skills">
              {photos.map((photo, i) => (
                <Card key={i}>
                  <Card.Img src={photo} />
                  <Card.Footer>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemovePhoto(i)}
                    >
                      Delete
                    </Button>
                  </Card.Footer>
                </Card>
              ))}
            </div>
          </div>
          <Stack
            direction="horizontal"
            className="d-flex justify-content-end gap-0 mb-3 mt-4 input-group-text border-start-0 border-end-0 p-2 pe-3"
          >
            <Button
              as={Link}
              to="/photographers"
              variant="link"
              className="text-grey"
            >
              Cancel
            </Button>
            <Button
              disabled={isPending}
              variant="outline-primary"
              type="submit"
            >
              {isPending ? "Submitting..." : "Submit"}
            </Button>
          </Stack>
        </Form>
      </Card.Body>
    </>
  );
}

export default UserForm;
