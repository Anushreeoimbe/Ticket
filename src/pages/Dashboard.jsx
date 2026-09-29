import { useMemo } from "react";

import {
  Ticket,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { useNavigate } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

import { useTickets } from "../context/TicketContext";


function Dashboard() {

  const navigate = useNavigate();

  const { tickets } = useTickets();


  /* =========================================
     DYNAMIC TICKET COUNTS
  ========================================= */

  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;


  /* =========================================
     SLA BREACHED
  ========================================= */

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const slaBreached = tickets.filter(
    (ticket) =>
      ticket.slaDue &&
      ticket.slaDue < today &&
      ticket.status !== "Resolved"
  ).length;


  /* =========================================
     STATUS CHART
  ========================================= */

  const statusData = useMemo(() => {

    return [
      {
        name: "Open",
        value: tickets.filter(
          (ticket) =>
            ticket.status === "Open"
        ).length,
      },

      {
        name: "In Progress",
        value: tickets.filter(
          (ticket) =>
            ticket.status === "In Progress"
        ).length,
      },

      {
        name: "Pending",
        value: tickets.filter(
          (ticket) =>
            ticket.status === "Pending"
        ).length,
      },

      {
        name: "Resolved",
        value: tickets.filter(
          (ticket) =>
            ticket.status === "Resolved"
        ).length,
      },
    ];

  }, [tickets]);


  /* =========================================
     PRIORITY CHART
  ========================================= */

  const priorityData = useMemo(() => {

    return [
      {
        name: "Low",
        tickets: tickets.filter(
          (ticket) =>
            ticket.priority === "Low"
        ).length,
      },

      {
        name: "Medium",
        tickets: tickets.filter(
          (ticket) =>
            ticket.priority === "Medium"
        ).length,
      },

      {
        name: "High",
        tickets: tickets.filter(
          (ticket) =>
            ticket.priority === "High"
        ).length,
      },

      {
        name: "Critical",
        tickets: tickets.filter(
          (ticket) =>
            ticket.priority === "Critical"
        ).length,
      },
    ];

  }, [tickets]);


  /* =========================================
     RECENT TICKETS
  ========================================= */

  const recentTickets = useMemo(() => {

    return [...tickets]
      .sort(
        (a, b) =>
          new Date(b.createdAt) -
          new Date(a.createdAt)
      )
      .slice(0, 5);

  }, [tickets]);


  const chartColors = [
    "#2563eb",
    "#7c3aed",
    "#f59e0b",
    "#10b981",
  ];


  return (

    <div className="app-layout">

      <Sidebar />


      <div className="main-content">

        <Navbar />


        <main className="dashboard-page">


          {/* =================================
              HEADER
          ================================= */}

          <div className="dashboard-header">

            <div>

              <h1>
                Dashboard
              </h1>

              <p>
                Welcome back! Here's what's
                happening with your support tickets.
              </p>

            </div>


            <button
              className="new-ticket-btn"
              onClick={() =>
                navigate("/tickets/create")
              }
            >

              <Ticket size={18} />

              New Ticket

            </button>

          </div>


          {/* =================================
              STAT CARDS
          ================================= */}

          <div className="stats-grid">


            {/* TOTAL */}

            <div className="stat-card">

              <div className="stat-icon blue">
                <Ticket size={23} />
              </div>


              <div className="stat-content">

                <span>
                  Total Tickets
                </span>

                <h2>
                  {totalTickets}
                </h2>

                <small className="positive-text">

                  <TrendingUp size={13} />

                  Live ticket count

                </small>

              </div>

            </div>


            {/* OPEN */}

            <div className="stat-card">

              <div className="stat-icon orange">
                <Clock3 size={23} />
              </div>


              <div className="stat-content">

                <span>
                  Open Tickets
                </span>

                <h2>
                  {openTickets}
                </h2>

                <small>
                  Requires attention
                </small>

              </div>

            </div>


            {/* IN PROGRESS */}

            <div className="stat-card">

              <div className="stat-icon purple">
                <LoaderCircle size={23} />
              </div>


              <div className="stat-content">

                <span>
                  In Progress
                </span>

                <h2>
                  {inProgressTickets}
                </h2>

                <small>
                  Currently being handled
                </small>

              </div>

            </div>


            {/* RESOLVED */}

            <div className="stat-card">

              <div className="stat-icon green">
                <CheckCircle2 size={23} />
              </div>


              <div className="stat-content">

                <span>
                  Resolved
                </span>

                <h2>
                  {resolvedTickets}
                </h2>

                <small>
                  Successfully completed
                </small>

              </div>

            </div>


            {/* SLA */}

            <div className="stat-card">

              <div className="stat-icon red">
                <AlertTriangle size={23} />
              </div>


              <div className="stat-content">

                <span>
                  SLA Breached
                </span>

                <h2>
                  {slaBreached}
                </h2>

                <small>
                  Needs immediate attention
                </small>

              </div>

            </div>


          </div>


          {/* =================================
              CHARTS
          ================================= */}

          <div className="charts-grid">


            {/* STATUS CHART */}

            <div className="chart-card">

              <div className="card-header">

                <div>

                  <h3>
                    Tickets by Status
                  </h3>

                  <p>
                    Current ticket distribution
                  </p>

                </div>


                <button
                  className="icon-btn"
                  onClick={() =>
                    navigate("/tickets")
                  }
                  title="View tickets"
                >
                  <ArrowUpRight size={18} />
                </button>

              </div>


              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >

                  <PieChart>

                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={95}
                      innerRadius={55}
                      paddingAngle={3}
                    >

                      {statusData.map(
                        (entry, index) => (

                          <Cell
                            key={index}
                            fill={
                              chartColors[index]
                            }
                          />

                        )
                      )}

                    </Pie>


                    <Tooltip />


                    <Legend
                      verticalAlign="bottom"
                      height={36}
                    />

                  </PieChart>

                </ResponsiveContainer>

              </div>

            </div>


            {/* PRIORITY CHART */}

            <div className="chart-card">

              <div className="card-header">

                <div>

                  <h3>
                    Tickets by Priority
                  </h3>

                  <p>
                    Priority distribution
                  </p>

                </div>


                <button
                  className="icon-btn"
                  onClick={() =>
                    navigate("/tickets")
                  }
                  title="View tickets"
                >
                  <ArrowUpRight size={18} />
                </button>

              </div>


              <div className="chart-container">

                <ResponsiveContainer
                  width="100%"
                  height={280}
                >

                  <BarChart
                    data={priorityData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 10,
                    }}
                  >

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />


                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                    />


                    <YAxis
                      axisLine={false}
                      tickLine={false}
                    />


                    <Tooltip />


                    <Bar
                      dataKey="tickets"
                      fill="#2563eb"
                      radius={[
                        6,
                        6,
                        0,
                        0,
                      ]}
                      barSize={45}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            </div>


          </div>


          {/* =================================
              RECENT TICKETS
          ================================= */}

          <div className="recent-tickets-card">


            <div className="card-header">

              <div>

                <h3>
                  Recent Tickets
                </h3>

                <p>
                  Latest support requests
                </p>

              </div>


              <button
                className="view-all-btn"
                onClick={() =>
                  navigate("/tickets")
                }
              >

                View All

                <ArrowUpRight size={15} />

              </button>

            </div>


            {
              recentTickets.length > 0
                ? (

                  <div className="table-wrapper">

                    <table>

                      <thead>

                        <tr>

                          <th>
                            Ticket ID
                          </th>

                          <th>
                            Subject
                          </th>

                          <th>
                            Requester
                          </th>

                          <th>
                            Priority
                          </th>

                          <th>
                            Status
                          </th>

                        </tr>

                      </thead>


                      <tbody>

                        {
                          recentTickets.map(
                            (ticket) => (

                              <tr
                                key={ticket.id}
                                onClick={() =>
                                  navigate(
                                    "/tickets/" +
                                      ticket.id
                                  )
                                }
                              >

                                <td>

                                  <strong className="ticket-id">
                                    {ticket.id}
                                  </strong>

                                </td>


                                <td>

                                  <span className="ticket-subject">
                                    {ticket.subject}
                                  </span>

                                </td>


                                <td>
                                  {ticket.requester}
                                </td>


                                <td>

                                  <span
                                    className={
                                      "priority-badge " +
                                      ticket.priority.toLowerCase()
                                    }
                                  >
                                    {ticket.priority}
                                  </span>

                                </td>


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
                                    {ticket.status}
                                  </span>

                                </td>

                              </tr>

                            )
                          )
                        }

                      </tbody>

                    </table>

                  </div>

                )
                : (

                  <div className="tickets-empty-state">

                    <div className="empty-icon">
                      <Ticket size={24} />
                    </div>

                    <h3>
                      No tickets yet
                    </h3>

                    <p>
                      Create your first support ticket.
                    </p>

                    <button
                      onClick={() =>
                        navigate(
                          "/tickets/create"
                        )
                      }
                    >
                      Create Ticket
                    </button>

                  </div>

                )
            }


          </div>


        </main>

      </div>

    </div>
  );
}


export default Dashboard;