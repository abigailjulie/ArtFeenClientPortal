import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectClientsById } from "./clientsApiSlice";
import React from "react";

export default function Client({ clientId }) {
  const client = useSelector((state) => selectClientsById(state, clientId));

  const navigate = useNavigate();

  if (client) {
    const handleEdit = () => {
      navigate(`/dash/clients/${clientId}`);
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
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
