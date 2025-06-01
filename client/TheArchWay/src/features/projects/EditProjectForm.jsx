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
      <button className="btn" title="Delete" onClick={onDeleteProjectClicked}>
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    );
  }

  return (
    <>
      <Form onSubmit={onSaveProjectClicked}>
        <h3>Project Info</h3>

        <ProjectInfoSection state={state} clicked={clicked} />

        <h3>Project Status</h3>

        <ProjectStatusSection
          state={state}
          clicked={clicked}
          clients={clients}
        />

        <div>
          <p>Created: {created}</p>
          <p>Updated: {updated}</p>
        </div>

        <div>
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
    </>
  );
}
