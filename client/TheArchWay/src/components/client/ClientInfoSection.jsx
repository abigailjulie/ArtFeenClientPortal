import { Col, Form, Row } from "react-bootstrap";

export default function ClientInfoSection({ state, validation, clicked }) {
  const { username, password, telephone, email } = state;
  const {
    onUsernameChanged,
    onPasswordChanged,
    onTelephoneChanged,
    onEmailChanged,
  } = clicked;
  const { validUsername, validPassword, validEmail, validTelephone } =
    validation;

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
            isInvalid={username && !validUsername}
            required
          />
          <Form.Control.Feedback type="invalid" className="px-2 mt-2" muted>
            Username must be 3-20 characters, and contain only letters, numbers,
            ".", or "-".
          </Form.Control.Feedback>
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
            isInvalid={password && !validPassword}
            required
          />
          <Form.Control.Feedback type="invalid" className="px-2 mt-2" muted>
            Password must be 4-12 characters and include letters, numbers, and
            !@#$%.
          </Form.Control.Feedback>
        </Col>
      </Row>

      <Row className="mb-3">
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
            isInvalid={telephone && !validTelephone}
            required
          />
          <Form.Control.Feedback type="invalid" className="px-2 mt-2" muted>
            Enter a valid phone number in the format 123-456-7890.
          </Form.Control.Feedback>
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
            isInvalid={email && !validEmail}
            required
          />
          <Form.Control.Feedback type="invalid" className="px-2 mt-2" muted>
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Col>
      </Row>
    </>
  );
}
