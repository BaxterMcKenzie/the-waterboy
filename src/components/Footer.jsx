import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = ({style}) => {
  return (
    <footer style={style}>
      <div className="social">

        <div className="left-footer">
          <h4>Let's Get Social</h4>

          <a
            href="https://www.facebook.com/thewaterboynz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a
            href="https://www.instagram.com/the_waterboy_nz"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>

        <div className="right-footer">
          <img src="/header-bg-img/footer1.jpeg" alt="footer image" />
          <img src="/header-bg-img/footer2.jpeg" alt="footer image" />
          <img src="/header-bg-img/footer3.jpeg" alt="footer image" />
          <img src="/header-bg-img/footer4.jpeg" alt="footer image" />
        </div>

      </div>
    </footer>
  );
};

export default Footer;
