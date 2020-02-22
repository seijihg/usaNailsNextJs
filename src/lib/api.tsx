const contactForm7 =
  "https://usanails.uk.cloudlogin.co/wp-json/contact-form-7/v1/contact-forms/49/feedback";

export const sendEmail = async (data: FormData) => {
  const res = await fetch(contactForm7, {
    method: "POST",
    body: data
  });

  const body = await res.json();
  return body;
};
