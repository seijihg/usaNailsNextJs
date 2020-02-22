import { NextPage } from "next";
import Layout from "src/components/Layout";
import News from "src/components/news/News";
import Blogs from "src/components/blogs/Blogs";
import Prices from "src/components/price_list/Prices";
import Contact from "src/components/Contact";
import ImageSlidesAtIndex from "src/components/ImageSlidesAtIndex";

const Index: NextPage = () => {
  console.log(
    "Welcome to USA Nails Dev Window. If you have any questions please contact our technical department."
  );
  return (
    <Layout>
      <div className="index-main">
        <div className="index-img-voucher"></div>
        <div className="index-opening-time">
          <div>
            <h1>OPENING TIME</h1>
            <h2>SUNDAY</h2>
            <p>Closed</p>
            <h2>MONDAY - SATURDAY</h2>
            <p>10:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="index-img-interior">
          <ImageSlidesAtIndex />
        </div>
        <div className="index-img-shop1"></div>
        <div className="index-welcome-brief">
          <h1>WELCOME TO SALON</h1>
          <p>
            Welcome to USA Nails. This is a perfect place for you to relax and
            be pampered. Established in 2007, our salon is proud to be the first
            nail salon in Berkhamsted.
          </p>
        </div>
        <div className="index-img-shop2"></div>
        <div className="index-follow-us">
          <h1>FOLLOW US ON</h1>
          <div>
            <img src="/assets/img/icons/facebook.png" alt="fb icon" />
            <img src="/assets/img/icons/google.png" alt="google icon" />
            <img src="/assets/img/icons/twitter.png" alt="twitter icon" />
            <img src="/assets/img/icons/rss.png" alt="rss icon" />
          </div>
          <h1>ADDRESS</h1>
          <p>5 The Hall Walk, London Rd</p> <p>Berkhamsted HP4 2BU</p>
        </div>
        <div className="index-call-appointment">
          <h1>Call +44 1442 878 188 To Make Your Appointment</h1>
        </div>
        <div className="index-latest-news">
          <h1>LATEST NEWS AND BLOGS</h1>
        </div>
        <div className="index-news">
          <News />
        </div>
        <div className="index-blog">
          <Blogs />
        </div>
        <div className="index-our-services">
          <h1>OUR SERVICES</h1>
          <p>
            Our aim is to provide excellent personal and professional nail and
            beauty services to every customer while maintaining a high level of
            quality and hygiene. Our dedicated nail tech team are fully
            qualified and experienced. Their aim is to make each visit a
            positive experience and of course great looking nails!
          </p>
          <ul>
            <li>- NAIL EXTENSIONS</li>
            <li>- MANICURE & PEDICURE</li>
            <li>- NAIL DESIGN AND SERVICES</li>
          </ul>
          <div className="index-our-services-signature">
            <h2>USA NAILS</h2>
            <p>PROFESSIONAL NAILS SALON</p>
          </div>
        </div>
        <div className="index-img-shop3"></div>
        <div className="index-img-shop4"></div>
        <div className="index-price-list">
          <Prices />
        </div>
        <div className="about-us">
          <h1>ABOUT US</h1>
          <p>
            Visiting us, you will receive a complimentary drink to make you
            relax and unwind while you are in our safe hands. We use the best
            quality products such as OPI, CND Shellac and Precision to transform
            your hands and feet. Appointments are preferred, however should you
            need a last minute revamp on your nails or feet then we will always
            try to accommodate and walk-ins will be welcomed.
          </p>
        </div>
        <div className="reviews">
          <p>
            Our spa offers a built- in ventilation system to bring you fresh
            air, comfort and protection. Your safety and well-being are our top
            priorities
          </p>
        </div>
        <div className="index-contact">
          <Contact />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
