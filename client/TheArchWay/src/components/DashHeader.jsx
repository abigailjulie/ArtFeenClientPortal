import React, { useEffect, useState } from "react";
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
import { useGetClientsQuery } from "../features/clients/clientsApiSlice";
import "./DashHeader.css";
import { useGetProjectsQuery } from "../features/projects/projectsApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from "react-bootstrap";

const DASH_REGEX = /^\/dash(\/)?$/;
const PROJECTS_REGEX = /^\/dash\/projects(\/)?$/;
const CLIENTS_REGEX = /^\/dash\/clients(\/)?$/;

export default function DashHeader() {
  const { username, isAdmin, isFounder, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    data: clientsData,
    isLoading: clientsLoading,
    isSuccess: clientsSuccess,
  } = useGetClientsQuery("clientsList");

  const clients = clientsSuccess
    ? clientsData?.ids.map((id) => clientsData.entities[id])
    : [];

  const client = clients?.find(
    (currentClient) => currentClient.username === username
  );

  const { data: projectsData, isSuccess: projectsSuccess } =
    useGetProjectsQuery("projectsList");

  const projects = projectsSuccess
    ? projectsData.ids.map((id) => projectsData.entities[id])
    : [];

  const clientsProjects = projects?.filter((project) => {
    const projectClientId =
      typeof project.client === "object" ? project.client._id : project.client;
    return projectClientId === client?._id;
  });

  const [selectedProjectId, setSelectedProjectId] = useState(null);

  const selectedProject = clientsProjects?.find(
    (project) => project._id === selectedProjectId
  );

  const [sendLogout, { isLoading, isSuccess, isError, error }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (clientsProjects?.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(clientsProjects[0]._id);
    }
  }, [clientsProjects, selectedProjectId]);

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
    if (client?._id) {
      navigate(`/dash/clients/${client?._id}/projects`);
    } else {
      navigate("/dash/projects");
    }
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
    dashClass = "";
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
  if (
    !isAdmin &&
    !isFounder &&
    pathname.includes("/projects") &&
    clientsSuccess &&
    client?._id
  ) {
    newProjectBtn = (
      <Button
        className="forest mb-2"
        title="New Project"
        onClick={onNewProjectClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </Button>
    );
  }

  let newClientBtn = null;
  if (CLIENTS_REGEX.test(pathname)) {
    newClientBtn = (
      <Button
        className="forest mb-2"
        title="New Client"
        onClick={onNewClientClicked}
      >
        <FontAwesomeIcon icon={faUserPlus} />
      </Button>
    );
  }

  let projectsBtn = null;
  if (!pathname.includes("/projects") && pathname.includes("/dash")) {
    projectsBtn = (
      <Button
        className="forest mb-2"
        title="View Projects"
        onClick={onProjectsClicked}
      >
        <FontAwesomeIcon icon={faFilePen} />
      </Button>
    );
  }

  let clientsBtn = null;
  if (isAdmin || isFounder) {
    if (!CLIENTS_REGEX.test(pathname) && pathname.includes("/dash")) {
      clientsBtn = (
        <Button
          className="forest mb-2"
          title="View Clients"
          onClick={onClientsClicked}
        >
          <FontAwesomeIcon icon={faUserGear} />
        </Button>
      );
    }
  }

  const logoutBtn = (
    <Button className="forest" title="Logout" onClick={handleLogout}>
      <span>
        <FontAwesomeIcon icon={faRightFromBracket} />
      </span>
    </Button>
  );

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
  }).format(date);

  const errClass = isError ? "errmsg" : "";

  let btnContent;
  if (isLoading) {
    btnContent = <PulseLoader color={"var(--Forest)"} />;
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
        <main
          className={`d-flex justify-content-between ms-4 dash-container ${dashClass}`}
        >
          <div>
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
            </div>

            {clientsProjects?.length > 1 && (
              <select
                className="form-select mt-2 mb-2"
                value={selectedProjectId || ""}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                style={{ maxWidth: "300px" }}
              >
                {clientsProjects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.name}
                  </option>
                ))}
              </select>
            )}

            {selectedProject ? (
              <>
                <p className="mb-0">Phase: {selectedProject.phase.name}</p>
                <p className="mb-0">Status: {selectedProject.status}</p>
                <p className="ft-large fw-bold mb-0 line-height-min">
                  ${selectedProject.finances.budget.toLocaleString()}
                </p>
                <p>Outstanding balance as of {today}</p>
              </>
            ) : (
              <p className="text-muted mt-2">
                No project information available
              </p>
            )}
          </div>

          <nav className="d-flex flex-column">{btnContent}</nav>
        </main>
      </header>
    </>
  );
}
