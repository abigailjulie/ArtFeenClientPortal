import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form, Button } from "react-bootstrap";
import ProjectInfoSection from "../../components/projects/ProjectInfoSection";
import ProjectStatusSection from "../../components/projects/ProjectStatusSection";

export default function EditProjectForm({ state, clicked, clients }) {
  const { isLoading, created, updated, isAdmin, isFounder, canSave } = state;

  const { onSaveProjectClicked, onDeleteProjectClicked } = clicked;

  let deleteBtn = null;
  if (isAdmin || isFounder) {
    deleteBtn = (
      <Button
        className="btn ms-2"
        title="Delete"
        onClick={onDeleteProjectClicked}
      >
        <FontAwesomeIcon icon={faTrashCan} />
      </Button>
    );
  }

  return (
    <div className="container-md">
      <Form onSubmit={onSaveProjectClicked}>
        <h3>Project Info</h3>

        <ProjectInfoSection state={state} clicked={clicked} />

        <h3>Project Status</h3>

        <ProjectStatusSection
          state={state}
          clicked={clicked}
          clients={clients}
        />

        <div className="text-center mt-5">
          <p className="mb-0">Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>

        <div className="text-center">
          <Button
            className="btn"
            title="Save"
            onClick={onSaveProjectClicked}
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>

          {deleteBtn}
        </div>
      </Form>
    </div>
  );
}
