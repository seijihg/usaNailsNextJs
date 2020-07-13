import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { loginSignup } from "src/lib/api";
import { useState, useContext, FC } from "react";
import { UserContext } from "src/lib/UserContext";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "src/styles/modules/useStyles";
import { ReactSVG } from "react-svg";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid"),
  password: Yup.string().matches(
    /(?=.*[!@#$%^&*])(?=.*\d)/,
    "Password must be at least 5 chars long and contains a special character and a number"
  ),
});

interface ILoginProps {
  logOrSign: string;
  setLogOrSign: (value: string) => void;
}

const Login: FC<ILoginProps> = ({ logOrSign, setLogOrSign }) => {
  const [apiErr, setApiErr] = useState<string>("");
  const { setUser, setQuickLogin } = useContext<any>(UserContext);
  const classes = useStyles();

  return (
    <div className="login-signup">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = await loginSignup(values as any, "login").catch((error) =>
            setApiErr(error.message)
          );
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
        {({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => (
          <div className="form-wrapper">
            <Form onSubmit={handleSubmit}>
              <ReactSVG
                src="/assets/svg/window-close.svg"
                className="svg-cross"
                onClick={() => setQuickLogin(false)}
              />
              <div>
                <h1>Good to see you again</h1>
                <p style={{ marginBottom: "1rem" }}>
                  Sign in for member-only deals and access to your personal
                  profile.
                </p>
              </div>
              {apiErr !== "" && <p className="error-box">{apiErr}</p>}
              <div className="input-field">
                <Field
                  name="email"
                  type="email"
                  placeholder="email"
                  autoComplete="email"
                  required
                />
                {errors.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="input-field">
                <Field
                  name="password"
                  type="password"
                  autoComplete="password"
                  placeholder="password"
                  required
                />
                {errors.password && <p className="error">{errors.password}</p>}
              </div>
              <button disabled={isSubmitting} type="submit">
                <strong>LOGIN</strong>
              </button>
              <div className="remember-me">
                <FormControlLabel
                  checked={values.rememberMe}
                  onChange={() => {
                    setFieldValue("rememberMe", !values.rememberMe);
                  }}
                  control={
                    <Checkbox
                      className={classes.root}
                      disableRipple
                      color="default"
                      checkedIcon={
                        <span
                          className={clsx(classes.icon, classes.checkedIcon)}
                        />
                      }
                      icon={<span className={classes.icon} />}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontFamily: `"Open Sans", sans-serif`,
                        fontSize: ".75rem",
                      }}
                    >
                      Remember me!
                    </span>
                  }
                />
                <div onClick={() => setLogOrSign("password")}>
                  Forgot password?
                </div>
              </div>

              {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(apiErr, null, 2)}</pre> */}
            </Form>
            <div className="bottom-bar">
              <p>Don't have an account?</p>
              <button onClick={() => setLogOrSign("signup")}>
                Create account
              </button>
            </div>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default Login;
