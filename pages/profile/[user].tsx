import { useContext } from "react";
import { UserContext } from "src/lib/UserContext";
import { Formik, Form, Field } from "formik";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const userProfile = () => {
  const { user } = useContext<any>(UserContext);
  const fullName =
    user?.firstName && user?.lastName
      ? `${user?.firstName}  ${user?.lastName}`
      : "First Name Full Name";
  console.log(user);

  return (
    <div className="profile">
      <div className="left-side">
        <img
          src="https://api.adorable.io/avatars/150/abott@adorable.png"
          alt={`${user && user?.firstName}_avatar`}
        />
      </div>
      {user && (
        <div className="right-side">
          <h1>{fullName}</h1>
          <h2>{user?.email}</h2>

          <div className="update-form">
            <Formik
              initialValues={{
                firstName: user.firstName ? user.firstName : "",
                lastName: user.lastName ? user.lastName : "",
                title: user.title ? user.title : "",
              }}
              onSubmit={() => console.log("submitting")}
            >
              {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
                <>
                  <Form onSubmit={handleSubmit}>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      defaultValue={options[0]}
                      // isDisabled={isDisabled}
                      // isLoading={isLoading}
                      // isClearable={isClearable}
                      // isRtl={isRtl}
                      // isSearchable={isSearchable}
                      name="color"
                      options={options}
                    />
                    <Field
                      name="firstName"
                      type="input"
                      placeholder="First name"
                    />
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                  </Form>
                </>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
};

export default userProfile;
