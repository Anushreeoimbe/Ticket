import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  LogOut,
  Headphones,
} from "lucide-react";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("helpdesk_logged_in");
    localStorage.removeItem("helpdesk_user_email");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="sidebar">

      {/* LOGO */}

      <div className="sidebar-logo">

        <div className="logo-icon">
          <Headphones size={22} />
        </div>

        <div>
          <h2>HelpDesk</h2>
          <span>Support Center</span>
        </div>

      </div>

      {/* NAVIGATION */}

      <div className="sidebar-section">

        <p className="sidebar-title">
          MAIN MENU
        </p>

        <nav className="sidebar-nav">

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <LayoutDashboard size={19} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/tickets"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <Ticket size={19} />
            <span>Tickets</span>
          </NavLink>

          <NavLink
            to="/tickets/create"
            className={({ isActive }) =>
              isActive
                ? "nav-item active"
                : "nav-item"
            }
          >
            <PlusCircle size={19} />
            <span>Create Ticket</span>
          </NavLink>

        </nav>

      </div>

      {/* SIDEBAR BOTTOM */}

      <div className="sidebar-bottom">

        <div className="support-box">

          <Headphones size={20} />

          <div>
            <strong>Need Help?</strong>
            <span>Contact support team</span>
          </div>

        </div>

        <button
          type="button"
          className="logout-btn"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;