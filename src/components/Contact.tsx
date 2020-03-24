import { FunctionComponent, useState, FormEvent } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { sendEmail } from "src/lib/api";

const Contact: FunctionComponent = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailContent, setEmailContent] = useState<string>("");

  const emailSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    let data = new FormData();
    data.append("your-name", name);
    data.append("your-email", email);
    data.append("your-message", emailContent);

    sendEmail(data).then(console.log);

    setEmailContent("");
    setName("");
    setEmail("");
  };
  return (
    <>
      <h1>CONTACT US</h1>
      <div className="contact">
        <div className="contact-left-column">
          <div className="location">
            <h2>LOCATION</h2>
            <p>
              5 The Hall Walk, London Road Berkhamsted Hertfortshire HP4 2BU
            </p>
          </div>
          <div className="email">
            <h2>E-MAIL</h2>
            <a href="mailto:contact@usa-nails.co.uk?Subject=Hello%20again">
              contact@usa-nails.co.uk
            </a>
          </div>
          <div className="telephone">
            <h2>TELEPHONE</h2>
            <p>+44 1442 878 188</p>
          </div>
          <div className="social">
            <h2>SOCIAL</h2>
            <div>
              <img src="/assets/img/icons/facebook.png" alt="fb icon" />
              <img src="/assets/img/icons/google.png" alt="google icon" />
              <img src="/assets/img/icons/twitter.png" alt="twitter icon" />
              <img src="/assets/img/icons/rss.png" alt="rss icon" />
            </div>
          </div>
          <div className="image"></div>
        </div>
        <form onSubmit={emailSubmitHandler}>
          <input
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            placeholder="Enter Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextareaAutosize
            onChange={(e) => setEmailContent(e.target.value)}
            minRows={10}
            maxRows={15}
            value={emailContent}
            placeholder="Enter Message"
          />
          <button>SEND MESSAGE</button>
        </form>
      </div>
    </>
  );
};

export default Contact;
