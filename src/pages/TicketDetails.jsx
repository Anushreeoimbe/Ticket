import { useState } from "react";

import {
  ArrowLeft,
  Pencil,
  Trash2,
  Clock3,
  User,
  Mail,
  Tag,
  MessageSquare,
  Activity,
  Paperclip,
  Send,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../components/ConfirmationModal";
import Toast from "../components/Toast";

import { useTickets } from "../context/TicketContext";


function TicketDetails() {

  const { id } = useParams();

  const navigate = useNavigate();

  const {
    tickets,
    updateTicket,
    deleteTicket,
  } = useTickets();


  const ticket = tickets.find(
    (item) => item.id === id
  );


  const [comment, setComment] = useState("");

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });


  /* =========================================
     TOAST
  ========================================= */

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message: message,
      type: type,
    });

    setTimeout(() => {

      setToast({
        message: "",
        type: "success",
      });

    }, 3000);
  };


  /* =========================================
     TICKET NOT FOUND
  ========================================= */

  if (!ticket) {

    return (
      <div className="app-layout">

        <Sidebar />

        <div className="main-content">

          <Navbar />

          <main className="ticket-details-page">

            <div className="ticket-not-found">

              <h2>
                Ticket Not Found
              </h2>

              <p>
                The ticket you are looking for
                does not exist or has been deleted.
              </p>

              <button
                onClick={() =>
                  navigate("/tickets")
                }
              >
                Back to Tickets
              </button>

            </div>

          </main>

        </div>

      </div>
    );
  }


  /* =========================================
     DELETE
  ========================================= */

  const handleDelete = () => {

    setShowDeleteModal(true);

  };


  const confirmDelete = () => {

    deleteTicket(ticket.id);

    setShowDeleteModal(false);

    showToast(
      "Ticket deleted successfully.",
      "success"
    );

    setTimeout(() => {

      navigate("/tickets");

    }, 800);

  };


  /* =========================================
     STATUS CHANGE
  ========================================= */

  const handleStatusChange = (e) => {

    const newStatus = e.target.value;

    const now = new Date();


    const updatedTicket = {

      ...ticket,

      status: newStatus,

      updatedAt:
        now
          .toISOString()
          .split("T")[0],

      activity: [

        ...(ticket.activity || []),

        {
          text:
            "Status changed to " +
            newStatus,

          date:
            now.toLocaleString(),
        },

      ],

    };


    updateTicket(updatedTicket);


    showToast(
      "Ticket status changed to " +
        newStatus +
        ".",
      "success"
    );

  };


  /* =========================================
     ADD COMMENT
  ========================================= */

  const handleCommentSubmit = (e) => {

    e.preventDefault();


    if (!comment.trim()) {

      showToast(
        "Please enter a comment.",
        "error"
      );

      return;
    }


    const now = new Date();


    const newComment = {

      id: Date.now(),

      user: "Admin User",

      text: comment.trim(),

      date:
        now.toLocaleString(),

    };


    const updatedTicket = {

      ...ticket,

      comments: [

        ...(ticket.comments || []),

        newComment,

      ],

      updatedAt:
        now
          .toISOString()
          .split("T")[0],

      activity: [

        ...(ticket.activity || []),

        {
          text:
            "Admin User added a comment",

          date:
            now.toLocaleString(),
        },

      ],

    };


    updateTicket(updatedTicket);

    setComment("");


    showToast(
      "Comment added successfully.",
      "success"
    );

  };


  /* =========================================
     PAGE
  ========================================= */

  return (

    <div className="app-layout">

      <Sidebar />


      <div className="main-content">

        <Navbar />


        <main className="ticket-details-page">


          {/* =====================================
              HEADER
          ====================================== */}

          <div className="details-header">

            <button
              className="back-button"
              onClick={() =>
                navigate("/tickets")
              }
            >
              <ArrowLeft size={17} />

              Back to Tickets
            </button>


            <div className="details-title-row">

              <div>

                <div className="ticket-title-line">

                  <span className="details-ticket-id">
                    {ticket.id}
                  </span>


                  <span
                    className={
                      "status-badge " +
                      ticket.status
                        .toLowerCase()
                        .replace(" ", "-")
                    }
                  >
                    {ticket.status}
                  </span>


                  <span
                    className={
                      "priority-badge " +
                      ticket.priority.toLowerCase()
                    }
                  >
                    {ticket.priority}
                  </span>

                </div>


                <h1>
                  {ticket.subject}
                </h1>


                <p>
                  Created on {ticket.createdAt}
                  {" · "}
                  Last updated {ticket.updatedAt}
                </p>

              </div>


              <div className="details-actions">

                <button
                  className="details-edit-btn"
                  onClick={() =>
                    navigate(
                      "/tickets/" +
                        ticket.id +
                        "/edit"
                    )
                  }
                >
                  <Pencil size={16} />

                  Edit
                </button>


                <button
                  className="details-delete-btn"
                  onClick={handleDelete}
                >
                  <Trash2 size={16} />

                  Delete
                </button>

              </div>

            </div>

          </div>


          {/* =====================================
              GRID
          ====================================== */}

          <div className="details-grid">


            {/* =================================
                LEFT CONTENT
            ================================= */}

            <div className="details-main">


              {/* DESCRIPTION */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <h3>
                      Ticket Description
                    </h3>

                    <p>
                      Issue details provided
                      by requester.
                    </p>

                  </div>

                </div>


                <div className="ticket-description">

                  {ticket.description}

                </div>

              </section>


              {/* COMMENTS */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <h3>

                      Comments

                      <span className="count-badge">

                        {
                          (ticket.comments || [])
                            .length
                        }

                      </span>

                    </h3>

                    <p>
                      Communication related
                      to this ticket.
                    </p>

                  </div>

                </div>


                <div className="comments-list">

                  {
                    ticket.comments &&
                    ticket.comments.length > 0
                    ? (

                      ticket.comments.map(
                        (item) => (

                          <div
                            className="comment-item"
                            key={item.id}
                          >

                            <div className="comment-avatar">

                              {
                                item.user
                                  ? item.user
                                      .charAt(0)
                                      .toUpperCase()
                                  : "A"
                              }

                            </div>


                            <div className="comment-content">

                              <div className="comment-top">

                                <strong>
                                  {item.user}
                                </strong>

                                <span>
                                  {item.date}
                                </span>

                              </div>


                              <p>
                                {item.text}
                              </p>

                            </div>

                          </div>

                        )
                      )

                    )
                    : (

                      <div className="no-comments">

                        <MessageSquare size={22} />

                        <p>
                          No comments yet.
                        </p>

                      </div>

                    )
                  }

                </div>


                {/* COMMENT FORM */}

                <form
                  className="comment-form"
                  onSubmit={
                    handleCommentSubmit
                  }
                >

                  <textarea
                    placeholder="Write a comment..."
                    value={comment}
                    onChange={(e) =>
                      setComment(
                        e.target.value
                      )
                    }
                  />


                  <button type="submit">

                    <Send size={16} />

                    Add Comment

                  </button>

                </form>

              </section>


              {/* ACTIVITY TIMELINE */}

              <section className="details-card">

                <div className="details-card-header">

                  <div>

                    <h3>
                      Activity Timeline
                    </h3>

                    <p>
                      Recent actions performed
                      on this ticket.
                    </p>

                  </div>

                </div>


                <div className="activity-timeline">

                  {
                    (ticket.activity || [])
                      .length > 0
                    ? (

                      ticket.activity
                        .slice()
                        .reverse()
                        .map(
                          (item, index) => (

                            <div
                              className="activity-item"
                              key={index}
                            >

                              <div className="activity-dot">

                                <Activity
                                  size={13}
                                />

                              </div>


                              <div className="activity-content">

                                <strong>
                                  {item.text}
                                </strong>

                                <span>
                                  {item.date}
                                </span>

                              </div>

                            </div>

                          )
                        )

                    )
                    : (

                      <p className="no-activity">
                        No activity recorded.
                      </p>

                    )
                  }

                </div>

              </section>

            </div>


            {/* =================================
                RIGHT SIDEBAR
            ================================= */}

            <aside className="details-sidebar">


              {/* STATUS */}

              <section className="details-side-card">

                <h3>
                  Ticket Status
                </h3>


                <select
                  value={ticket.status}
                  onChange={
                    handleStatusChange
                  }
                >

                  <option value="Open">
                    Open
                  </option>

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

              </section>


              {/* REQUESTER */}

              <section className="details-side-card">

                <h3>
                  Requester
                </h3>


                <div className="side-info">

                  <div className="side-icon">
                    <User size={16} />
                  </div>


                  <div>

                    <strong>
                      {ticket.requester}
                    </strong>

                    <span>
                      Requester
                    </span>

                  </div>

                </div>


                <div className="side-info">

                  <div className="side-icon">
                    <Mail size={16} />
                  </div>


                  <div>

                    <strong>
                      {ticket.email}
                    </strong>

                    <span>
                      Email
                    </span>

                  </div>

                </div>

              </section>


              {/* ASSIGNMENT */}

              <section className="details-side-card">

                <h3>
                  Assignment
                </h3>


                <div className="assigned-detail">

                  <div className="assigned-avatar large">

                    {
                      ticket.assignedTo
                        ? ticket.assignedTo
                            .charAt(0)
                            .toUpperCase()
                        : "U"
                    }

                  </div>


                  <div>

                    <strong>
                      {
                        ticket.assignedTo ||
                        "Unassigned"
                      }
                    </strong>

                    <span>
                      Support Agent
                    </span>

                  </div>

                </div>

              </section>


              {/* TICKET INFORMATION */}

              <section className="details-side-card">

                <h3>
                  Ticket Information
                </h3>


                <div className="info-row">

                  <span>

                    <Tag size={15} />

                    Category

                  </span>


                  <strong>
                    {ticket.category}
                  </strong>

                </div>


                <div className="info-row">

                  <span>

                    <Activity size={15} />

                    Priority

                  </span>


                  <span
                    className={
                      "priority-badge " +
                      ticket.priority.toLowerCase()
                    }
                  >
                    {ticket.priority}
                  </span>

                </div>

              </section>


              {/* SLA */}

              <section className="sla-card">

                <div className="sla-icon">

                  <Clock3 size={20} />

                </div>


                <div>

                  <span>
                    SLA Due Date
                  </span>

                  <strong>
                    {ticket.slaDue}
                  </strong>

                </div>

              </section>


              {/* ATTACHMENTS */}

              <section className="details-side-card">

                <h3>
                  Attachments
                </h3>


                {
                  ticket.attachments &&
                  ticket.attachments.length > 0
                  ? (

                    ticket.attachments.map(
                      (file, index) => (

                        <div
                          className="attachment-item"
                          key={index}
                        >

                          <Paperclip size={15} />

                          <span>
                            {file}
                          </span>

                        </div>

                      )
                    )

                  )
                  : (

                    <div className="no-attachments">

                      <Paperclip size={18} />

                      <span>
                        No attachments
                      </span>

                    </div>

                  )
                }

              </section>

            </aside>

          </div>


          {/* =====================================
              DELETE MODAL
          ====================================== */}

          <ConfirmationModal

            isOpen={
              showDeleteModal
            }

            title="Delete Ticket?"

            message={
              "This action cannot be undone. Are you sure you want to delete this ticket?"
            }

            confirmText="Delete Ticket"

            cancelText="Cancel"

            onConfirm={
              confirmDelete
            }

            onCancel={() =>
              setShowDeleteModal(false)
            }

          />


          {/* =====================================
              TOAST
          ====================================== */}

          <Toast

            message={
              toast.message
            }

            type={
              toast.type
            }

            onClose={() =>
              setToast({
                message: "",
                type: "success",
              })
            }

          />

        </main>

      </div>

    </div>
  );
}


export default TicketDetails;