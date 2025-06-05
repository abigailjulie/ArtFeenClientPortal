import { Col, Form, Row } from "react-bootstrap";

export default function CompanyInfoSection({
  state,
  clicked,
  validation,
  isEdit,
}) {
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
  const { validStateCode } = validation;

  return (
    <>
      <h3 className="mt-5 text-center">Company Information:</h3>

      <Row>
        <Col className="mb-3">
          <Form.Label htmlFor="companyName" visuallyHidden>
            Company Name:
          </Form.Label>
          <Form.Control
            id="companyName"
            type="text"
            placeholder="Company Name"
            value={companyName}
            onChange={onCompanyNameChanged}
            required
          />
        </Col>
      </Row>

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
        <>
          <Row>
            <Col className="mb-3">
              <Form.Group controlId="companyAddress1">
                <Form.Label visuallyHidden>Address</Form.Label>
                <Form.Control
                  placeholder="Street Address"
                  value={address1}
                  onChange={onAddress1Changed}
                  required
                />
              </Form.Group>
            </Col>
            <Col className="mb-3">
              <Form.Group controlId="companyAddress2">
                <Form.Label visuallyHidden>Address 2</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  value={address2}
                  onChange={onAddress2Changed}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group controlId="companyCity">
                <Form.Label visuallyHidden>City</Form.Label>
                <Form.Control
                  placeholder="City"
                  value={city}
                  onChange={onCityChanged}
                  required
                />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="companyState">
                <Form.Label visuallyHidden>State</Form.Label>
                <Form.Control
                  placeholder="State"
                  value={stateCode}
                  onChange={onStateCodeChanged}
                  isInvalid={stateCode && !validStateCode}
                  required
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="px-2 mt-2"
                  muted
                >
                  Please enter a valid 2-letter U.S. state abbreviation (e.g.,
                  NY).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId="companyZip">
                <Form.Label visuallyHidden>Zip</Form.Label>
                <Form.Control
                  placeholder="Zip Code"
                  value={zip}
                  onChange={onZipChanged}
                  required
                />
              </Form.Group>
            </Col>
          </Row>
        </>
      )}

      <Row className="mb-3">
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
