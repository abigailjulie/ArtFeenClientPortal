import React from "react";
import { useState, useEffect } from "react";
import { useAddNewClientMutation } from "./clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";

const CLIENT_REGEX =
  /^[A-Za-z](?!.*[.-]{2})(?:[A-Za-z]|[.-](?=[A-Za-z])){1,18}[A-Za-z]$/;
const PWD_REGEX = /^[A-Za-z0-9!@#$%]{4,12}$/;
export default function NewClientForm() {
  const [addNewClient, { isLoading, isSuccess, isError, error }] =
    useAddNewClientMutation();

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(["Client"]);

  useEffect(() => {
    setValidUsername(CLIENT_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      setUsername("");
      setPassword("");
      setRoles([]);
      navigate("/dash/clients");
    }
  }, [isSuccess, navigate]);

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

  const canSave =
    [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewClient({ username, password, roles });
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? "errmsg" : "offscreen";
  const validClientClass = !validUsername ? "border border-danger" : "";
  const validPwdClass = !validPassword ? "border border-danger" : "";
  const validRolesClass = !Boolean(roles.length) ? "border border-danger" : "";

  return (
    <>
      <p className={errClass}>{error?.data?.message}</p>
      <form onSubmit={onSaveClientClicked}>
        <div>
          <h2>New Client</h2>
          <div>
            <button
              className="btn"
              title="Save"
              onClick={onSaveClientClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
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
      </form>
    </>
  );
}
