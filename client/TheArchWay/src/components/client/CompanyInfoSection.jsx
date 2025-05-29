import { Col, Form, Row } from "react-bootstrap";

export default function CompanyInfoSection({ state, clicked, isEdit }) {
  const {
    companyName,
    companyAddress,
    companyNumber,
    address1,
    address2,
    city,
    stateCode,
    zip,
  } = state;
  const {
    onCompanyNameChanged,
    onCompanyAddressChanged,
    onCompanyNumberChanged,
    onAddress1Changed,
    onAddress2Changed,
    onCityChanged,
    onStateCodeChanged,
    onZipChanged,
  } = clicked;

  return (
    <>
      <h3 className="mt-5 text-center">Company Information:</h3>

      {isEdit ? (
        <Row>
          <Col className="mb-3">
            <Form.Label htmlFor="companyAddress" visuallyHidden>
              Company Address:
            </Form.Label>
            <Form.Control
              id="companyAddress"
              type="text"
              placeholder="Company Address"
              value={companyAddress}
              onChange={onCompanyAddressChanged}
              required
            />
          </Col>
        </Row>
      ) : (
        <Row>
          <Form.Group controlId="companyAddress1">
            <Form.Label visuallyHidden>Address</Form.Label>
            <Form.Control
              placeholder="Street Address"
              value={address1}
              onChange={onAddress1Changed}
              required
            />
          </Form.Group>
          <Form.Group controlId="companyAddress2">
            <Form.Label visuallyHidden>Address 2</Form.Label>
            <Form.Control
              placeholder="Apartment, studio, or floor"
              value={address2}
              onChange={onAddress2Changed}
            />
          </Form.Group>
          <Row>
            <Form.Group as={Col} controlId="companyCity">
              <Form.Label visuallyHidden>City</Form.Label>
              <Form.Control
                placeholder="City"
                value={city}
                onChange={onCityChanged}
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="companyState">
              <Form.Label visuallyHidden>State</Form.Label>
              <Form.Control
                placeholder="State"
                value={stateCode}
                onChange={onStateCodeChanged}
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
                value={zip}
                onChange={onZipChanged}
                required
              />
            </Form.Group>
          </Row>
        </Row>
      )}

      <Row>
        <Col>
          <Form.Label htmlFor="companyNumber" visuallyHidden>
            Company Number:
          </Form.Label>
          <Form.Control
            id="companyNumber"
            type="text"
            placeholder="Company Number"
            value={companyNumber}
            onChange={onCompanyNumberChanged}
            required
          />
        </Col>
      </Row>
    </>
  );
}
