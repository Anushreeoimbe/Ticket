import {
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

function Toast({
  message,
  type = "success",
  onClose,
}) {
  if (!message) {
    return null;
  }

  return (
    <div className={`toast toast-${type}`}>

      <div className="toast-icon">
        {type === "success" ? (
          <CheckCircle2 size={19} />
        ) : (
          <AlertCircle size={19} />
        )}
      </div>

      <span>{message}</span>

      <button
        className="toast-close"
        onClick={onClose}
        aria-label="Close notification"
      >
        <X size={15} />
      </button>

    </div>
  );
}

export default Toast;