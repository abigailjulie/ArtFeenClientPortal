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
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyNumber, setCompanyNumber] = useState("");

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

  const onCompanyNameChanged = (e) => {
    setCompanyName(e.target.value);
  };

  const onCompanyAddressChanged = (e) => {
    setCompanyAddress(e.target.value);
  };

  const onCompanyNumberChanged = (e) => {
    setCompanyNumber(e.target.value);
  };

  const onTelephoneChanged = (e) => {
    setTelephone(e.target.value);
  };

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const canSave =
    [
      roles.length,
      validUsername,
      validPassword,
      companyName,
      companyAddress,
      companyNumber,
    ].every(Boolean) && !isLoading;

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      console.log("Submitting new client:", { username, password, roles });
      try {
        const result = await addNewClient({
          username,
          password,
          roles,
          company: {
            name: companyName,
            address: companyAddress,
            telephone: companyNumber,
          },
        });
        console.log("Result of addNewClient:", result);
      } catch (err) {
        console.error("Error adding new client:", err);
      }
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
      <form
        className="h-100 d-flex flex-column justify-content-center align-items-center"
        onSubmit={onSaveClientClicked}
      >
        <div>
          <h2>New Client Information</h2>
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

        <label htmlFor="telephone">Telephone:</label>
        <input
          id="telephone"
          name="telephone"
          type="text"
          value={telephone}
          onChange={onTelephoneChanged}
        />

        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onEmailChanged}
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

        <h2>Company Information</h2>
        <label htmlFor="companyName">Company Name:</label>
        <input
          id="companyName"
          name="companyName"
          type="text"
          value={companyName}
          onChange={onCompanyNameChanged}
        />

        <label htmlFor="companyAddress">Company Address:</label>
        <input
          id="companyAddress"
          name="companyAddress"
          type="text"
          value={companyAddress}
          onChange={onCompanyAddressChanged}
        />

        <label htmlFor="companyNumber">Company Number:</label>
        <input
          id="companyNumber"
          name="companyNumber"
          type="text"
          value={companyNumber}
          onChange={onCompanyNumberChanged}
        />
      </form>
    </>
  );
}
