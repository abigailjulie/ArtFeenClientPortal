import { useEffect } from "react";
import Loader from "../../components/Loader";
import Project from "./Project";
import * as bootstrap from "bootstrap";
import { useProjectList } from "../../hooks/projects/useProjectsList";
import { SORT_OPTIONS } from "../../config/sorting";
import "../../components/projects/TableStyles.css";
import { showToast } from "../../utils/showToast";
import DynButton from "../../components/DynButton";

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
                  <DynButton
                    className="p-1 px-2 fs-4"
                    title="Click to sort by creation date"
                    onClick={() => setSortBy(SORT_OPTIONS.CREATED)}
                    variant={
                      sortBy === SORT_OPTIONS.CREATED
                        ? "forest"
                        : "outline-forest"
                    }
                    show={true}
                  >
                    Created
                  </DynButton>
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
                  <DynButton
                    className="p-1 px-2 fs-4"
                    onClick={() => setSortBy(SORT_OPTIONS.OWNER)}
                    title="Click to sort by owner"
                    variant={
                      sortBy === SORT_OPTIONS.OWNER
                        ? "forest"
                        : "outline-forest"
                    }
                    show={true}
                  >
                    Owner
                  </DynButton>
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
