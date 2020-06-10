import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { login } from "src/lib/api";
import { useState, useContext } from "react";
import { UserContext } from "src/lib/UserContext";
import { FormControlLabel, Checkbox } from "@material-ui/core";
import clsx from "clsx";
import { useStyles } from "src/styles/modules/useStyles";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid").required("Email is required"),
  password: Yup.string()
    .matches(
      /(?=.*[!@#$%^&*])(?=.*\d)/,
      "Password must be at least 5 chars long and contains a special character and a number"
    )
    .required("Password is required"),
});

const Login = () => {
  const [apiErr, setApiErr] = useState<string>("");
  const { user, setUser } = useContext<any>(UserContext);
  const classes = useStyles();

  return (
    <div className="login-signup">
      <Formik
        initialValues={{ email: "", password: "", rememberMe: false }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = await login(values as any).catch((error) =>
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
          setUser(res.user);
        }}
      >
        {({ values, errors, handleSubmit, isSubmitting, setFieldValue }) => (
          <Form onSubmit={handleSubmit}>
            <div>
              <h1>Good to see you again</h1>
              <p style={{ marginBottom: "1rem" }}>
                Sign in for member-only deals and access to your personal
                profile.
              </p>
            </div>
            {apiErr !== "" && <p className="error-box">{apiErr}</p>}
            <div className="input-field">
              <Field name="email" type="email" />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="input-field">
              <Field name="password" type="password" />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button disabled={isSubmitting} type="submit">
              Login
            </button>
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
                    <span className={clsx(classes.icon, classes.checkedIcon)} />
                  }
                  icon={<span className={classes.icon} />}
                />
              }
              label={
                <span style={{ fontFamily: `"Open Sans", sans-serif` }}>
                  Remember me!
                </span>
              }
            />
            <div>Forgot password?</div>
            {/* <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(apiErr, null, 2)}</pre> */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
