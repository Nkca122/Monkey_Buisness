import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faLinkedin,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

import { faCopyright } from "@fortawesome/free-solid-svg-icons";
export default function Footer() {
  return (
    <>
      <div className="f-div">
        <div className="f-socials-div">
          <ul className="f-socials-list container">
            <a href="#" className="f-socials container">
              <FontAwesomeIcon icon={faGithub} size="xl" />
            </a>
            <a href="#" className="f-socials container">
              <FontAwesomeIcon icon={faLinkedin} size="xl" />
            </a>
            <a href="#" className="f-socials container">
              <FontAwesomeIcon icon={faInstagram} size="xl" />
            </a>
          </ul>
        </div>
        <div className="f-logo-div">
          <img src="../assets/logo.png" alt="" />
        </div>
        <div className="f-info-div container">
          <div className="container">
            <FontAwesomeIcon icon={faCopyright} size="sm" />
          </div>
          <p className="container f-info">nkca122@gmail.com</p>
        </div>
      </div>
    </>
  );
}
