import {
  Form,
  Link,
  useSearchParams,
  useActionData,
  useNavigation,
} from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const data = useActionData();
  const navigation = useNavigation();

  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form method="post" className={classes.form}>
      {data?.message && <small style={{ color: "red" }}>{data.message}</small>}
      <p>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" name="email" required />

        {data?.errors?.email && (
          <ul>
            {data.errors.email.map((msg) => (
              <li key={msg}>
                <small style={{ color: "red" }}>{msg}</small>
              </li>
            ))}
          </ul>
        )}
      </p>
      {mode !== "password" && (
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" name="password" required />

          {data?.errors?.password && (
            <ul>
              {data.errors.password.map((msg) => (
                <li key={msg}>
                  <small style={{ color: "red" }}>{msg}</small>
                </li>
              ))}
            </ul>
          )}
        </p>
      )}
      {mode === "signup" && (
        <>
          <p>
            <label htmlFor="password2">Confirm password</label>
            <input id="password2" type="password" name="password2" required />

            {data?.errors?.password2 && (
              <ul>
                {data.errors.password2.map((msg) => (
                  <li key={msg}>
                    <small style={{ color: "red" }}>{msg}</small>
                  </li>
                ))}
              </ul>
            )}
          </p>

          <p>
            <label htmlFor="avatarUrl">Avatar url</label>
            <input id="avatarUrl" type="text" name="avatarUrl" required />
            {data?.errors?.avatarUrl && (
              <ul>
                {data.errors.avatarUrl.map((msg) => (
                  <li key={msg}>
                    <small style={{ color: "red" }}>{msg}</small>
                  </li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <label htmlFor="displayName">User name</label>
            <input id="displayName" type="text" name="displayName" required />
            {data?.errors?.displayName && (
              <ul>
                {data.errors.displayName.map((msg) => (
                  <li key={msg}>
                    <small style={{ color: "red" }}>{msg}</small>
                  </li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <label htmlFor="photoUrl">Photo url</label>
            <input id="photoUrl" type="text" name="photoUrl" required />
            {data?.errors?.photoUrl && (
              <ul>
                {data.errors.photoUrl.map((msg) => (
                  <li key={msg}>
                    <small style={{ color: "red" }}>{msg}</small>
                  </li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              type="text"
              name="description"
              rows={6}
              required
            />
            {data?.errors?.description && (
              <ul>
                {data.errors.description.map((msg) => (
                  <li key={msg}>
                    <small style={{ color: "red" }}>{msg}</small>
                  </li>
                ))}
              </ul>
            )}
          </p>
        </>
      )}
      <div className={classes.actions}>
        {mode !== "password" && (
          <Link
            to={`?mode=${mode === "login" ? "signup" : "login"}`}
            disabled={isSubmitting}
          >
            {mode === "login" ? "Not registered?" : "Already registered?"}
          </Link>
        )}
        {mode === "login" && (
          <Link disabled={isSubmitting} to="/auth?mode=password">
            Forgot password?
          </Link>
        )}
        <button disabled={isSubmitting} className={classes.submitBtn}>
          {isSubmitting ? "Submitting..." : "Send"}
        </button>
      </div>
    </Form>
  );
}

export default AuthForm;
