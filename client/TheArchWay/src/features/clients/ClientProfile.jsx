import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetClientsQuery } from "./clientsApiSlice";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { showToast } from "../../utils/showToast";
import useAuth from "../../hooks/useAuth";
import Loader from "../../components/Loader";

export default function ClientProfile() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { username, isAdmin, isFounder } = useAuth() || {};

  const {
    data: clientData,
    isLoading: clientLoading,
    isSuccess: clientSuccess,
    isError: clientError,
    error: clientErrorDetails,
  } = useGetClientsQuery("clientsList");

  const {
    data: projectsData,
    isSuccess: projectsSuccess,
    isError: projectsError,
  } = useGetProjectsQuery("projectsList");

  const client = clientData?.entities?.[clientId];

  useEffect(() => {
    if (clientError) {
      const errorMessage =
        clientErrorDetails?.data?.message ||
        clientErrorDetails?.message ||
        "Unable to load client information";
      showToast.error(errorMessage);

      setTimeout(() => {
        navigate("/dash");
      }, 3000);
    }
  }, [clientError, clientErrorDetails, navigate]);

  useEffect(() => {
    if (projectsError) {
      showToast.error("Unable to load project information");
    }
  }, [projectsError]);

  useEffect(() => {
    if (clientSuccess && !client) {
      showToast.error("Client not found");
      setTimeout(() => {
        navigate("/dash");
      }, 2000);
    }
  }, [clientSuccess, client, navigate]);

  const clientsProjects =
    client?.projects && projectsSuccess && projectsData?.entities
      ? client.projects
          .map((projectId) => projectsData.entities[projectId])
          .filter((project) => project !== undefined)
      : [];

  if (clientLoading) return <Loader />;

  if (clientError || !clientSuccess || !client) return <Loader />;

  return (
    <div className="container-md">
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        Client Profile
      </h2>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Name</label>
        <p className="form-control-plaintext border-bottom pb-2 mb-3">
          {client.username || "Not specified"}
        </p>
      </div>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Email</label>
        <p className="form-control-plaintext border-bottom pb-2 mb-3">
          {client.email || "Not specified"}
        </p>
      </div>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Telephone</label>
        <p className="form-control-plaintext border-bottom pb-2 mb-3">
          {client.telephone || "Not specified"}
        </p>
      </div>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Company Name</label>
        <p className="form-control-plaintext border-bottom pb-2 mb-3">
          {client.company?.name || "Not specified"}
        </p>
      </div>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Company Address</label>
        <p className="form-control-plaintext border-bottom pb-2 mb-3">
          {client.company?.address || "Not provided"}
        </p>
      </div>

      <div className="d-flex flex-column">
        <label className="form-label text-muted small">Company Telphone</label>
        <p className="form-control-plaintext pb-2 mb-3">
          {client.company?.telephone || "Not provided"}
        </p>
      </div>
    </div>
  );
}
