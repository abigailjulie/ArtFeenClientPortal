import CompanyInfoSection from "../../components/client/CompanyInfoSection";
import ClientInfoSection from "../../components/client/ClientInfoSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row, Button } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";

export default function NewClientForm({ state, validation, clicked }) {
  const { roles, canSave, options } = state;
  const { onRolesChanged, onSaveClientClicked } = clicked;

  const { isFounder } = useAuth();

  return (
    <>
      <Form onSubmit={(e) => e.preventDefault()}>
        <ClientInfoSection
          state={state}
          validation={validation}
          clicked={clicked}
        />

        {isFounder && (
          <Row>
            <Col>
              <Form.Select
                multiple
                aria-label="Select role(s)"
                value={roles?.length ? roles : []}
                onChange={onRolesChanged}
              >
                {options?.length ? options : <option value="">No roles</option>}
              </Form.Select>
            </Col>
          </Row>
        )}

        <CompanyInfoSection
          state={state}
          clicked={clicked}
          validation={validation}
          isEdit={false}
        />

        <div className="d-flex justify-content-center mt-3">
          <Button
            className="btn"
            title="Save"
            type="button"
            onClick={onSaveClientClicked}
            disabled={!canSave}
          >
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </div>
      </Form>
    </>
  );
}
