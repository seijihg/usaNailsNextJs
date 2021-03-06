export const baseUrl =
  typeof window !== "undefined" && location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://usa-nails.uk";

// Contact Form.
const contactForm = `${baseUrl}/api_v1/contact`;

export const sendEmail = async (data: {
  name: string;
  email: string;
  content: string;
}) => {
  const res = await fetch(contactForm, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  
  const body = await res.json();
  return body;
};

// Comments API.
export const getPostComments = async (slug: string, host: string) => {
  const url =
    host.split(":")[0] === "localhost"
      ? "http://localhost:8080"
      : "https://usa-nails.uk";

  const res = await fetch(`${url}/api_v1/post/${slug}`);

  const comments = await res.json();
  return comments;
};

export const addComment = async (
  data: {
    content: string;
    id_post: string;
  },
  token: string | undefined
) => {
  const res = await fetch(`${baseUrl}/api_v1/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(data),
  });
  return await res.json();
};

// Signup and Login API

const signupEP = `${baseUrl}/api_v1/signup`;
const loginEP = `${baseUrl}/api_v1/login`;

export const loginSignup = async (data: ReadableStream, endPoint: string) => {
  const res = await fetch(
    endPoint === "login" ? loginEP : endPoint === "signup" ? signupEP : "",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const user = await res.json();
  return user;
};

// Get a user API

export const getMe = async (token: string, host: string) => {
  const url =
    host?.split(":")[0] === "localhost"
      ? "http://localhost:8080"
      : "https://usa-nails.uk";

  const res = await fetch(
    `${typeof window === "undefined" ? url : baseUrl}/api_v1/user/get-me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  const user = await res.json();
  return user;
};

// Upload avatar
const uploadAvtEP = `${baseUrl}/api_v1/upload/avatar`;

export const uploadAvatar = async (
  form: FormData,
  token: string | undefined
) => {
  const res = await fetch(uploadAvtEP, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: form,
  });
  return await res.json();
};

// Update user

export const updateUser = async (
  body: {
    firstName: string;
    lastName: string;
    title: { [key: string]: string };
    dob: Date;
  },
  id: string,
  token: string | undefined
) => {
  const res = await fetch(`${baseUrl}/api_v1/user/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

// Send email with link to reset passwond

export const sendEmailToResetPass = async (inputEmail: string) => {
  const res = await fetch(`${baseUrl}/api_v1/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: inputEmail }),
  });

  return await res.json();
};

// change Pasword with reset form

export const setPassword = async (
  token: string | string[] | undefined,
  newPassword: string
) => {
  const res = await fetch(`${baseUrl}/api_v1/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token, password: newPassword }),
  });

  return await res.json();
};
