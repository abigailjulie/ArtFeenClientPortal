import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useGetClientsQuery } from "./clientsApiSlice";
import { memo } from "react";

const Client = memo(function Client({ clientId }) {
  const { client } = useGetClientsQuery("clientsList", {
    selectFromResult: ({ data }) => ({
      client: data?.entities[clientId],
    }),
  });

  const navigate = useNavigate();

  if (client) {
    const handleEdit = () => {
      navigate(`/dash/clients/${clientId}/edit`);
    };

    const clientRoleString = client.roles.toString().replaceAll(",", ", ");

    const rowStatus = client.active ? "" : "opacity-50";

    return (
      <tr className={`bg-body-tertiary shadow mb-3 ${rowStatus}`}>
        <td className="p-3">
          <span>{client.username}</span>
        </td>
        <td className="p-3">
          <span>{clientRoleString}</span>
        </td>
        <td className="p-3 d-flex justify-content-center">
          <button className="btn btn-sm" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
});

export default Client;
