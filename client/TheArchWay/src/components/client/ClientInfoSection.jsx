import { Col, Form, Row } from "react-bootstrap";

export default function ClientInfoSection({ state, validation, clicked }) {
  const { username, password, telephone, email } = state;
  const {
    onUsernameChanged,
    onPasswordChanged,
    onTelephoneChanged,
    onEmailChanged,
  } = clicked;
  const { validUsername, validPassword } = validation;

  return (
    <>
      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="username" visuallyHidden>
            Username
          </Form.Label>
          <Form.Control
            type="text"
            id="username"
            value={username}
            placeholder="Username"
            onChange={onUsernameChanged}
            autoComplete="off"
            required
          />
          <Form.Text id="usernameHelpBlock" className="px-2" muted>
            Your username must be 3-20 characters long, contain letters,
            numbers, special characters .- and must not contain spaces, or
            emojis.
          </Form.Text>
        </Col>
      </Row>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="password" visuallyHidden>
            Password
          </Form.Label>
          <Form.Control
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={onPasswordChanged}
            required
          />
          <Form.Text id="passwordHelpBlock" className="px-2" muted>
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
            value={telephone}
            onChange={onTelephoneChanged}
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
            value={email}
            onChange={onEmailChanged}
            required
          />
        </Col>
      </Row>
    </>
  );
}
