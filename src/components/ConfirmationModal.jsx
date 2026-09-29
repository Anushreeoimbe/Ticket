import { AlertTriangle, X } from "lucide-react";

function ConfirmationModal({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="confirmation-modal">

        <button
          className="modal-close"
          onClick={onCancel}
          aria-label="Close"
        >
          <X size={18} />
        </button>

        <div className="confirmation-icon">
          <AlertTriangle size={25} />
        </div>

        <h3>{title}</h3>

        <p>{message}</p>

        <div className="confirmation-actions">

          <button
            className="modal-cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="modal-confirm-btn"
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>
    </div>
  );
}

export default ConfirmationModal;