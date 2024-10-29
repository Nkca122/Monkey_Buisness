import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCircleInfo,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="h-div">
        <div className="h-item-div container">
          <div className="h-hero">
            <img src="../assets/logo.png" alt="" className="h-logo" />
            <button>Start</button>
          </div>
        </div>
        <div className="h-item-div container">
          <ul className="h-menu">
            <li className="h-menu-item">
              <div className="tooltip">
                <Link to={"/"} className="container text-center">
                  <FontAwesomeIcon icon={faHouse} size="xl" />
                </Link>
                <span className="tooltiptext">Home</span>
              </div>
            </li>
            <li className="h-menu-item">
              <div className="tooltip">
                <Link to={"/"} className="container text-center">
                  <FontAwesomeIcon icon={faCircleInfo} size="xl" />
                </Link>
                <span className="tooltiptext">About Us</span>
              </div>
            </li>
            <li className="h-menu-item">
              <div className="tooltip">
                <Link to={"/"} className="container text-center">
                  <FontAwesomeIcon icon={faPhone} size="xl" />
                </Link>
                <span className="tooltiptext">
                    Contact Us
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
