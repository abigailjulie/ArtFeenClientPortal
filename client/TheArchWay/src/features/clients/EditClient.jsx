import EditClientForm from "../../components/client/EditClientForm";
import useEditClientForm from "../../hooks/clients/useEditClientForm";
import { useParams } from "react-router-dom";
import {
  useGetClientsQuery,
  selectClientById,
} from "../clients/clientsApiSlice";
import { useSelector } from "react-redux";

export default function EditClient() {
  const { clientId } = useParams();
  const { isLoading, isError, error } = useGetClientsQuery();
  const client = useSelector((state) => selectClientById(state, clientId));

  const { state, validation, clicked } = useEditClientForm({ client });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p className="errmsg">{error?.data?.message}</p>;
  if (!client) return <p>Client not found</p>;

  return (
    <div className="mb-5">
      {state?.errorMessage && (
        <p className="text-danger">{state.errorMessage}</p>
      )}

      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        Edit Client
      </h2>
      <EditClientForm state={state} validation={validation} clicked={clicked} />
    </div>
  );
}
