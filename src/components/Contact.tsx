import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper" id="contact">
      <div className="contact-section section-container">
        <div className="contact-container">
          <h3>Contact</h3>
          <div className="contact-flex">
            <div className="contact-box">
              <h4>Email</h4>
              <p>
                <a href="mailto:sanjitoffl@gmail.com" data-cursor="disable">
                  sanjitoffl@gmail.com
                </a>
              </p>
              <h4>Phone</h4>
              <p>
                <a href="tel:+918925774194" data-cursor="disable">
                  +91 89257 74194
                </a>
              </p>
            </div>
            <div className="contact-box">
              <h4>Social</h4>
              <a
                href="https://github.com/sanjitp-23"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Github <MdArrowOutward />
              </a>
              <a
                href="https://www.linkedin.com/in/sanjit-p-a16b99283/"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Linkedin <MdArrowOutward />
              </a>
              <a
                href="https://x.com/Sanjit___23"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Twitter <MdArrowOutward />
              </a>
              <a
                href="https://www.instagram.com/sanjit___23?igsh=bzFhOXY2aDR1cjRt"
                target="_blank"
                data-cursor="disable"
                className="contact-social"
              >
                Instagram <MdArrowOutward />
              </a>
            </div>
            <div className="contact-box">
              <h2>
                Designed and Developed <br /> by <span>Sanjit P</span>
              </h2>
              <h5>
                <MdCopyright /> 2026
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
