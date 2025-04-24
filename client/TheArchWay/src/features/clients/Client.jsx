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

    const cellStatus = client.active ? "" : "disable";

    return (
      <tr>
        <td className={cellStatus}>{client.username}</td>
        <td className={cellStatus}>{clientRoleString}</td>
        <td className={cellStatus}>
          <button onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  } else return null;
}
