import React from "react";
import { useGetClientsQuery } from "./clientsApiSlice";
import Spinner from "react-bootstrap/Spinner";
import Client from "./Client";

export default function ClientsList() {
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery();

  if (isLoading) return <Spinner animation="border" />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = clients;

    const tableContent = ids?.length
      ? ids.map((clientId) => <Client key={clientId} clientId={clientId} />)
      : null;

    return (
      <table>
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Roles</th>
            <th scope="col">Edit</th>
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    );
  } else return null;
}
