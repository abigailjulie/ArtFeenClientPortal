import { useEffect } from "react";
import EditClientForm from "./EditClientForm";
import useEditClientForm from "../../hooks/clients/useEditClientForm";
import { useParams } from "react-router-dom";
import {
  useGetClientsQuery,
  selectClientById,
} from "../clients/clientsApiSlice";
import { useSelector } from "react-redux";
import { showToast } from "../../utils/showToast";
import Loader from "../../components/Loader";

export default function EditClient() {
  const { clientId } = useParams();
  const { isLoading, isError, error } = useGetClientsQuery();
  const client = useSelector((state) => selectClientById(state, clientId));

  const { state, validation, clicked } = useEditClientForm({ client });

  useEffect(() => {
    if (isError) {
      showToast.error(error?.data?.message || "Failed to fetch client data.", {
        toastId: "client-data-error",
      });
    }
  }, [isError, error]);

  if (isLoading) return <Loader />;
  if (!client) return <p>Client not found</p>;

  return (
    <div className="mb-5">
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        Edit Client
      </h2>
      <EditClientForm state={state} validation={validation} clicked={clicked} />
    </div>
  );
}
