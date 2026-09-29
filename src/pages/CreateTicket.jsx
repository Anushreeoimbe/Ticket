import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Paperclip,
  Send,
  X,
} from "lucide-react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Toast from "../components/Toast";
import { useTickets } from "../context/TicketContext";

function CreateTicket() {
  const navigate = useNavigate();
  const { addTicket } = useTickets();

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    requester: "",
    email: "",
    category: "Technical",
    priority: "Medium",
    assignedTo: "Rahul Sharma",
  });

  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    const newFiles = selectedFiles.map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    // Allow selecting the same file again
    e.target.value = "";
  };

  // Remove selected attachment
  const removeAttachment = (index) => {
    setAttachments((prev) =>
      prev.filter((_, fileIndex) => fileIndex !== index)
    );
  };

  // Format file size
  const formatFileSize = (size) => {
    if (size < 1024) {
      return size + " B";
    }

    if (size < 1024 * 1024) {
      return (size / 1024).toFixed(1) + " KB";
    }

    return (size / (1024 * 1024)).toFixed(1) + " MB";
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    }

    if (!formData.requester.trim()) {
      newErrors.requester = "Requester name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Create ticket
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const today = new Date();

    const dateString =
      today.getFullYear() +
      "-" +
      String(today.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(today.getDate()).padStart(2, "0");

    const ticketId =
      "TKT-" + Math.floor(1000 + Math.random() * 9000);

    const newTicket = {
      id: ticketId,
      subject: formData.subject.trim(),
      description: formData.description.trim(),
      requester: formData.requester.trim(),
      email: formData.email.trim(),
      assignedTo: formData.assignedTo,
      category: formData.category,
      priority: formData.priority,
      status: "Open",
      createdAt: dateString,
      updatedAt: dateString,
      slaDue: dateString,

      comments: [],

      attachments: attachments,

      activity: [
        {
          text: "Ticket created",
          date: today.toLocaleString(),
        },
      ],
    };

    // Small delay to show loading state
    setTimeout(() => {
      addTicket(newTicket);

      setIsSubmitting(false);

      setToast("Ticket created successfully.");

      setTimeout(() => {
        navigate("/tickets");
      }, 800);
    }, 700);
  };

  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="create-ticket-page">

          {/* BACK BUTTON */}

          <div className="page-back">

            <button
              className="back-btn"
              onClick={() => navigate("/tickets")}
              type="button"
            >
              <ArrowLeft size={17} />
              Back to Tickets
            </button>

          </div>

          {/* PAGE HEADER */}

          <div className="create-ticket-header">

            <div>

              <h1>Create Ticket</h1>

              <p>
                Create a new support ticket and assign it to a team member.
              </p>

            </div>

          </div>

          {/* FORM */}

          <form
            className="create-ticket-form"
            onSubmit={handleSubmit}
          >

            {/* TICKET INFORMATION */}

            <div className="form-card">

              <div className="form-card-header">

                <h3>Ticket Information</h3>

                <p>
                  Provide the details of the support request.
                </p>

              </div>

              <div className="form-grid">

                {/* SUBJECT */}

                <div className="form-group full-width">

                  <label>
                    Subject <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="subject"
                    placeholder="Enter ticket subject"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  {errors.subject && (
                    <small className="field-error">
                      {errors.subject}
                    </small>
                  )}

                </div>

                {/* DESCRIPTION */}

                <div className="form-group full-width">

                  <label>
                    Description <span>*</span>
                  </label>

                  <textarea
                    name="description"
                    rows="5"
                    placeholder="Describe the issue in detail..."
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>

                  {errors.description && (
                    <small className="field-error">
                      {errors.description}
                    </small>
                  )}

                </div>

                {/* REQUESTER */}

                <div className="form-group">

                  <label>
                    Requester Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="requester"
                    placeholder="Enter requester name"
                    value={formData.requester}
                    onChange={handleChange}
                  />

                  {errors.requester && (
                    <small className="field-error">
                      {errors.requester}
                    </small>
                  )}

                </div>

                {/* EMAIL */}

                <div className="form-group">

                  <label>
                    Email Address <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                  />

                  {errors.email && (
                    <small className="field-error">
                      {errors.email}
                    </small>
                  )}

                </div>

                {/* CATEGORY */}

                <div className="form-group">

                  <label>
                    Category
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="Technical">
                      Technical
                    </option>

                    <option value="Access">
                      Access
                    </option>

                    <option value="Software">
                      Software
                    </option>

                    <option value="Hardware">
                      Hardware
                    </option>

                    <option value="Network">
                      Network
                    </option>
                  </select>

                </div>

                {/* PRIORITY */}

                <div className="form-group">

                  <label>
                    Priority
                  </label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">
                      Low
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="High">
                      High
                    </option>

                    <option value="Critical">
                      Critical
                    </option>
                  </select>

                </div>

                {/* ASSIGNED TO */}

                <div className="form-group">

                  <label>
                    Assign To
                  </label>

                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  >
                    <option value="Rahul Sharma">
                      Rahul Sharma
                    </option>

                    <option value="Sneha Kulkarni">
                      Sneha Kulkarni
                    </option>

                    <option value="Vikram Singh">
                      Vikram Singh
                    </option>

                    <option value="Priya Deshmukh">
                      Priya Deshmukh
                    </option>
                  </select>

                </div>

              </div>

            </div>

            {/* ATTACHMENTS */}

            <div className="form-card">

              <div className="form-card-header">

                <h3>Attachments</h3>

                <p>
                  Add screenshots, documents, or other files related to the
                  ticket.
                </p>

              </div>

              {/* FILE UPLOAD */}

              <label className="attachment-upload">

                <Paperclip size={22} />

                <strong>
                  Click to attach files
                </strong>

                <span>
                  You can select one or multiple files
                </span>

                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                />

              </label>

              {/* SELECTED FILES */}

              {attachments.length > 0 && (

                <div className="selected-attachments">

                  {attachments.map((file, index) => (

                    <div
                      className="selected-attachment"
                      key={index}
                    >

                      <div className="attachment-file-icon">

                        <Paperclip size={17} />

                      </div>

                      <div className="attachment-file-info">

                        <strong>
                          {file.name}
                        </strong>

                        <span>
                          {formatFileSize(file.size)}
                        </span>

                      </div>

                      <button
                        type="button"
                        className="remove-attachment-btn"
                        onClick={() =>
                          removeAttachment(index)
                        }
                        aria-label="Remove attachment"
                      >

                        <X size={16} />

                      </button>

                    </div>

                  ))}

                </div>

              )}

            </div>

            {/* FORM ACTIONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/tickets")}
                disabled={isSubmitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-btn"
                disabled={isSubmitting}
              >

                {isSubmitting ? (

                  <>
                    <span className="button-spinner"></span>
                    Creating...
                  </>

                ) : (

                  <>
                    <Send size={17} />
                    Create Ticket
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </main>

      {/* TOAST */}

      <Toast
        message={toast}
        type="success"
        onClose={() => setToast("")}
      />

    </div>
  );
}

export default CreateTicket;