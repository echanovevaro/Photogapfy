import {
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { loginSchema, passwordSchema, registerSchema } from "../validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-regular-svg-icons";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
const eye = <FontAwesomeIcon icon={faEye} />;
const eyeSlash = <FontAwesomeIcon icon={faEyeSlash} />;

function AuthForm() {
  const error = useActionData();
  const navigation = useNavigation();
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  if (mode !== "login" && mode !== "signup" && mode !== "password") {
    throw new Error("Unsupported mode.");
  }
  const isSubmitting = navigation.state === "submitting";
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  const [password2Shown, setPassword2Shown] = useState(false);
  const togglePassword2Visiblity = () => {
    setPassword2Shown(password2Shown ? false : true);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      mode === "signup"
        ? registerSchema
        : mode === "password"
        ? passwordSchema
        : loginSchema
    ),
  });

  const onSubmit = (data) => {
    const formData = new FormData(data);
    submit(formData, { method: "POST" });
  };

  return (
    <>
      <Card.Body className="p-4 pt-3 m-1 mt-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Col xs={12} md={10} lg={8}>
            <h6 className="display-6 text-primary mb-3">
              {mode === "signup"
                ? `Create your account`
                : mode === "login"
                ? `Login`
                : `Reset your password`}
            </h6>
            <div className="p-3 border-top pt-5">
              {error?.message && (
                <Alert variant="danger" className="mb-4">
                  {error?.message}
                </Alert>
              )}
              <FloatingLabel
                controlId="floatingEmail"
                label="Email"
                className="mb-2"
              >
                <Form.Control
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                />
                {errors.email && (
                  <span className="text-danger">{errors.email?.message}</span>
                )}
              </FloatingLabel>

              {mode !== "password" && (
                <FloatingLabel
                  controlId="floatingPassword"
                  label="Password"
                  className="mb-2 relative"
                >
                  <Form.Control
                    type={passwordShown ? "text" : "password"}
                    placeholder="password"
                    {...register("password")}
                  />
                  <i onClick={togglePasswordVisiblity}>
                    {passwordShown ? eyeSlash : eye}
                  </i>
                  {errors.password && (
                    <span className="text-danger">
                      {errors.password?.message}
                    </span>
                  )}
                </FloatingLabel>
              )}

              {mode === "signup" && (
                <FloatingLabel
                  controlId="floatingPassword2"
                  label="Confirm password"
                  className="mb-2 relative"
                >
                  <Form.Control
                    type={password2Shown ? "text" : "password"}
                    placeholder="password"
                    {...register("password2")}
                  />
                  <i onClick={togglePassword2Visiblity}>
                    {password2Shown ? eyeSlash : eye}
                  </i>
                  {errors.password2 && (
                    <span className="text-danger">
                      {errors.password2?.message}
                    </span>
                  )}
                </FloatingLabel>
              )}
              {mode === "login" && (
                <div className="d-flex justify-content-end font-smaller text-primary">
                  <Link disabled={isSubmitting} to="/auth?mode=password">
                    Forgot password?
                  </Link>
                </div>
              )}
            </div>
            <Stack
              direction="horizontal"
              className="d-flex justify-content-end gap-0 mb-3 mt-2 input-group-text border-start-0 border-end-0 p-2 pe-3"
            >
              {mode !== "password" && (
                <Button
                  as={Link}
                  to={`?mode=${mode === "login" ? "signup" : "login"}`}
                  disabled={isSubmitting}
                  variant="link"
                  className="text-grey"
                >
                  {mode === "login" ? "Not registered?" : "Already registered?"}
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="outline-primary"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Stack>
          </Col>
        </form>
      </Card.Body>
    </>
  );
}

export default AuthForm;
