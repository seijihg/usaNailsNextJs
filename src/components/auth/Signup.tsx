import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { loginSignup } from "src/lib/api";
import { useState, useContext, FC } from "react";
import { UserContext } from "src/lib/UserContext";
import { useStyles } from "src/styles/modules/useStyles";
import { ReactSVG } from "react-svg";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid"),
  password: Yup.string().matches(
    /(?=.*[!@#$%^&*])(?=.*\d)/,
    "Password must be at least 5 chars long and contains a special character and a number"
  ),
  rePass: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});

interface ISignProps {
  logOrSign: string;
  setLogOrSign: (value: string) => void;
}

const Signup: FC<ISignProps> = ({ logOrSign, setLogOrSign }) => {
  const [apiErr, setApiErr] = useState<string>("");
  const { setUser, setQuickLogin } = useContext<any>(UserContext);
  const classes = useStyles();

  return (
    <div className="login-signup">
      <Formik
        initialValues={{ email: "", password: "", rePass: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = await loginSignup(
            values as any,
            "signup"
          ).catch((error) => setApiErr(error.message));
          if (res.error) {
            setApiErr("The email or password is incorrect");
            actions.setSubmitting(false);
            actions.resetForm();
            return;
          }
          actions.setSubmitting(false);
          actions.resetForm();
          Cookies.set("token", res.token);
          setQuickLogin(false);
          setUser(res.user);
        }}
      >
        {({ values, errors, handleSubmit, isSubmitting }) => (
          <div className="form-wrapper">
            <Form onSubmit={handleSubmit}>
              <ReactSVG
                src="/assets/svg/window-close.svg"
                className="svg-cross"
                onClick={() => setQuickLogin(false)}
              />
              <div>
                <h1>Sign up and save</h1>
                <p style={{ marginBottom: "1rem" }}>
                  Create an account now for access to member-only deals.
                </p>
              </div>
              {apiErr !== "" && <p className="error-box">{apiErr}</p>}
              <div className="input-field">
                <Field name="email" type="email" placeholder="email" required />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="input-field">
                <Field
                  name="password"
                  type="password"
                  placeholder="password"
                  required
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <div className="input-field">
                <Field
                  name="rePass"
                  type="password"
                  placeholder="re-type password"
                  required
                />
                {errors.password && <p className="error">{errors.rePass}</p>}
              </div>
              <button disabled={isSubmitting} type="submit">
                <strong>SIGN UP</strong>
              </button>
            </Form>
            <div className="bottom-bar">
              <p>Already have an account?</p>
              <button onClick={() => setLogOrSign("login")}>Sign in</button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
