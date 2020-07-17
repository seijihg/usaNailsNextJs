import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { sendEmailToResetPass } from "src/lib/api";
import { useState, useContext, FC } from "react";
import { UserContext } from "src/lib/UserContext";
import { ReactSVG } from "react-svg";
import { useRouter } from "next/router";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is not valid"),
});

interface ILoginProps {
  logOrSign: string;
  setLogOrSign: (value: string) => void;
}

const ForgotPassword: FC<ILoginProps> = ({ logOrSign, setLogOrSign }) => {
  const [apiErr, setApiErr] = useState<string>("");
  const { setUser, setQuickLogin } = useContext<any>(UserContext);
  const router = useRouter();

  return (
    <div className="login-signup">
      <Formik
        initialValues={{ email: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          const res = sendEmailToResetPass(values.email);
          setQuickLogin(false);
          setLogOrSign("login");
          router.push("/");
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
                <h1>Forgot password?</h1>
                <p style={{ marginBottom: "1rem" }}>
                  Enter the email associated with your account in the field
                  below and we'll email you a link to reset your password if the
                  account exists. It may take up to 60 minutes.
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
              <button disabled={isSubmitting} type="submit">
                <strong>SEND</strong>
              </button>
              <div className="back-sign" onClick={() => setLogOrSign("login")}>
                Back to sign in
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPassword;
