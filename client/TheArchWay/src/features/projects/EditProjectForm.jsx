import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form } from "react-bootstrap";
import ProjectInfoSection from "../../components/projects/ProjectInfoSection";
import ProjectStatusSection from "../../components/projects/ProjectStatusSection";
import DynButton from "../../components/DynButton";

export default function EditProjectForm({
  state,
  actions,
  clients,
  clicked,
  fields,
}) {
  const { isLoading, created, updated, isAdmin, isFounder, canSave, hasDraft } =
    state;
  const { onSaveProjectClicked, onDeleteProjectClicked } = actions;

  let deleteBtn = null;
  deleteBtn = (
    <DynButton
      icon={faTrashCan}
      className="btn ms-2"
      title="Delete Project"
      variant="charcoal"
      onClick={onDeleteProjectClicked}
      show={isAdmin || isFounder}
    />
  );

  return (
    <div className="container-md">
      <Form onSubmit={onSaveProjectClicked}>
        {hasDraft && (
          <div className="alert alert-warning mb-3">
            <small>You have unsaved changes</small>
          </div>
        )}
        <h3>Project Info</h3>

        <ProjectInfoSection state={state} actions={actions} />

        <h3>Project Status</h3>

        <ProjectStatusSection
          state={state}
          actions={actions}
          clients={clients}
          clicked={clicked}
          fields={fields}
        />

        <div className="text-center mt-5">
          <p className="mb-0">Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>

        <div className="text-center">
          <DynButton
            type="submit"
            icon={faSave}
            title="Save Project"
            disabled={!canSave}
            show={true}
          />
          {deleteBtn}
        </div>
      </Form>
    </div>
  );
}
