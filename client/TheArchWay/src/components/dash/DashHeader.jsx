import { useEffect } from "react";
import {
  faRightFromBracket,
  faFileCirclePlus,
  faFilePen,
  faUserGear,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useGetClientsQuery } from "../../features/clients/clientsApiSlice";
import { useGetProjectsQuery } from "../../features/projects/projectsApiSlice";
import { useDashNavigation } from "../../hooks/dash/useDashNavigation";
import { useDashHeader } from "../../hooks/dash/useDashHeader";
import { DASH_REGEX, PROJECTS_REGEX, CLIENTS_REGEX } from "../../utils/regex";
import useAuth from "../../hooks/useAuth";
import Loader from "../Loader";
import DynButton from "../DynButton";
import "./DashHeader.css";
import DashProjectInfo from "./DashProjectInfo";

export default function DashHeader() {
  const { username, isAdmin, isFounder, status } = useAuth() || {};
  const { pathname } = useLocation();

  const {
    data: clientsData,
    isLoading: clientsLoading,
    isSuccess: clientsSuccess,
  } = useGetClientsQuery("clientsList");

  const { data: projectsData, isSuccess: projectsSuccess } =
    useGetProjectsQuery("projectsList");

  const {
    client,
    clients,
    projects,
    clientsProjects,
    selectedProject,
    selectedProjectId,
    setSelectedProjectId,
  } = useDashHeader(
    username,
    clientsData,
    clientsSuccess,
    projectsData,
    projectsSuccess
  );

  const {
    onNewProjectClicked,
    onNewClientClicked,
    onProjectsClicked,
    onClientsClicked,
    handleGoHome,
    onLogoutClicked,
  } = useDashNavigation(client);

  useEffect(() => {
    if (clientsProjects?.length > 0 && selectedProjectId === null) {
      setSelectedProjectId(clientsProjects[0]._id);
    }
  }, [clientsProjects, selectedProjectId]);

  let dashClass = null;
  if (
    !DASH_REGEX.test(pathname) &&
    !PROJECTS_REGEX.test(pathname) &&
    !CLIENTS_REGEX.test(pathname)
  ) {
    dashClass = "";
  }

  let btnContent;
  if (clientsLoading || !clientsSuccess || !projectsSuccess) {
    btnContent = <Loader />;
  } else {
    btnContent = (
      <>
        <DynButton
          icon={faFileCirclePlus}
          className="forest mb-2"
          title="New Project"
          onClick={onNewProjectClicked}
          show={
            !isAdmin &&
            !isFounder &&
            pathname.includes("/projects") &&
            clientsSuccess &&
            client?._id
          }
        />

        <DynButton
          icon={faUserPlus}
          className="forest mb-2"
          title="New Client"
          onClick={onNewClientClicked}
          show={CLIENTS_REGEX.test(pathname)}
        />

        <DynButton
          icon={faFilePen}
          className="forest mb-2"
          title="View Projects"
          onClick={onProjectsClicked}
          show={!pathname.includes("/projects") && pathname.includes("/dash")}
        />

        <DynButton
          icon={faUserGear}
          className="forest mb-2"
          title="View Clients"
          onClick={onClientsClicked}
          show={
            (isAdmin || isFounder) &&
            !CLIENTS_REGEX.test(pathname) &&
            pathname.includes("/dash")
          }
        />

        <DynButton
          icon={faRightFromBracket}
          className="forest mb-2"
          title="Logout"
          onClick={onLogoutClicked}
          show={true}
        />
      </>
    );
  }

  return (
    <>
      <header className="dash-header pt-3 bg-white">
        <main
          className={`d-flex justify-content-between ms-4 dash-container ${dashClass}`}
        >
          <div>
            <div className="d-flex flex-row align-items-center">
              <p className="mb-0">
                <strong>
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

            {!isAdmin && !isFounder ? (
              <DashProjectInfo
                selectedProject={selectedProject}
                clientsProjects={clientsProjects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={setSelectedProjectId}
              />
            ) : (
              <p>Admin View</p>
            )}
          </div>

          <nav className="d-flex flex-column me-4">{btnContent}</nav>
        </main>
      </header>
    </>
  );
}
