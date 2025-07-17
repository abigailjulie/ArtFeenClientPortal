import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Col, Form } from "react-bootstrap";
import { ROLES } from "../../config/roles";
import ClientInfoSection from "../../components/client/ClientInfoSection";
import CompanyInfoSection from "../../components/client/CompanyInfoSection";
import DynButton from "../../components/DynButton";

export default function EditClientForm({ state, validation, clicked }) {
  const {
    roles,
    active,
    isFounder,
    isAdmin,
    canSave,
    isUpdateLoading,
    isDeleteLoading,
    isLoading,
  } = state;
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
    <div className="container-md">
      <Form onSubmit={(e) => e.preventDefault()}>
        <ClientInfoSection
          state={state}
          clicked={clicked}
          validation={validation}
        />

        {isFounder && (
          <div className="mt-3 d-flex flex-column justify-content-center align-items-center">
            <Col style={{ minWidth: "20rem" }}>
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

            <div className="mt-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  id="clientActive"
                  label="Active"
                  checked={active}
                  onChange={onActiveChanged}
                />
              </Col>
            </div>
          </div>
        )}

        <CompanyInfoSection
          state={state}
          clicked={clicked}
          validation={validation}
          isEdit={true}
        />

        <div className="d-flex justify-content-center gap-2 mt-3">
          <DynButton
            icon={faTrashCan}
            variant="charcoal"
            title="Delete Client"
            show={isAdmin || isFounder}
            onClick={onDeleteClientClicked}
            disabled={isLoading}
            loading={isDeleteLoading}
          />

          <DynButton
            icon={faSave}
            title="Save Client"
            onClick={onSaveClientClicked}
            disabled={!canSave}
            loading={isUpdateLoading}
            show={true}
          />
        </div>
      </Form>
    </div>
  );
}
