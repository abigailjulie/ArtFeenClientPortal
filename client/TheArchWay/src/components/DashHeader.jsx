import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import "./DashHeader.css";

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleGoHome = () => {
    navigate("/dash");
  };

  let homeBtn = null;
  if (pathname !== "/dash") {
    homeBtn = (
      <button className="homeBtn" title="Home" onClick={handleGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);

  return (
    <header className="dash-header mt-3">
      <main className="ms-4 dash-container">
        <div className="d-flex flex-row align-items-center">
          <p className="mb-0">
            Client Name:
            <strong className="ms-2">
              <Link
                className="link-dark link-underline link-underline-opacity-0 link-opacity-50-hover"
                to="/dash/profile"
              >
                Client Name
              </Link>
            </strong>
            <span className="mx-2">X</span>
            <Link
              className="link-dark link-underline link-underline-opacity-0 link-opacity-50-hover"
              to="/dash"
            >
              The ArchWay
            </Link>
          </p>
        </div>
        <p className="mb-0">Phase: Programming</p>
        <p className="ft-large fw-bold mb-0 line-height-min">$17,490</p>
        <p>Outstanding balance as of {today}</p>
      </main>
      {homeBtn}
    </header>
  );
}
