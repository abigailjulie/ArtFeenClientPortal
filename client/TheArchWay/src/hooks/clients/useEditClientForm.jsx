import { useState, useEffect } from "react";
import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "../../features/clients/clientsApiSlice";
import { useNavigate } from "react-router-dom";
import { CLIENT_REGEX, PWD_REGEX } from "../../utils/regex";
import useAuth from "../../hooks/useAuth";

export default function useEditClientForm({ client }) {
  const [updateClient, updateState] = useUpdateClientMutation();

  const [deleteClient, deleteState] = useDeleteClientMutation();

  const { isFounder } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState(client?.username);
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(client?.roles);
  const [active, setActive] = useState(client?.active);
  const [email, setEmail] = useState(client?.email);
  const [telephone, setTelephone] = useState(client?.telephone);
  const [companyName, setCompanyName] = useState(client?.company.name);
  const [companyAddress, setCompanyAddress] = useState(client?.company.address);
  const [companyNumber, setCompanyNumber] = useState(client?.company.telephone);

  const { isLoading: isUpdateLoading } = updateState;
  const { isLoading: isDeleteLoading } = deleteState;
  const isLoading = isUpdateLoading || isDeleteLoading;

  const { isSuccess } = updateState;
  const { isSuccess: isDelSuccess } = deleteState;

  if (!client) {
    return {
      state: {
        username: "",
        password: "",
        roles: [],
        active: false,
        telephone: "",
        email: "",
        companyName: "",
        companyAddress: "",
        companyNumber: "",
        updateState,
        deleteState,
        isFounder,
        canSave: false,
      },
      clicked: {
        onUsernameChanged: () => {},
        onPasswordChanged: () => {},
        onRolesChanged: () => {},
        onActiveChanged: () => {},
        onEmailChanged: () => {},
        onTelephoneChanged: () => {},
        onCompanyNameChanged: () => {},
        onCompanyAddressChanged: () => {},
        onCompanyNumberChanged: () => {},
        onSaveClientClicked: () => {},
        onDeleteClientClicked: () => {},
      },
      validation: {
        validUsername: false,
        validPassword: false,
      },
    };
  }

  const company = {
    name: companyName,
    address: companyAddress,
    telephone: companyNumber,
  };

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

  const onEmailChanged = (e) => {
    setEmail(e.target.value);
  };

  const onTelephoneChanged = (e) => {
    setTelephone(e.target.value);
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

  const onSaveClientClicked = async (e) => {
    e.preventDefault();
    if (password) {
      await updateClient({
        id: client.id,
        username,
        password,
        roles,
        active,
        email,
        telephone,
        company,
      });
    } else {
      await updateClient({
        id: client.id,
        username,
        roles,
        active,
        email,
        telephone,
        company,
      });
    }
  };

  const onDeleteClientClicked = async () => {
    await deleteClient({ id: client.id });
  };

  let canSave;
  if (password) {
    canSave =
      [roles, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles, validUsername].every(Boolean) && !isLoading;
  }

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

  return {
    state: {
      username,
      password,
      roles,
      active,
      telephone,
      email,
      companyName,
      companyAddress,
      companyNumber,
      updateState,
      deleteState,
      isFounder,
      canSave,
    },
    clicked: {
      onUsernameChanged,
      onPasswordChanged,
      onRolesChanged,
      onActiveChanged,
      onEmailChanged,
      onTelephoneChanged,
      onCompanyNameChanged,
      onCompanyAddressChanged,
      onCompanyNumberChanged,
      onSaveClientClicked,
      onDeleteClientClicked,
    },
    validation: { validUsername, validPassword },
  };
}
