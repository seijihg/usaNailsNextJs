import { useContext, useState, useEffect } from "react";
import { UserContext } from "src/lib/UserContext";
import { Formik, Form, Field } from "formik";
import Select from "react-select";
import DatePicker from "react-datepicker";
import { uploadAvatar, updateUser } from "src/lib/api";
import Cookies from "js-cookie";
import { string } from "yup";

const options = [
  { value: "mr", label: "Mr." },
  { value: "mrs", label: "Mrs." },
  { value: "ms", label: "Ms." },
  { value: "miss", label: "Miss" },
];
const titles: { [key: string]: string } = {
  mr: "Mr.",
  mrs: "Mrs.",
  ms: "Ms.",
  miss: "Miss",
};

const userProfile = () => {
  const { user, setUser } = useContext<any>(UserContext);
  const [displayAvatar, updateDisplayAvatar] = useState<string>(
    "https://api.adorable.io/avatars/150/abott@adorable.png"
  );
  const [loadingUpload, setLoadingUpload] = useState<boolean>(false);
  const token = Cookies.get("token");

  useEffect(() => {
    if (user) {
      updateDisplayAvatar(user.avatar);
    }
  }, [user]);

  const fullName =
    user?.firstName && user?.lastName
      ? `${user?.firstName}  ${user?.lastName}`
      : "First Name Full Name";

  const todayDate = new Date();
  const pastYear = todayDate.setMonth(todayDate.getMonth() - 216); // 216 weeks equals to 18 years

  return (
    <>
      {user && (
        <div className="profile">
          <div className="left-side">
            <label className="profile-picture">
              <input
                type="file"
                style={{ visibility: "hidden" }}
                accept="image/*"
                onChange={(e) => {
                  const files: FileList | null = e.target.files;
                  if (!files) {
                    return;
                  }
                  const reader = new FileReader();
                  reader.readAsDataURL(files[0] as Blob);
                  reader.onloadend = () => {
                    updateDisplayAvatar(reader.result as string);
                  };
                  const picName = user.avatar
                    .substring(user.avatar.lastIndexOf("/") + 1)
                    .split(".")
                    .shift();
                  const formData = new FormData();
                  formData.append("file", files[0]);
                  formData.append("name", picName);
                  formData.append("userId", user.id);

                  const data = uploadAvatar(formData, token).catch(console.log);
                  setLoadingUpload(true);

                  data
                    .then((res: any) => {
                      setLoadingUpload(false);
                      setUser({ ...user, avatar: res.avatar });
                    })
                    .catch(console.log);
                }}
              />
              <img src={displayAvatar} alt="profile picture" />
            </label>
          </div>

          <div className="right-side">
            <h1>{fullName}</h1>
            <h2>{user?.email}</h2>

            <div className="update-form">
              <Formik
                initialValues={{
                  firstName: user.firstName ? user.firstName : "",
                  lastName: user.lastName ? user.lastName : "",
                  title: user.title
                    ? { value: user.title, label: titles[user.title] }
                    : { value: "", label: "" },
                  dob: user.dob ? new Date(user.dob) : new Date(pastYear),
                }}
                onSubmit={() => console.log("submitting")}
              >
                {({ handleSubmit, isSubmitting, values, setFieldValue }) => (
                  <>
                    <Form onSubmit={handleSubmit}>
                      <Field
                        className="basic-select"
                        defaultValue={values.title}
                        name="title"
                        as={Select}
                        options={options}
                        onChange={(values: { value: string; label: string }) =>
                          setFieldValue("title", values)
                        }
                        theme={(theme: any) => ({
                          ...theme,
                          borderRadius: 5,
                          colors: {
                            ...theme.colors,
                            primary25: "#f2a69a",
                            primary: "#99525d",
                          },
                        })}
                        isSearchable={false}
                        laceholder="Title"
                        onBlur={() => updateUser(values, user.id, token)}
                      />
                      <Field
                        name="firstName"
                        type="input"
                        placeholder="First name"
                        onBlur={() => updateUser(values, user.id, token)}
                      />
                      <Field
                        name="lastName"
                        type="input"
                        placeholder="Last name"
                        onBlur={() => updateUser(values, user.id, token)}
                      />
                      <Field
                        name="dob"
                        as={DatePicker}
                        selected={values.dob}
                        onChange={(date: Date) => setFieldValue("dob", date)}
                        maxDate={new Date(pastYear)}
                        onBlur={() => updateUser(values, user.id, token)}
                        showYearDropdown
                        dateFormatCalendar="MMMM"
                        yearDropdownItemNumber={100}
                        scrollableYearDropdown
                      />
                      <pre>{JSON.stringify(values, null, 2)}</pre>
                      <button hidden={true} />
                    </Form>
                  </>
                )}
              </Formik>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default userProfile;
