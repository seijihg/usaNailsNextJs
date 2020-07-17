import { useRouter } from "next/router";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import jwt from "jwt-decode";
import { setPassword } from "src/lib/api";
import { useState } from "react";
import Link from "next/link";
import { ReactSVG } from "react-svg";

interface IDecoded {
  userId: string;
  email: string;
  iat: string;
  exp: string;
}

const validationSchema = Yup.object({
  password: Yup.string().matches(
    /(?=.*[!@#$%^&*])(?=.*\d)/,
    "Password must be at least 5 chars long and contains a special character and a number"
  ),
  rePass: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

const changePassword = () => {
  const router = useRouter();
  const resetToken = router.query.token;
  const decoded: IDecoded = jwt(resetToken as string);

  const [apiErr, setApiErr] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);

  return (
    <div className="reset-pass-main">
      <div className="top-h1">
        <h1>Reset your password on USA Nails</h1>
      </div>
      <div className="change-password">
        {!submitted ? (
          <>
            <p>
              Passwords are case sensitive: "PassWord" is different than
              "password".{" "}
            </p>
            <p>
              Please don't choose an obvious password, like "password" or your
              user name.
            </p>
            {apiErr !== "" && <p className="error-box">{apiErr}</p>}
            <p style={{ margin: "1rem 0" }}>
              Reset the password for: {decoded.email}
            </p>

            <Formik
              initialValues={{ password: "", rePass: "" }}
              validationSchema={validationSchema}
              onSubmit={async (values, actions) => {
                const res = await setPassword(resetToken, values.password);
                if (res.error) {
                  setApiErr(res.error);
                  return;
                }
                setSubmitted(true);
              }}
            >
              {({ errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div className="input-field">
                    <Field
                      name="password"
                      type="password"
                      placeholder="password"
                      autoComplete="password"
                      required
                    />
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <div className="input-field">
                    <Field
                      name="rePass"
                      type="password"
                      placeholder="re-type password"
                      autoComplete="password"
                      required
                    />
                    {errors.rePass && <p className="error">{errors.rePass}</p>}
                  </div>
                  <button type="submit">
                    <strong>RESET</strong>
                  </button>
                </Form>
              )}
            </Formik>
          </>
        ) : (
          <>
            <p>Your password change is complete.</p>
            <Link href="/">
              <a className="go-back">
                <ReactSVG src="/assets/svg/arrow-left-drop-circle.svg" />
                Go back to home page.
              </a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default changePassword;
