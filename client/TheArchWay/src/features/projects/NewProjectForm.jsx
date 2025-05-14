import React from "react";
import { useState, useEffect } from "react";
import { useAddNewProjectMutation } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

export default function NewProjectForm({ project, clients }) {
  const [addNewProject, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectTelephone, setProjectTelephone] = useState("");
  const [clientId, setClientId] = useState(clients.id);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash/projects");
    }
  }, [isSuccess, navigate]);

  const onNameChanged = (e) => {
    setProjectName(e.target.value);
  };
  const onAddressChanged = (e) => {
    setProjectAddress(e.target.value);
  };
  const onTelephoneChanged = (e) => {
    setProjectTelephone(e.target.value);
  };

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    await addNewProject({
      name: projectName,
      address: projectAddress,
      telephone: projectTelephone,
      client: clientId,
    });
  };

  const canSave =
    [clientId, projectName, projectAddress, projectTelephone].every(Boolean) &&
    !isLoading;

  const errClass = isError ? "errmsg" : "offscreen";

  const errContent = error?.data?.message ?? "";

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <h2>New Project Information:</h2>
          <div>
            <button
              className="btn"
              title="Save"
              onClick={onSaveProjectClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>

        <label htmlFor="name">Project Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="off"
          value={projectName}
          onChange={onNameChanged}
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

        <div>
          <p>Created: {created}</p>
        </div>
      </form>
    </>
  );
}
