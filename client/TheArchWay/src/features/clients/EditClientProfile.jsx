import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "./clientsApiSlice";
import EditClient from "./EditClient";
import useTitle from "../../hooks/useTitle";
import Loader from "../../components/Loader";

export default function EditClientProfile() {
  useTitle("The ArchWay | Edit Profile");

  const { clientId } = useParams();

  const { client, isLoading, isError } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data, isLoading, isError, error }) => ({
      client: data?.entities[clientId],
      isLoading,
      isError,
      error,
    }),
  });

  if (isError) return <p>Error loading client.</p>;

  if (isLoading) return <Loader />;

  if (!client) return <p>Client not found</p>;

  return <EditClient client={client} />;
}
