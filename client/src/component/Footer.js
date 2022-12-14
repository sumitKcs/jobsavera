import React from "react";
import { BsFacebook, BsLinkedin } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="footer-container">
      <div className="brand-name">Jobsavera</div>
      <div className="copyright">&copy; {year}</div>
      <div className="social_icons">
        <div className="facebook">
          <a href="https://www.facebook.com/risesumit" target="_blank">
            <BsFacebook />
          </a>
        </div>
        <div className="instagram">
          {" "}
          <a href="https://www.instagram.com/rise_sumit/" target="_blank">
            <AiFillInstagram />
          </a>
        </div>
        <div className="linkedin">
          <a href="https://www.linkedin.com/in/sumitssr/" target="_blank">
            <BsLinkedin />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
