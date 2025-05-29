import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ROLES } from "../../config/roles";
import ClientInfoSection from "./ClientInfoSection";
import CompanyInfoSection from "./CompanyInfoSection";

export default function EditClientForm({ state, validation, clicked }) {
  const { roles, active, isFounder, canSave } = state;
  const {
    onRolesChanged,
    onActiveChanged,
    onSaveClientClicked,
    onDeleteClientClicked,
  } = clicked;

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <ClientInfoSection
          state={state}
          clicked={clicked}
          validation={validation}
        />

        {isFounder && (
          <Row>
            <Col>
              <Form.Select
                multiple
                id="roles"
                name="roles"
                aria-label="Select role(s)"
                value={roles?.length ? roles : []}
                onChange={onRolesChanged}
              >
                {options?.length ? options : <option value="">No roles</option>}
              </Form.Select>
            </Col>

            <Col>
              <Form.Check
                type="checkbox"
                id="clientActive"
                label="Active"
                checked={active}
                onChange={onActiveChanged}
              />
            </Col>
          </Row>
        )}

        <CompanyInfoSection state={state} clicked={clicked} isEdit={true} />

        <div className="d-flex justify-content-center gap-2 mt-3">
          {isFounder && (
            <Button
              className="btn"
              title="Delete"
              type="button"
              onClick={clicked.onDeleteClientClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </Button>
          )}

          <Button
            title="Save"
            type="button"
            onClick={clicked.onSaveClientClicked}
            disabled={!state.canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </div>
      </Form>
    </>
  );
}
