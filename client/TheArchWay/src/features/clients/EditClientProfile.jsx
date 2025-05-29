import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "./clientsApiSlice";
import EditClient from "./EditClient";
import Loader from "../../components/Loader";
import { showToast } from "../../utils/showToast";

export default function EditClientProfile() {
  const { clientId } = useParams();

  const { client, isLoading, isError, error } = useGetClientsQuery(
    "clientsList",
    {
      selectFromResult: ({ data, isLoading, isError, error }) => ({
        client: data?.entities[clientId],
        isLoading,
        isError,
        error,
      }),
    }
  );

  useEffect(() => {
    if (isError) {
      showToast.error(error?.data?.message || "Error loading client");
    }
  }, [isError, error]);

  if (isError) return <p className="errmsg">Error loading client.</p>;

  if (isLoading) return <Loader />;

  if (!client) return <p>Client not found</p>;

  return <EditClient client={client} />;
}
