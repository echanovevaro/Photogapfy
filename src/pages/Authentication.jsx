import { json, redirect, useSearchParams } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";
import { loginSchema, registerSchema, passwordSchema } from "../validation";
import { logOut } from "../utils/auth";
import AuthForm from "../components/AuthForm";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode");

  if (mode !== "login" && mode !== "signup" && mode !== "password") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  const formData = await request.formData();

  let data = Object.fromEntries(formData.entries());

  let validations;
  if (mode === "signup") {
    validations = registerSchema.safeParse(data);
  } else if (mode === "login") {
    validations = loginSchema.safeParse(data);
  } else {
    validations = passwordSchema.safeParse(data);
  }

  if (!validations.success) {
    const errors = {};
    for (const error of validations.error.errors) {
      if (!errors[error.path[0]]) errors[error.path[0]] = [error.message];
      else errors[error.path[0]].push(error.message);
    }
    console.log(errors);
    return json({ message: "Validation failed", errors }, { status: 422 });
  }

  data = validations.data;

  let userCredentials;
  try {
    if (mode === "signup") {
      userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    } else if (mode === "login") {
      userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
    } else {
      await sendPasswordResetEmail(auth, data.email, {
        url: "https://jocular-sawine-5cf217.netlify.app/auth?mode=login",
      });
      return redirect("/auth?mode=login&passwordReset=true");
    }
  } catch (e) {
    console.log(e);
    if (e.code === "auth/invalid-email") {
      return json({ message: "Invalid email" }, { status: 422 });
    } else if (e.code === "auth/weak-password") {
      return json(
        { message: "You must enter a password with at least 6 characters" },
        { status: 422 }
      );
    } else if (e.code === "auth/invalid-credential") {
      return json({ message: "Invalid credentials" }, { status: 422 });
    } else if (e.code === "auth/email-already-in-use") {
      return json({ message: "Email alrady registered" }, { status: 422 });
    } else if (e.code === "auth/too-many-requests") {
      return json(
        {
          message:
            "Account temporary disabled due to many login failed attepmts. Restore your password",
        },
        { status: 422 }
      );
    } else throw e;
  } finally {
    if (userCredentials) {
      const { user } = userCredentials;
      if (mode === "signup") {
        try {
          await sendEmailVerification(user, {
            url: "https://jocular-sawine-5cf217.netlify.app/auth?mode=login",
          });
          await logOut();
          return redirect("/auth?mode=login&emailNotVerified=true");
        } catch (e) {
          console.log(e);
          return json({ message: "Something went wrong" }, { status: 500 });
        }
      } else if (mode === "login") {
        if (!user.emailVerified) {
          await logOut();
          return redirect("/auth?mode=login&emailNotVerified=true");
        }

        return redirect("/");
      }
    }
  }
}
