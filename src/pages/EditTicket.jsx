import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useTickets } from "../context/TicketContext";

function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { tickets, updateTicket } = useTickets();

  const ticket = tickets.find(
    (item) => item.id === id
  );

  const [formData, setFormData] = useState({
    subject: "",
    description: "",
    requester: "",
    email: "",
    category: "Technical",
    priority: "Medium",
    status: "Open",
    assignedTo: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ticket) {
      setFormData({
        subject: ticket.subject || "",
        description: ticket.description || "",
        requester: ticket.requester || "",
        email: ticket.email || "",
        category: ticket.category || "Technical",
        priority: ticket.priority || "Medium",
        status: ticket.status || "Open",
        assignedTo: ticket.assignedTo || "",
      });
    }
  }, [ticket]);

  if (!ticket) {
    return (
      <div className="app-layout">
        <Sidebar />

        <div className="main-content">
          <Navbar />

          <main className="edit-ticket-page">
            <div className="ticket-not-found">
              <h2>Ticket Not Found</h2>

              <p>
                The ticket you are trying to edit does not exist.
              </p>

              <button
                onClick={() => navigate("/tickets")}
              >
                Back to Tickets
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

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
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.assignedTo) {
      newErrors.assignedTo = "Please select an assignee.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const statusChanged =
      ticket.status !== formData.status;

    const assigneeChanged =
      ticket.assignedTo !== formData.assignedTo;

    const activity = [
      ...(ticket.activity || []),
    ];

    if (statusChanged) {
      activity.push({
        text: `Status changed to ${formData.status}`,
        date: new Date().toLocaleString(),
      });
    }

    if (assigneeChanged) {
      activity.push({
        text: `Assigned to ${formData.assignedTo}`,
        date: new Date().toLocaleString(),
      });
    }

    activity.push({
      text: "Ticket details updated",
      date: new Date().toLocaleString(),
    });

    const updatedTicket = {
      ...ticket,

      subject: formData.subject.trim(),

      description: formData.description.trim(),

      requester: formData.requester.trim(),

      email: formData.email.trim(),

      category: formData.category,

      priority: formData.priority,

      status: formData.status,

      assignedTo: formData.assignedTo,

      updatedAt: new Date()
        .toISOString()
        .split("T")[0],

      activity,
    };

    updateTicket(updatedTicket);

    navigate(`/tickets/${ticket.id}`);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Navbar />

        <main className="edit-ticket-page">

          <div className="edit-ticket-header">

            <button
              className="back-button"
              onClick={() =>
                navigate(`/tickets/${ticket.id}`)
              }
            >
              <ArrowLeft size={17} />
              Back to Ticket
            </button>

            <h1>Edit Ticket</h1>

            <p>
              Update the ticket information, assignment,
              priority and status.
            </p>

          </div>

          <form
            className="ticket-form"
            onSubmit={handleSubmit}
          >

            {/* TICKET INFORMATION */}

            <div className="form-section">

              <div className="form-section-header">
                <h3>Ticket Information</h3>

                <p>
                  Update the main details of this support ticket.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-field full-width">
                  <label>
                    Subject <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter ticket subject"
                  />

                  {errors.subject && (
                    <small className="field-error">
                      {errors.subject}
                    </small>
                  )}
                </div>

                <div className="form-field full-width">
                  <label>
                    Description <span>*</span>
                  </label>

                  <textarea
                    name="description"
                    rows="6"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the issue..."
                  ></textarea>

                  {errors.description && (
                    <small className="field-error">
                      {errors.description}
                    </small>
                  )}
                </div>

              </div>
            </div>


            {/* REQUESTER */}

            <div className="form-section">

              <div className="form-section-header">
                <h3>Requester Information</h3>

                <p>
                  Update the requester contact information.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-field">
                  <label>
                    Requester Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="requester"
                    value={formData.requester}
                    onChange={handleChange}
                    placeholder="Requester name"
                  />

                  {errors.requester && (
                    <small className="field-error">
                      {errors.requester}
                    </small>
                  )}
                </div>

                <div className="form-field">
                  <label>
                    Email Address <span>*</span>
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                  />

                  {errors.email && (
                    <small className="field-error">
                      {errors.email}
                    </small>
                  )}
                </div>

              </div>
            </div>


            {/* SETTINGS */}

            <div className="form-section">

              <div className="form-section-header">
                <h3>Ticket Settings</h3>

                <p>
                  Manage category, priority, status and assignment.
                </p>
              </div>

              <div className="form-grid">

                <div className="form-field">
                  <label>Category</label>

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

                <div className="form-field">
                  <label>Priority</label>

                  <select
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">
                      Critical
                    </option>
                  </select>
                </div>

                <div className="form-field">
                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="Open">Open</option>

                    <option value="In Progress">
                      In Progress
                    </option>

                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Resolved">
                      Resolved
                    </option>
                  </select>
                </div>

                <div className="form-field">
                  <label>
                    Assign To <span>*</span>
                  </label>

                  <select
                    name="assignedTo"
                    value={formData.assignedTo}
                    onChange={handleChange}
                  >
                    <option value="">
                      Select support agent
                    </option>

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

                  {errors.assignedTo && (
                    <small className="field-error">
                      {errors.assignedTo}
                    </small>
                  )}
                </div>

              </div>
            </div>


            {/* ACTIONS */}

            <div className="form-actions">

              <button
                type="button"
                className="cancel-form-btn"
                onClick={() =>
                  navigate(`/tickets/${ticket.id}`)
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="submit-ticket-btn"
              >
                <Save size={17} />
                Save Changes
              </button>

            </div>

          </form>

        </main>
      </div>
    </div>
  );
}

export default EditTicket;