import CompanyInfoSection from "../../components/client/CompanyInfoSection";
import ClientInfoSection from "../../components/client/ClientInfoSection";
import DynButton from "../../components/DynButton";
import useAuth from "../../hooks/useAuth";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row } from "react-bootstrap";

export default function NewClientForm({ state, validation, clicked }) {
  const { roles, canSave, options, isLoading } = state;
  const { onRolesChanged, onSaveClientClicked } = clicked;

  const { isFounder } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

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
          <DynButton
            icon={faSave}
            title="Save Client"
            onClick={onSaveClientClicked}
            disabled={!canSave}
            show={true}
          />
        </div>
      </Form>
    </>
  );
}
