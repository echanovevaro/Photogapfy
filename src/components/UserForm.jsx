// function UserForm({inputData,onSubmit, children}) {
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../http";
import { createUser } from "../http";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { InputGroup } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CloseButton from "react-bootstrap/CloseButton";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "../validation";
import Alert from "react-bootstrap/Alert";

function UserForm({ user }) {
  const [skills, setSkills] = useState(user?.skills || []);
  const [photos, setPhotos] = useState(user?.gallery || []);
  const newSkillRef = useRef(null);
  const newPhotoRef = useRef(null);
  const { currentUser } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      avatarUrl: user?.avatarUrl || "",
      experience: user?.experience || "",
      intro: user?.intro || "",
      photoUrl: user?.photoUrl || "",
      salary: user?.salary || "",
      description: user?.description || "",
    },
  });
  const navigate = useNavigate();
  const { mutate, isPending, error } = useMutation({
    mutationFn: createUser,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ keyQuery: ["users"] });
      navigate(`/photographers/${currentUser.uid}`, { replace: true });
    },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [error, errors]);

  function onSubmit(inputData) {
    const data = {
      ...inputData,
      email: currentUser.email,
      skills,
      gallery: photos,
    };
    mutate({ update: !!user, userId: currentUser.uid, user: data });
  }

  function handleRemoveSkill(index) {
    setSkills((prev) => {
      const newSkills = prev.filter((_, i) => i !== index);
      return newSkills;
    });
  }

  function handleAddSkill() {
    if (newSkillRef.current?.value?.trim().length > 0) {
      setSkills([...skills, newSkillRef.current.value]);
    }
    newSkillRef.current.value = "";
  }

  function handleRemovePhoto(index) {
    setPhotos((prev) => {
      const newPhotos = prev.filter((_, i) => i !== index);
      return newPhotos;
    });
  }

  function handleAddPhoto() {
    if (newPhotoRef.current?.value?.trim().length > 0) {
      setPhotos([...photos, newPhotoRef.current.value]);
    }
    newPhotoRef.current.value = "";
  }

  return (
    <>
      <Card.Body className="p-4 pt-0 m-1 mt-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} md={10} lg={8}>
            <h6 className="display-6 text-primary mb-3">
              {!user
                ? `Create your public profile`
                : `Edit your public profile`}
            </h6>

            <div className="p-0 border-top pt-5">
              {(error?.message || Object.keys(errors).length > 0) && (
                <Alert variant="danger" className="mb-4">
                  {error?.message || "Validation errors, check your inputs"}
                </Alert>
              )}
              <h6 className="mb-3 section-title fs-5">General information</h6>

              <FloatingLabel
                controlId="floatingDisplayName"
                label="Full name"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  {...register("displayName")}
                  placeholder="Full name"
                />
                {errors.displayName && (
                  <span className="text-danger">
                    {errors.displayName?.message}
                  </span>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingAvatarUrl"
                label="Avatar URL"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Avatar URL"
                  {...register("avatarUrl")}
                />
                {errors.avatarUrl && (
                  <span className="text-danger">
                    {errors.avatarUrl?.message}
                  </span>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingSelect"
                label="Experience"
                className="mb-2"
              >
                <Form.Select
                  label="Select an option"
                  {...register("experience")}
                >
                  <option>Select an option</option>
                  <option value="junior">{"< 1 year"}</option>
                  <option value="senior">1 to 3 years</option>
                  <option value="pro">{"> 3 years"}</option>
                </Form.Select>
                {errors.experience && (
                  <span className="text-danger">
                    {errors.experience?.message}
                  </span>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingIntro"
                label="Profile introduction"
                className="mb-2"
              >
                <Form.Control
                  as="textarea"
                  style={{ height: "80px" }}
                  placeholder="Brief introductioon about your services"
                  {...register("intro")}
                />
                {errors.intro && (
                  <span className="text-danger">{errors.intro?.message}</span>
                )}
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingPhotoUrl"
                label="Profile photo URL"
                className="mb-2"
              >
                <Form.Control
                  type="text"
                  placeholder="Representative photography URL"
                  {...register("photoUrl")}
                />
                {errors.photoUrl && (
                  <span className="text-danger">
                    {errors.photoUrl?.message}
                  </span>
                )}
              </FloatingLabel>

              <Form.Group as={Row} className="mb-2">
                <InputGroup>
                  <InputGroup.Text id="basic-addon-salary">
                    €/hour
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Salary"
                    aria-describedby="basic-addon-salary"
                    {...register("salary")}
                    type="number"
                    step={1}
                    min={0}
                  />
                </InputGroup>
                <Col>
                  {errors.salary && (
                    <span className="text-danger">
                      {errors.salary?.message}
                    </span>
                  )}
                </Col>
              </Form.Group>

              <div className="mb-2">
                <FloatingLabel
                  controlId="floatingDescription"
                  label="Description"
                >
                  <Form.Control
                    as="textarea"
                    style={{ height: "150px" }}
                    placeholder="Full description of your services"
                    {...register("description")}
                  />
                  {errors.description && (
                    <span className="text-danger">
                      {errors.description?.message}
                    </span>
                  )}
                </FloatingLabel>
              </div>

              <Card.Subtitle className="mb-3 section-title mt-5">
                Skills
              </Card.Subtitle>
              <Form.Group as={Row} className="mb-2">
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

                <Col>
                  {error?.errors?.skills && (
                    <ul className="text-danger">
                      {error?.errors?.skills?.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                </Col>
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
              <Form.Group as={Row} className="mb-2">
                <InputGroup>
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
                <Col>
                  {error?.errors?.gallery && (
                    <ul className="text-danger">
                      {error?.errors?.gallery?.map((error, i) => (
                        <li key={i}>{error}</li>
                      ))}
                    </ul>
                  )}
                </Col>
              </Form.Group>

              <div className="mb-2 skills">
                {photos.map((photo, i) => (
                  <Card key={i}>
                    <Card.Img src={photo} />
                    <div className="d-flex justify-content-end p-2">
                      <Button
                        variant="outline-danger"
                        onClick={() => handleRemovePhoto(i)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
            <Stack
              direction="horizontal"
              className="d-flex justify-content-end gap-0 mb-3 mt-4 input-group-text border-start-0 border-end-0 p-0"
            >
              <Button
                as={Link}
                to={`/photographers`}
                variant="link"
                className="text-grey"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                variant="outline-primary"
              >
                {isPending ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
          </Col>
        </form>
      </Card.Body>
    </>
  );
}

export default UserForm;
