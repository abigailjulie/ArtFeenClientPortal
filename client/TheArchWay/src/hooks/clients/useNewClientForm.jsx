import React, { useState, useEffect } from "react";
import { useAddNewClientMutation } from "./clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { ROLES } from "../../config/roles";
import { CLIENT_REGEX, PWD_REGEX } from "../../utils/REGEX";

export default function useNewClientForm() {
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
  return <div></div>;
}
