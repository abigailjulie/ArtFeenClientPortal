import { Modal, Button } from "react-bootstrap";

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
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
