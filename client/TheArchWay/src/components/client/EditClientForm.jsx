import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row, Button } from "react-bootstrap";
import { ROLES } from "../../config/roles";

export default function EditClientForm({ state, validation, clicked }) {
  const {
    username,
    password,
    roles,
    active,
    telephone,
    email,
    companyName,
    companyAddress,
    companyNumber,
    updateState,
    deleteState,
    isFounder,
    canSave,
  } = state;
  const {
    onUsernameChanged,
    onPasswordChanged,
    onRolesChanged,
    onActiveChanged,
    onEmailChanged,
    onTelephoneChanged,
    onCompanyNameChanged,
    onCompanyAddressChanged,
    onCompanyNumberChanged,
    onSaveClientClicked,
    onDeleteClientClicked,
  } = clicked;
  const { validUsername, validPassword } = validation;

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
        <Row>
          <Col className="mb-3 mb-md-0">
            <Form.Label htmlFor="username" visuallyHidden>
              Username
            </Form.Label>
            <Form.Control
              type="text"
              id="username"
              value={state.username}
              placeholder="Username"
              onChange={clicked.onUsernameChanged}
              autoComplete="off"
              required
            />
            <Form.Text id="usernameHelpBlock" muted>
              Your username must be 3-20 characters long, contain letters,
              numbers, special characters .- and must not contain spaces, or
              emojis.
            </Form.Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="password" visuallyHidden>
              Password
            </Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
              value={state.password}
              onChange={clicked.onPasswordChanged}
              required
            />
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 4-12 characters long, contain letters,
              numbers, special characters !@#$% and must not contain spaces, or
              emojis.
            </Form.Text>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="telephone" visuallyHidden>
              Telephone
            </Form.Label>
            <Form.Control
              id="telephone"
              type="text"
              placeholder="Telephone"
              value={state.telephone}
              onChange={clicked.onTelephoneChanged}
              required
            />
          </Col>

          <Col>
            <Form.Label htmlFor="email" visuallyHidden>
              Email
            </Form.Label>
            <Form.Control
              id="email"
              type="email"
              placeholder="Email"
              value={state.email}
              onChange={clicked.onEmailChanged}
              required
            />
          </Col>
        </Row>

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

        <h2>Company Information:</h2>
        <Row>
          <Col>
            <Form.Label htmlFor="companyName" visuallyHidden>
              Company Name:
            </Form.Label>
            <Form.Control
              id="companyName"
              type="text"
              placeholder="Company Name"
              value={state.companyName}
              onChange={clicked.onCompanyNameChanged}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="companyAddress" visuallyHidden>
              Company Address:
            </Form.Label>
            <Form.Control
              id="companyAddress"
              type="text"
              placeholder="Company Address"
              value={state.companyAddress}
              onChange={clicked.onCompanyAddressChanged}
              required
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="companyNumber" visuallyHidden>
              Company Number:
            </Form.Label>
            <Form.Control
              id="companyNumber"
              type="text"
              placeholder="Company Number"
              value={state.companyNumber}
              onChange={clicked.onCompanyNumberChanged}
              required
            />
          </Col>
        </Row>

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
          className="btn"
          title="Save"
          type="button"
          onClick={clicked.onSaveClientClicked}
          disabled={!state.canSave}
        >
          <FontAwesomeIcon icon={faSave} />
        </Button>
      </Form>
    </>
  );
}
