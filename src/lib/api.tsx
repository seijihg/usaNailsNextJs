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
const commentEndPoint = "http://localhost:8080/api_v1/comment";

// Signup API

const signupEP = "http://localhost:8080/api_v1/signup";

export const signup = async (data: ReadableStream) => {
  const res = await fetch(signupEP, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const user = await res.json();
  return user;
};

// Get a user API

const userEP = "http://localhost:8080/api_v1/user/get-me";

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
