import {
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search tickets..."
        />
      </div>

      <div className="navbar-right">
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="profile-menu">
          <div className="profile-avatar">
            A
          </div>

          <div className="profile-info">
            <strong>Admin User</strong>
            <span>Administrator</span>
          </div>

          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}

export default Navbar;