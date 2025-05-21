import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import { selectAllClients } from "../features/clients/clientsApiSlice";
import "./DashHeader.css";

const DASH_REGEX = /^\/dash(\/)?$/;
const PROJECTS_REGEX = /^\/dash\/projects(\/)?$/;
const CLIENTS_REGEX = /^\/dash\/clients(\/)?$/;

export default function DashHeader() {
  const { username, isAdmin, isFounder, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const clients = useSelector(selectAllClients);
  const client = clients?.find(
    (currentClient) => currentClient.username === username
  );

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  const onNewProjectClicked = () => {
    if (client?._id) {
      navigate(`/dash/clients/${client?._id}/projects/new`);
    } else {
      console.error("Client ID not found for user:", username);
    }
  };
  const onNewClientClicked = () => {
    navigate("/dash/clients/new");
  };
  const onProjectsClicked = () => {
    navigate("/dash/projects");
  };
  const onClientsClicked = () => {
    navigate("/dash/clients");
  };

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

  const handleLogout = async () => {
    try {
      await sendLogout().unwrap();
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Logout failed", err);
    }
  };

  let newProjectBtn = null;
  if (!isAdmin && !isFounder && PROJECTS_REGEX.test(pathname)) {
    newProjectBtn = (
      <button className="btn" title="New Project" onClick={onNewProjectClicked}>
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newClientBtn = null;
  if (CLIENTS_REGEX.test(pathname)) {
    newClientBtn = (
      <button className="btn" title="New Client" onClick={onNewClientClicked}>
        <FontAwesomeIcon icon={faUserPlus} />
      </button>
    );
  }

  let projectsBtn = null;
  if (!PROJECTS_REGEX.test(pathname) && pathname.includes("/dash")) {
    projectsBtn = (
      <button className="btn" title="View Projects" onClick={onProjectsClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  let clientsBtn = null;
  if (isAdmin || isFounder) {
    if (!CLIENTS_REGEX.test(pathname) && pathname.includes("/dash")) {
      clientsBtn = (
        <button className="btn" title="View Clients" onClick={onClientsClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let homeBtn = null;
  if (pathname !== "/dash") {
    homeBtn = (
      <button className="btn" title="Home" onClick={handleGoHome}>
        <FontAwesomeIcon icon={faHouse} />
      </button>
    );
  }

  const logoutBtn = (
    <button className="btn" title="Logout" onClick={handleLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);

  const errClass = isError ? "errmsg" : "";

  let btnContent;
  if (isLoading) {
    btnContent = <p>Logging Out...</p>;
  } else {
    btnContent = (
      <>
        {newProjectBtn}
        {newClientBtn}
        {projectsBtn}
        {clientsBtn}
        {logoutBtn}
      </>
    );
  }

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>

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
                  {username}
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
            <nav>{btnContent}</nav>
          </div>
          <p className="mb-0">Phase: Programming</p>
          <p className="mb-0">Status: {status}</p>
          <p className="ft-large fw-bold mb-0 line-height-min">$17,490</p>
          <p>Outstanding balance as of {today}</p>
        </main>
        {homeBtn}
      </header>
    </>
  );
}
