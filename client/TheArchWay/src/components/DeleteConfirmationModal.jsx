import { Modal } from "react-bootstrap";
import DynButton from "./DynButton";

export default function DeleteConfirmationModal({
  show,
  handleClose,
  handleConfirm,
  title = "Confirm Deletion",
  message = "Are you sure you want to delete this item?",
}) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <DynButton show={true} title="Cancel editing" onClick={handleClose}>
          Cancel
        </DynButton>
        <DynButton
          show={true}
          variant="charcoal"
          title="Delete Project"
          onClick={handleConfirm}
        >
          Delete
        </DynButton>
      </Modal.Footer>
    </Modal>
  );
}
