import React from "react";
import { useState, useEffect } from "react";
import {
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function EditProjectForm({ project, clients }) {
  const [updateProject, { isLoading, isSuccess, isError, error }] =
    useUpdateProjectMutation();

  const [
    deleteProject,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteProjectMutation();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState(project.name);
  const [projectAddress, setProjectAddress] = useState(project.address);
  const [projectNumber, setProjectNumber] = useState(project.number);
  const [projectTelephone, setProjectTelephone] = useState(project.telephone);
  const [clientId, setClientId] = useState(project.client);
  const [status, setStatus] = useState(project.status);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setProjectName("");
      setProjectAddress("");
      setProjectNumber("");
      setProjectTelephone("");
      setClientId("");
      setStatus("");
      navigate("/dash/projects");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onNameChanged = (e) => {
    setProjectName(e.target.value);
  };
  const onNumberChanged = (e) => {
    setProjectNumber(e.target.value);
  };
  const onAddressChanged = (e) => {
    setProjectAddress(e.target.value);
  };
  const onTelephoneChanged = (e) => {
    setProjectTelephone(e.target.value);
  };
  const onClientIdChanged = (e) => {
    setClientId(e.target.value);
  };
  const onStatusChanged = (e) => {
    setStatus(e.target.value);
  };

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await updateProject({
      id: project.id,
      name: projectName,
      number: projectNumber,
      address: projectAddress,
      telephone: projectTelephone,
      status,
      client: clientId,
    });
  };

  const onDeleteProjectClicked = async () => {
    await deleteProject({ id: project.id });
  };

  const created = new Date(project.createdAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const updated = new Date(project.updatedAt).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const options = clients.map((client) => {
    return (
      <option key={client.id} value={client.id}>
        {client.username}
      </option>
    );
  });

  const canSave =
    [clientId, project.id, projectName, status].every(Boolean) && !isLoading;

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <h2>Edit Project:</h2>
          <div>
            <button
              className="btn"
              title="Save"
              onClick={onSaveProjectClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>

            <button
              className="btn"
              title="Delete"
              onClick={onDeleteProjectClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        id, name, number, address, telephone, status, client
        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={projectName}
          onChange={onNameChanged}
        />
        <label htmlFor="number">Project Number:</label>
        <input
          type="text"
          name="number"
          id="number"
          autoComplete="off"
          value={projectNumber}
          onChange={onNumberChanged}
        />
        <label htmlFor="address">Project Address:</label>
        <input
          type="text"
          name="address"
          id="address"
          autoComplete="off"
          value={projectAddress}
          onChange={onAddressChanged}
        />
        <label htmlFor="telephone">Project Telephone:</label>
        <input
          type="text"
          name="telephone"
          id="telephone"
          autoComplete="off"
          value={projectTelephone}
          onChange={onTelephoneChanged}
        />
        <label htmlFor="projectActive">ACTIVE:</label>
        <input
          id="projectActive"
          name="projectActive"
          type="checkbox"
          checked={active}
          onChange={onStatusChanged}
        />
        <label htmlFor="projectUsername">ASSIGNED TO:</label>
        <select
          id="projectUsername"
          name="username"
          value={clientId}
          onChange={onClientIdChanged}
        >
          {options}
        </select>
        <div>
          <p>Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>
      </form>
    </>
  );
}
