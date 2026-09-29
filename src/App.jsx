import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { TicketProvider } from "./context/TicketContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import EditTicket from "./pages/EditTicket";

function App() {
  return (
    <TicketProvider>
      <BrowserRouter>
        <Routes>

          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/tickets"
            element={<Tickets />}
          />

          <Route
            path="/tickets/create"
            element={<CreateTicket />}
          />

          <Route
            path="/tickets/:id"
            element={<TicketDetails />}
          />

          <Route
            path="/tickets/:id/edit"
            element={<EditTicket />}
          />

          <Route
            path="*"
            element={<Navigate to="/dashboard" replace />}
          />

        </Routes>
      </BrowserRouter>
    </TicketProvider>
  );
}

export default App;