import { Toast, ToastContainer } from "react-bootstrap";

function Notification({ show, message, onClose }) {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast show={show} onClose={onClose} delay={2500} autohide bg="success">
        <Toast.Body style={{ color: "white" }}>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Notification;