import React from "react";
import { useGetClientsQuery } from "./clientsApiSlice";
import Spinner from "react-bootstrap/Spinner";
import Client from "./Client";
import "../../components/TableStyles.css";

export default function ClientsList() {
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Spinner animation="border" />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = clients;

    const tableContent = ids?.length
      ? ids.map((clientId) => <Client key={clientId} clientId={clientId} />)
      : null;

    return (
      <div className="mx-5">
        <section className="w-100 px-4 py-2">
          <table className="w-100 align-items-between table-spaced">
            <thead className="w-100">
              <tr>
                <th className="fs-3 ps-3 pb-3 w-33" scope="col">
                  Username
                </th>
                <th className="fs-3 ps-3 pb-3 w-33" scope="col">
                  Roles
                </th>
                <th className="fs-3 ps-3 pb-3 w-5" scope="col">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </section>
      </div>
    );
  } else return null;
}
