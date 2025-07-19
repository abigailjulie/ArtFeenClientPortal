import { useGetClientsQuery } from "./clientsApiSlice";
import Loader from "../../components/Loader";
import Client from "./Client";
import useTitle from "../../hooks/useTitle";
import "../../components/projects/TableStyles.css";

export default function ClientsList() {
  useTitle("The ArchWay | Clients");
  const {
    data: clients,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetClientsQuery("clientsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <Loader />;

  if (isError) return <p className="errmsg">{error?.data?.message}</p>;

  if (isSuccess) {
    const { ids } = clients;

    const tableContent =
      ids?.length &&
      ids.map((clientId) => <Client key={clientId} clientId={clientId} />);

    return (
      <div className="px-3 px-md-5">
        <section className="w-100 py-2">
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
