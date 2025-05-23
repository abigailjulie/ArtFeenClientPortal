import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

export default function ClientForm({ state, handlers, validation, clicked }) {
  const {
    username,
    password,
    roles,
    telephone,
    email,
    companyName,
    companyAddress,
    companyNumber,
    canSave,
    options,
    isError,
    error,
  } = state;

  const {
    setUsername,
    setPassword,
    setRoles,
    setTelephone,
    setEmail,
    setCompanyName,
    setAddress1,
    setAddress2,
    setCity,
    setStateCode,
    setZip,
    setCompanyNumber,
  } = handlers;

  const { validUsername, validPassword } = validation;

  const {
    onUsernameChanged,
    onPasswordChanged,
    onRolesChanged,
    onTelephoneChanged,
    onEmailChanged,
    onCompanyNameChanged,
    onCompanyAddressChanged,
    onCompanyNumberChanged,
    onSaveClientClicked,
  } = clicked;

  return (
    <>
      <Form>
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

        <h2>Company Information:</h2>
        <Row>
          <Col>
            <Form.Label htmlFor="companyName" visuallyHidden>
              Company Name:
            </Form.Label>
            <Form.Control
              id="companyName"
              type="companyName"
              placeholder="Company Name"
              value={state.companyName}
              onChange={clicked.onCompanyNameChanged}
              required
            />
          </Col>
        </Row>

        <Row>
          <Form.Group controlId="companyAddress1">
            <Form.Label visuallyHidden>Address</Form.Label>
            <Form.Control
              placeholder="Street Address"
              value={state.address1}
              onChange={clicked.onAddress1Changed}
              required
            />
          </Form.Group>

          <Form.Group controlId="companyAddress2">
            <Form.Label visuallyHidden>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              value={state.address2}
              onChange={clicked.onAddress2Changed}
            />
          </Form.Group>

          <Row>
            <Form.Group as={Col} controlId="companyCity">
              <Form.Label visuallyHidden>City</Form.Label>
              <Form.Control
                placeholder="City"
                value={state.city}
                onChange={clicked.onCityChanged}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="companyState">
              <Form.Label visuallyHidden>State</Form.Label>
              <Form.Control
                placeholder="State"
                value={state.stateCode}
                onChange={clicked.onStateCodeChanged}
                required
              />
              <Form.Text id="stateHelpBlock" muted>
                Please enter your state as a two-letter abbreviation (e.g., NY)
              </Form.Text>
            </Form.Group>

            <Form.Group as={Col} controlId="companyZip">
              <Form.Label visuallyHidden>Zip</Form.Label>
              <Form.Control
                placeholder="Zip Code"
                value={state.zip}
                onChange={clicked.onZipChanged}
                required
              />
            </Form.Group>
          </Row>
        </Row>

        <Row>
          <Col>
            <Form.Label htmlFor="companyNumber" visuallyHidden>
              Company Number:
            </Form.Label>
            <Form.Control
              id="companyNumber"
              type="companyNumber"
              placeholder="Company Number"
              value={state.companyNumber}
              onChange={clicked.onCompanyNumberChanged}
              required
            />
          </Col>
        </Row>

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
