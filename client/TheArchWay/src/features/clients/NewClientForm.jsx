import React from "react";
import ClientForm from "../../components/client/ClientForm";
import useNewClientForm from "../../hooks/clients/useNewClientForm";

export default function NewClientForm() {
  const { state, handlers, validation, clicked } = useNewClientForm();

  return (
    <div className="h-100 d-flex flex-column justify-content-center align-items-center">
      <h1>New Client Information</h1>
      <ClientForm
        state={state}
        handlers={handlers}
        validation={validation}
        clicked={clicked}
      />
      {/* <p className={errClass}>{error?.data?.message}</p> */}
    </div>
  );
}
