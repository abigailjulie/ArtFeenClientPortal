import { useState } from "react";
import { useAddNewProjectMutation } from "./projectsApiSlice";
import { useNavigate } from "react-router-dom";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { Col, Form, Row } from "react-bootstrap";
import { showToast } from "../../utils/showToast";
import Loader from "../../components/Loader";
import DynButton from "../../components/DynButton";

export default function NewProjectForm({ clientId }) {
  const [addNewProject, { isLoading, isSuccess, isError, error }] =
    useAddNewProjectMutation();

  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectAddress, setProjectAddress] = useState("");
  const [projectTelephone, setProjectTelephone] = useState("");

  const number = `TAW-${Date.now()}`;

  const onNameChanged = (e) => {
    setProjectName(e.target.value);
  };
  const onAddressChanged = (e) => {
    setProjectAddress(e.target.value);
  };
  const onTelephoneChanged = (e) => {
    setProjectTelephone(e.target.value);
  };

  const onSaveProjectClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      try {
        const result = await addNewProject({
          name: projectName,
          address: projectAddress,
          telephone: projectTelephone,
          client: clientId,
          number,
        }).unwrap();

        showToast.success(
          result?.message || `${projectName} added successfully!`
        );

        setTimeout(() => {
          navigate(`/dash/clients/${clientId}/projects`);
        }, 500);
      } catch (error) {
        showToast.error(error?.data?.message || "Please check the input.");
      }
    }
  };

  if (isLoading) return <Loader />;

  const canSave =
    [clientId, projectName, projectAddress, projectTelephone].every(Boolean) &&
    !isLoading;

  return (
    <div className="container-md">
      <form onSubmit={(e) => e.preventDefault()}>
        <Row>
          <Col className="mb-3">
            <Form.Label htmlFor="projectName">Project Name</Form.Label>
            <Form.Control
              type="text"
              name="projectName"
              id="projectName"
              autoComplete="off"
              placeholder=""
              value={projectName}
              onChange={onNameChanged}
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <Form.Label htmlFor="projectAddress">Project Address</Form.Label>
            <Form.Control
              type="text"
              name="projectAddress"
              id="projectAddress"
              value={projectAddress}
              onChange={onAddressChanged}
            />
          </Col>
        </Row>

        <Row>
          <Col className="mb-3">
            <Form.Label htmlFor="projectTelephone">
              Project Telephone
            </Form.Label>
            <Form.Control
              type="text"
              name="projectTelephone"
              id="projectTelephone"
              value={projectTelephone}
              onChange={onTelephoneChanged}
            />
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-3">
          <DynButton
            title="Save Project"
            icon={faSave}
            onClick={onSaveProjectClicked}
            disabled={!canSave}
            show={true}
          />
        </div>
      </form>
    </div>
  );
}
