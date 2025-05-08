import React from "react";
import { useState, useEffect } from "react";
import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "./clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const CLIENT_REGEX =
  /^[A-Za-z](?!.*[.-]{2})(?:[A-Za-z]|[.-](?=[A-Za-z])){1,18}[A-Za-z]$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;

export default function EditClientForm({ client }) {
  const [updateClient, { isLoading, isSuccess, isError, error }] =
    useUpdateClientMutation();

  const [
    deleteClient,
    { isSuccess: isDelSuccess, isError: isDelError, error: delError },
  ] = useDeleteClientMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(client.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState(client.password);
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(client.roles);
  const [active, setActive] = useState(client.active);

  useEffect(() => {
    setValidUsername(CLIENT_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/clients");
    }
  }, [isSuccess, isDelSuccess, navigate]);

  const onUsernameChanged = (e) => {
    setUsername(e.target.value);
  };

  const onPasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  const onRolesChanged = (e) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(values);
  };

  const onActiveChanged = () => {
    setActive((prev) => !prev);
  };

  const onSaveClientClicked = async (e) => {
    if (password) {
      await updateClient({ id: client.id, username, password, roles, active });
    } else {
      await updateClient({ id: client.id, username, roles, active });
    }
  };

  const onDeleteClientClicked = async (e) => {
    await deleteClient({ id: client.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const errClass = isError || isDelError ? "errmsg" : "offscreen";
  const validClientClass = !validUsername ? "border border-danger" : "";
  const validPwdClass =
    password && !validPassword ? "border border-danger" : "";
  const validRolesClass = !Boolean(roles.length) ? "border border-danger" : "";

  const errContent = (error?.data?.message || delError?.data?.message) ?? "";

  return (
    <>
      <p className={errClass}>{errContent}</p>

      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <h2>Edit Client</h2>
          <div>
            <button
              className="btn"
              title="Save"
              onClick={onSaveClientClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="btn"
              title="Delete"
              onClick={onDeleteClientClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>

        <label htmlFor="username">
          Username: <span className="text-nowrap">[3-20 letters incl. .-]</span>
        </label>
        <input
          className={validClientClass}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label htmlFor="password">
          Password:
          <span className="text-nowrap">[4-12 letters incl. !@#$%]</span>
        </label>
        <input
          className={validPwdClass}
          id="password"
          name="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={onPasswordChanged}
        />

        <label htmlFor="roles">ASSIGNED ROLES:</label>
        <select
          className={validRolesClass}
          id="roles"
          name="roles"
          multiple={true}
          size={3}
          value={roles}
          onChange={onRolesChanged}
        >
          {options}
        </select>

        <label htmlFor="clientActive">ACTIVE:</label>
        <input
          id="clientActive"
          name="clientActive"
          type="checkbox"
          checked={active}
          onChange={onActiveChanged}
        />
      </form>
    </>
  );
}
