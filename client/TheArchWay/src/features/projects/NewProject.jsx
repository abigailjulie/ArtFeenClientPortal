import { useParams } from "react-router-dom";
import { useGetClientsQuery } from "../clients/clientsApiSlice";
import useTitle from "../../hooks/useTitle";
import Loader from "../../components/Loader";
import NewProjectForm from "./NewProjectForm";

export default function NewProject() {
  useTitle("The ArchWay | New Projects");

  const { clientId } = useParams();
  const { client } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      client: data?.entities[clientId],
    }),
  });

  if (!client) return <Loader />;

  return (
    <>
      <h2 className="text-center" style={{ fontSize: "var(--ft-Exlarge)" }}>
        New Project
      </h2>
      <NewProjectForm clientId={client.id} />
    </>
  );
}
