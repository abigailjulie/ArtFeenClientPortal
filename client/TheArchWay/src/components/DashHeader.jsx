import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import "./DashHeader.css";

const DASH_REGEX = /^\/dash(\/)?$/;
const PROJECTS_REGEX = /^\/dash\/projects(\/)?$/;
const CLIENTS_REGEX = /^\/dash\/clients(\/)?$/;

export default function DashHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;

  if (isError) return <p>Error: {error.data?.message}</p>;

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !PROJECTS_REGEX.test(pathname) &&
    !CLIENTS_REGEX.test(pathname)
  ) {
    dashClass = "fw-lighter";
  }

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

  const logoutBtn = (
    <button className="btn" title="Logout" onClick={sendLogout()}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);

  return (
    <header className="dash-header mt-3">
      <main className={`ms-4 dash-container ${dashClass}`}>
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
          <nav>{logoutBtn}</nav>
        </div>
        <p className="mb-0">Phase: Programming</p>
        <p className="ft-large fw-bold mb-0 line-height-min">$17,490</p>
        <p>Outstanding balance as of {today}</p>
      </main>
      {homeBtn}
    </header>
  );
}
