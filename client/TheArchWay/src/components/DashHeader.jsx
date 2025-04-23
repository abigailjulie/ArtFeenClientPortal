import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

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

  return (
    <header className="dash-header">
      <div className="dash-container">
        <p>Current User:</p>
        <p>Phase:</p>
        <p>Status:</p>
        <p>Outstanding Balance:</p>
        <Link to="/dash">
          <h1>The ArchWay</h1>
        </Link>
        <Link to="/dash/profile">
          <h3>Client Profile</h3>
        </Link>
      </div>
      {homeBtn}
    </header>
  );
}
