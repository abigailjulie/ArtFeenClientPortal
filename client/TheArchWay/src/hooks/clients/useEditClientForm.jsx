import { useState, useEffect } from "react";
import {
  useUpdateClientMutation,
  useDeleteClientMutation,
} from "../../features/clients/clientsApiSlice";
import { useNavigate } from "react-router-dom";
import {
  CLIENT_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  PWD_REGEX,
} from "../../utils/regex";
import useAuth from "../../hooks/useAuth";
import { showToast } from "../../utils/showToast";

export default function useEditClientForm({ client }) {
  const [updateClient, updateState] = useUpdateClientMutation();
  const [deleteClient, deleteState] = useDeleteClientMutation();

  const { isFounder } = useAuth();

  const navigate = useNavigate();

  const [username, setUsername] = useState(client?.username || "");
  const [validUsername, setValidUsername] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [roles, setRoles] = useState(client?.roles || []);
  const [active, setActive] = useState(client?.active || false);
  const [email, setEmail] = useState(client?.email || "");
  const [validEmail, setValidEmail] = useState(false);
  const [telephone, setTelephone] = useState(client?.telephone || "");
  const [validTelephone, setValidTelephone] = useState(false);
  const [companyName, setCompanyName] = useState(client?.company.name || "");
  const [companyAddress, setCompanyAddress] = useState(
    client?.company.address || ""
  );
  const [companyNumber, setCompanyNumber] = useState(
    client?.company.telephone || ""
  );
  const [validCompanyNumber, setValidCompanyNumber] = useState(false);

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

    const updateData = {
      id: client.id,
      username,
      roles,
      active,
      email,
      telephone,
      company,
    };

    if (password) {
      updateData.password = password;
    }

    try {
      const result = await updateClient(updateData).unwrap();

      showToast.success(result?.message || `${username} updated successfully!`);
    } catch (error) {
      showToast.error(
        error?.data?.message || "Update failed. Please check the input."
      );
    }
  };

  const onDeleteClientClicked = async () => {
    try {
      const result = await deleteClient({ id: client.id }).unwrap();
      showToast.success(result?.message || `${username} deleted successfully!`);
    } catch (error) {
      showToast.error(
        error?.data?.message || "Delete failed. Please check the input."
      );
    }
  };

  let canSave;
  if (password) {
    canSave =
      [roles, validUsername, validEmail, validTelephone, validPassword].every(
        Boolean
      ) &&
      !updateState.isLoading &&
      !deleteState.isLoading;
  } else {
    canSave =
      [roles, validUsername].every(Boolean) &&
      !updateState.isLoading &&
      !deleteState.isLoading;
  }

  useEffect(() => {
    setValidUsername(CLIENT_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidTelephone(PHONE_REGEX.test(telephone));
  }, [telephone]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidCompanyNumber(PHONE_REGEX.test(companyNumber));
  }, [companyNumber]);

  useEffect(() => {
    if (updateState.isError) {
      const message =
        updateState.error?.data?.message || "Failed to update client.";
      showToast.error(message);
    }
  }, [updateState.isError, updateState.error]);

  useEffect(() => {
    if (updateState.isSuccess || deleteState.isSuccess) {
      navigate("/dash/clients");
    }
  }, [updateState.isSuccess, deleteState.isSuccess, navigate]);

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
      isFounder,
      canSave,
      isLoading: updateState.isLoading || deleteState.isLoading,
      isUpdateLoading: updateState.isLoading,
      isDeleteLoading: deleteState.isLoading,
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
    validation: {
      validUsername,
      validPassword,
      validTelephone,
      validEmail,
      validCompanyNumber,
    },
  };
}
