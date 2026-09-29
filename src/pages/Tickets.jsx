
import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Plus,
  Eye,
  Pencil,
  Trash2,
  RotateCcw,
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import ConfirmationModal from "../components/ConfirmationModal";
import Toast from "../components/Toast";

import { useTickets } from "../context/TicketContext";


function Tickets() {

  const navigate = useNavigate();

  const {
    tickets,
    deleteTicket,
  } = useTickets();


  /* =========================================
     LOADING / ERROR
  ========================================= */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);

  }, []);


  /* =========================================
     FILTER STATES
  ========================================= */

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [priorityFilter, setPriorityFilter] =
    useState("All");

  const [categoryFilter, setCategoryFilter] =
    useState("All");

  const [slaFilter, setSlaFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState("newest");

  const [currentPage, setCurrentPage] =
    useState(1);


  /* =========================================
     DELETE
  ========================================= */

  const [deleteId, setDeleteId] =
    useState(null);


  /* =========================================
     TOAST
  ========================================= */

  const [toast, setToast] = useState({
    message: "",
    type: "success",
  });


  /* =========================================
     SLA STATUS
  ========================================= */

  const getSlaStatus = (ticket) => {

    if (ticket.status === "Resolved") {
      return "Resolved";
    }

    if (!ticket.slaDue) {
      return "No SLA";
    }


    const today = new Date()
      .toISOString()
      .split("T")[0];


    const dueDate = new Date(
      ticket.slaDue
    );

    const todayDate = new Date(today);


    const difference =
      Math.ceil(
        (dueDate - todayDate) /
        (1000 * 60 * 60 * 24)
      );


    if (difference < 0) {
      return "Breached";
    }


    if (difference <= 1) {
      return "Due Soon";
    }


    return "On Track";
  };


  /* =========================================
     SLA ICON
  ========================================= */

  const getSlaIcon = (status) => {

    if (status === "Breached") {
      return <AlertTriangle size={15} />;
    }


    if (status === "Due Soon") {
      return <Clock3 size={15} />;
    }


    return <CheckCircle2 size={15} />;
  };


  /* =========================================
     TOAST FUNCTION
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
     FILTER + SEARCH
  ========================================= */

  const filteredTickets = useMemo(() => {

    let result = [...tickets];


    /* SEARCH */

    if (search.trim()) {

      const searchValue =
        search.toLowerCase();


      result = result.filter(
        (ticket) =>
          ticket.id
            .toLowerCase()
            .includes(searchValue) ||

          ticket.subject
            .toLowerCase()
            .includes(searchValue) ||

          ticket.requester
            .toLowerCase()
            .includes(searchValue) ||

          ticket.email
            .toLowerCase()
            .includes(searchValue)
      );
    }


    /* STATUS */

    if (statusFilter !== "All") {

      result = result.filter(
        (ticket) =>
          ticket.status === statusFilter
      );
    }


    /* PRIORITY */

    if (priorityFilter !== "All") {

      result = result.filter(
        (ticket) =>
          ticket.priority ===
          priorityFilter
      );
    }


    /* CATEGORY */

    if (categoryFilter !== "All") {

      result = result.filter(
        (ticket) =>
          ticket.category ===
          categoryFilter
      );
    }


    /* SLA */

    if (slaFilter !== "All") {

      result = result.filter(
        (ticket) =>
          getSlaStatus(ticket) ===
          slaFilter
      );
    }


    /* SORT */

    if (sortBy === "newest") {

      result.sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      );
    }


    if (sortBy === "oldest") {

      result.sort(
        (a, b) =>
          new Date(a.createdAt) -
          new Date(b.createdAt)
      );
    }


    if (sortBy === "priority") {

      const priorityOrder = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4,
      };


      result.sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
    }


    return result;

  }, [
    tickets,
    search,
    statusFilter,
    priorityFilter,
    categoryFilter,
    slaFilter,
    sortBy,
  ]);


  /* =========================================
     PAGINATION
  ========================================= */

  const itemsPerPage = 5;


  const totalPages =
    Math.ceil(
      filteredTickets.length /
      itemsPerPage
    );


  const startIndex =
    (currentPage - 1) *
    itemsPerPage;


  const currentTickets =
    filteredTickets.slice(
      startIndex,
      startIndex + itemsPerPage
    );


  /* =========================================
     RESET PAGE
  ========================================= */

  const resetPage = () => {
    setCurrentPage(1);
  };


  /* =========================================
     DELETE HANDLER
  ========================================= */

  const handleDelete = (id) => {
    setDeleteId(id);
  };


  const confirmDelete = () => {

    if (!deleteId) {
      return;
    }


    deleteTicket(deleteId);

    setDeleteId(null);


    showToast(
      "Ticket deleted successfully.",
      "success"
    );


    if (
      currentTickets.length === 1 &&
      currentPage > 1
    ) {

      setCurrentPage(
        currentPage - 1
      );
    }
  };


  /* =========================================
     RESET FILTERS
  ========================================= */

  const resetFilters = () => {

    setSearch("");

    setStatusFilter("All");

    setPriorityFilter("All");

    setCategoryFilter("All");

    setSlaFilter("All");

    setSortBy("newest");

    setCurrentPage(1);
  };


  /* =========================================
     RETRY ERROR
  ========================================= */

  const handleRetry = () => {

    setError("");

    setLoading(true);


    setTimeout(() => {

      setLoading(false);

    }, 500);
  };


  return (

    <div className="app-layout">

      <Sidebar />


      <div className="main-content">

        <Navbar />


        <main className="tickets-page">


          {/* =================================
              PAGE HEADER
          ================================= */}

          <div className="tickets-header">

            <div>

              <h1>
                Tickets
              </h1>

              <p>
                Manage and track support tickets.
              </p>

            </div>


            <button
              className="create-ticket-btn"
              onClick={() =>
                navigate(
                  "/tickets/create"
                )
              }
            >

              <Plus size={17} />

              Create Ticket

            </button>

          </div>


          {/* =================================
              ERROR STATE
          ================================= */}

          {error && (

            <div className="page-error-state">

              <div className="error-state-icon">

                <AlertTriangle
                  size={24}
                />

              </div>


              <div>

                <h3>
                  Something went wrong
                </h3>

                <p>
                  {error}
                </p>

              </div>


              <button
                onClick={handleRetry}
              >
                Try Again
              </button>

            </div>

          )}


          {/* =================================
              FILTERS
          ================================= */}

          <div className="tickets-filter-card">


            {/* SEARCH */}

            <div className="ticket-search">

              <Search size={17} />

              <input
                type="text"
                placeholder="Search by ID, subject, requester or email..."
                value={search}
                onChange={(e) => {

                  setSearch(
                    e.target.value
                  );

                  resetPage();

                }}
              />

            </div>


            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) => {

                setStatusFilter(
                  e.target.value
                );

                resetPage();

              }}
            >

              <option value="All">
                All Status
              </option>

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


            {/* PRIORITY */}

            <select
              value={priorityFilter}
              onChange={(e) => {

                setPriorityFilter(
                  e.target.value
                );

                resetPage();

              }}
            >

              <option value="All">
                All Priority
              </option>

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


            {/* CATEGORY */}

            <select
              value={categoryFilter}
              onChange={(e) => {

                setCategoryFilter(
                  e.target.value
                );

                resetPage();

              }}
            >

              <option value="All">
                All Category
              </option>

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


            {/* SLA */}

            <select
              value={slaFilter}
              onChange={(e) => {

                setSlaFilter(
                  e.target.value
                );

                resetPage();

              }}
            >

              <option value="All">
                All SLA
              </option>

              <option value="On Track">
                On Track
              </option>

              <option value="Due Soon">
                Due Soon
              </option>

              <option value="Breached">
                Breached
              </option>

              <option value="Resolved">
                Resolved
              </option>

            </select>


            {/* SORT */}

            <select
              value={sortBy}
              onChange={(e) => {

                setSortBy(
                  e.target.value
                );

                resetPage();

              }}
            >

              <option value="newest">
                Newest
              </option>

              <option value="oldest">
                Oldest
              </option>

              <option value="priority">
                Priority
              </option>

            </select>


            {/* RESET */}

            <button
              className="reset-filter-btn"
              onClick={resetFilters}
            >

              <RotateCcw size={15} />

              Reset

            </button>


          </div>


          {/* =================================
              SLA LEGEND
          ================================= */}

          <div className="sla-legend">


            <div className="sla-legend-item on-track">

              <CheckCircle2 size={15} />

              <span>
                On Track
              </span>

            </div>


            <div className="sla-legend-item due-soon">

              <Clock3 size={15} />

              <span>
                Due Soon
              </span>

            </div>


            <div className="sla-legend-item breached">

              <AlertTriangle size={15} />

              <span>
                Breached
              </span>

            </div>


            <div className="sla-legend-item resolved">

              <CheckCircle2 size={15} />

              <span>
                Resolved
              </span>

            </div>


          </div>


          {/* =================================
              TICKETS CARD
          ================================= */}

          <div className="tickets-table-card">


            {/* =================================
                LOADING STATE
            ================================= */}

            {loading ? (

              <div className="tickets-loading-state">

                <div className="loading-spinner"></div>

                <h3>
                  Loading tickets...
                </h3>

                <p>
                  Please wait while we load your support tickets.
                </p>

              </div>

            ) : (

              <>


                {/* =================================
                    TABLE HEADER
                ================================= */}

                <div className="tickets-table-header">

                  <div>

                    <h3>
                      All Tickets
                    </h3>

                    <span>
                      {filteredTickets.length} tickets
                    </span>

                  </div>

                </div>


                {/* =================================
                    EMPTY / TABLE STATE
                ================================= */}

                {
                  currentTickets.length > 0
                    ? (

                      <div className="table-wrapper">

                        <table className="tickets-table">

                          <thead>

                            <tr>

                              <th>
                                Ticket
                              </th>

                              <th>
                                Subject
                              </th>

                              <th>
                                Requester
                              </th>

                              <th>
                                Category
                              </th>

                              <th>
                                Priority
                              </th>

                              <th>
                                Status
                              </th>

                              <th>
                                SLA
                              </th>

                              <th>
                                Assigned To
                              </th>

                              <th>
                                Actions
                              </th>

                            </tr>

                          </thead>


                          <tbody>

                            {
                              currentTickets.map(
                                (ticket) => {

                                  const slaStatus =
                                    getSlaStatus(
                                      ticket
                                    );


                                  return (

                                    <tr
                                      key={
                                        ticket.id
                                      }
                                    >


                                      {/* TICKET */}

                                      <td>

                                        <span className="ticket-id">

                                          {
                                            ticket.id
                                          }

                                        </span>

                                      </td>


                                      {/* SUBJECT */}

                                      <td>

                                        <div className="subject-cell">

                                          <strong>
                                            {
                                              ticket.subject
                                            }
                                          </strong>

                                          <span>
                                            {
                                              ticket.createdAt
                                            }
                                          </span>

                                        </div>

                                      </td>


                                      {/* REQUESTER */}

                                      <td>

                                        <div className="requester-cell">

                                          <strong>
                                            {
                                              ticket.requester
                                            }
                                          </strong>

                                          <span>
                                            {
                                              ticket.email
                                            }
                                          </span>

                                        </div>

                                      </td>


                                      {/* CATEGORY */}

                                      <td>
                                        {
                                          ticket.category
                                        }
                                      </td>


                                      {/* PRIORITY */}

                                      <td>

                                        <span
                                          className={
                                            "priority-badge " +
                                            ticket.priority.toLowerCase()
                                          }
                                        >

                                          {
                                            ticket.priority
                                          }

                                        </span>

                                      </td>


                                      {/* STATUS */}

                                      <td>

                                        <span
                                          className={
                                            "status-badge " +
                                            ticket.status
                                              .toLowerCase()
                                              .replace(
                                                " ",
                                                "-"
                                              )
                                          }
                                        >

                                          {
                                            ticket.status
                                          }

                                        </span>

                                      </td>


                                      {/* SLA */}

                                      <td>

                                        <span
                                          className={
                                            "sla-badge " +
                                            slaStatus
                                              .toLowerCase()
                                              .replace(
                                                " ",
                                                "-"
                                              )
                                          }
                                        >

                                          {
                                            getSlaIcon(
                                              slaStatus
                                            )
                                          }

                                          {
                                            slaStatus
                                          }

                                        </span>


                                        {
                                          ticket.slaDue && (

                                            <small className="sla-date">

                                              Due:{" "}
                                              {
                                                ticket.slaDue
                                              }

                                            </small>

                                          )
                                        }

                                      </td>


                                      {/* ASSIGNED TO */}

                                      <td>

                                        <div className="assigned-cell">

                                          <div className="assigned-avatar">

                                            {
                                              ticket.assignedTo
                                                ? ticket.assignedTo
                                                    .charAt(
                                                      0
                                                    )
                                                    .toUpperCase()
                                                : "U"
                                            }

                                          </div>


                                          <span>

                                            {
                                              ticket.assignedTo ||
                                              "Unassigned"
                                            }

                                          </span>

                                        </div>

                                      </td>


                                      {/* ACTIONS */}

                                      <td>

                                        <div className="ticket-actions">


                                          {/* VIEW */}

                                          <button
                                            title="View Ticket"
                                            onClick={() =>
                                              navigate(
                                                "/tickets/" +
                                                  ticket.id
                                              )
                                            }
                                          >

                                            <Eye
                                              size={16}
                                            />

                                          </button>


                                          {/* EDIT */}

                                          <button
                                            title="Edit Ticket"
                                            onClick={() =>
                                              navigate(
                                                "/tickets/" +
                                                  ticket.id +
                                                  "/edit"
                                              )
                                            }
                                          >

                                            <Pencil
                                              size={16}
                                            />

                                          </button>


                                          {/* DELETE */}

                                          <button
                                            title="Delete Ticket"
                                            className="delete-action"
                                            onClick={() =>
                                              handleDelete(
                                                ticket.id
                                              )
                                            }
                                          >

                                            <Trash2
                                              size={16}
                                            />

                                          </button>


                                        </div>

                                      </td>


                                    </tr>

                                  );

                                }
                              )
                            }

                          </tbody>

                        </table>

                      </div>

                    )
                    : (

                      /* EMPTY STATE */

                      <div className="tickets-empty-state">

                        <div className="empty-icon">

                          <Search
                            size={24}
                          />

                        </div>


                        <h3>
                          No tickets found
                        </h3>


                        <p>
                          Try changing your search
                          or filter options.
                        </p>


                        <button
                          onClick={
                            resetFilters
                          }
                        >
                          Reset Filters
                        </button>

                      </div>

                    )
                }


                {/* =================================
                    PAGINATION
                ================================= */}

                {
                  totalPages > 1 && (

                    <div className="pagination">


                      <button
                        disabled={
                          currentPage ===
                          1
                        }
                        onClick={() =>
                          setCurrentPage(
                            currentPage - 1
                          )
                        }
                      >
                        Previous
                      </button>


                      <div className="page-numbers">

                        {
                          Array.from(
                            {
                              length:
                                totalPages,
                            },
                            (_, index) =>
                              index + 1
                          ).map(
                            (page) => (

                              <button
                                key={page}
                                className={
                                  page ===
                                  currentPage
                                    ? "active"
                                    : ""
                                }
                                onClick={() =>
                                  setCurrentPage(
                                    page
                                  )
                                }
                              >

                                {page}

                              </button>

                            )
                          )
                        }

                      </div>


                      <button
                        disabled={
                          currentPage ===
                          totalPages
                        }
                        onClick={() =>
                          setCurrentPage(
                            currentPage + 1
                          )
                        }
                      >
                        Next
                      </button>


                    </div>

                  )
                }


              </>

            )}

          </div>


          {/* =================================
              DELETE CONFIRMATION
          ================================= */}

          <ConfirmationModal
            isOpen={
              Boolean(deleteId)
            }
            title="Delete Ticket?"
            message="This action cannot be undone. Are you sure you want to delete this ticket?"
            confirmText="Delete Ticket"
            cancelText="Cancel"
            onConfirm={
              confirmDelete
            }
            onCancel={() =>
              setDeleteId(null)
            }
          />


          {/* =================================
              TOAST
          ================================= */}

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


export default Tickets;
