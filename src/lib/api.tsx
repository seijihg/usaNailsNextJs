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
