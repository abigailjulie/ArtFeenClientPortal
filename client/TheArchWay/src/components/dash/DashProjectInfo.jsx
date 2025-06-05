import { formatToday } from "../../utils/dateUtils";

export default function DashProjectInfo({
  selectedProject,
  clientsProjects,
  selectedProjectId,
  setSelectedProjectId,
}) {
  const today = formatToday();
  return (
    <>
      {clientsProjects?.length > 1 && (
        <select
          className="form-select mt-2 mb-2"
          value={selectedProjectId || ""}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          style={{ maxWidth: "300px" }}
        >
          {clientsProjects.map((project) => (
            <option key={project._id} value={project._id}>
              {project.name}
            </option>
          ))}
        </select>
      )}

      {selectedProject ? (
        <>
          <p className="mb-0">Phase: {selectedProject.phase.name}</p>
          <p className="mb-0">Status: {selectedProject.status}</p>
          <p className="ft-large fw-bold mb-0 line-height-min">
            ${selectedProject.finances.budget.toLocaleString()}
          </p>
          <p>Outstanding balance as of {today}</p>
        </>
      ) : (
        <p className="text-muted mt-2">No project information available</p>
      )}
    </>
  );
}
