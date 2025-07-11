import { useEffect } from "react";
import Loader from "../../components/Loader";
import Project from "./Project";
import * as bootstrap from "bootstrap";
import { useProjectList } from "../../hooks/projects/useProjectsList";
import { SORT_OPTIONS } from "../../config/sorting";
import "../../components/projects/TableStyles.css";
import { showToast } from "../../utils/showToast";

export default function ProjectsList() {
  const { sortedIds, isLoading, isSuccess, isError, error, sortBy, setSortBy } =
    useProjectList();

  useEffect(() => {
    if (isError) {
      showToast.error(
        error?.data?.message || "Failed to load projects, try again."
      );
    }
  }, [isError, error]);

  useEffect(() => {
    const popoverTriggerList = document.querySelectorAll(
      '[data-bs-toggle="popover"]'
    );
    const popoverList = [...popoverTriggerList].map(
      (popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl)
    );

    return () => {
      popoverList.forEach((popover) => popover.dispose());
    };
  }, []);

  if (isLoading) return <Loader />;

  if (isError) return null;

  if (isSuccess) {
    const tableContent = sortedIds?.length ? (
      sortedIds.map((projectId) => (
        <Project key={projectId} projectId={projectId} />
      ))
    ) : (
      <tr>
        <td colSpan={6} className="text-center py-4">
          No projects found. Click the "New Project" button in the header above
          to start!
        </td>
      </tr>
    );

    return (
      <div>
        <section className="w-100">
          <table className="w-100 align-items-between table-spaced">
            <thead className="w-100">
              <tr>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Status
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  <button
                    type="button"
                    className="btn btn-link fs-3 text-decoration-none"
                    onClick={() => setSortBy(SORT_OPTIONS.CREATED)}
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-content="Click to sort by creation date"
                    data-bs-placement="top"
                    tabIndex="0"
                    style={{
                      color:
                        sortBy === SORT_OPTIONS.CREATED ? "#0d6efd" : "inherit",
                    }}
                  >
                    Created
                  </button>
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  Updated
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Title
                </th>
                <th
                  className="fs-3 ps-3 pb-3 d-none d-md-table-cell"
                  scope="col"
                >
                  <button
                    type="button"
                    className="btn btn-link p-0 fs-3 text-decoration-none"
                    onClick={() => setSortBy(SORT_OPTIONS.OWNER)}
                    data-bs-toggle="popover"
                    data-bs-trigger="hover focus"
                    data-bs-content="Click to sort by owner"
                    data-bs-placement="top"
                    tabIndex="0"
                    style={{
                      color:
                        sortBy === SORT_OPTIONS.OWNER ? "#0d6efd" : "inherit",
                    }}
                  >
                    Owner
                  </button>
                </th>
                <th className="fs-3 ps-3 pb-3" scope="col">
                  Profile
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
  }
}
