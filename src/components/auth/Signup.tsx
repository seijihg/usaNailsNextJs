import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import Cookies from "js-cookie";
import { signup } from "src/lib/api";
import { useState, useContext } from "react";
import { UserContext } from "src/lib/UserContext";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid").required(),
  password: Yup.string()
    .matches(
      /(?=.*[!@#$%^&*])(?=.*\d)/,
      "Password must be at least 5 chars long and contains a special character and a number"
    )
    .required(),
});

const Signup = () => {
  const [apiErr, setApiErr] = useState<string[]>([]);
  const { user, setUser } = useContext<any>(UserContext);

  return (
    <div className="login-signup">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          signup(values as any)
            .then((res) => {
              if (res.errors) {
                setApiErr(res.errors);
                actions.setSubmitting(false);
                actions.resetForm();
                return;
              }

              Cookies.set("token", res.token);
              setUser(res.user);
              actions.setSubmitting(false);
              actions.resetForm();
            })
            .catch((error) => setApiErr([error.message]));
        }}
      >
        {({ values, errors, handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit}>
            <Field name="email" type="input" />
            <Field name="password" type="input" />
            {errors.email && <div id="feedback">{errors.email}</div>}
            <button disabled={isSubmitting} type="submit">
              Submit
            </button>
            <pre>{JSON.stringify(values, null, 2)}</pre>
            <pre>{JSON.stringify(errors, null, 2)}</pre>
            <pre>{JSON.stringify(apiErr, null, 2)}</pre>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;
