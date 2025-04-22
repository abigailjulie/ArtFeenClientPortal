import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

export default function DashHeader() {
  const navigate = useNavigate;
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
    <section className="dash-Header">
      {homeBtn}
      <p>Current User:</p>
      <p>Status:</p>
    </section>
  );
}
