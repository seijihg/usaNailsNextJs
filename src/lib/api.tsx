const baseUrl = "http://localhost:8080";

// Contact Form.
const contactForm7 =
  "https://usanails.uk.cloudlogin.co/wp-json/contact-form-7/v1/contact-forms/49/feedback";

export const sendEmail = async (data: FormData) => {
  const res = await fetch(contactForm7, {
    method: "POST",
    body: data,
  });

  const body = await res.json();
  return body;
};

// Comments API.
export const getPostComments = async (slug: string) => {
  const res = await fetch(`${baseUrl}/api_v1/post/${slug}`);

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

const userEP = `${baseUrl}/api_v1/user/get-me`;

export const getMe = async (token: string) => {
  const res = await fetch(userEP, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  const user = await res.json();
  return user;
};
