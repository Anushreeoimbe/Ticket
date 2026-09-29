import { createContext, useContext, useState } from "react";
import initialTickets from "../data/initialTickets";

const TicketContext = createContext();

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(() => {
    const savedTickets = localStorage.getItem("helpdesk_tickets");

    return savedTickets
      ? JSON.parse(savedTickets)
      : initialTickets;
  });

  const saveTickets = (updatedTickets) => {
    setTickets(updatedTickets);
    localStorage.setItem(
      "helpdesk_tickets",
      JSON.stringify(updatedTickets)
    );
  };

  const addTicket = (ticket) => {
    saveTickets([ticket, ...tickets]);
  };

  const updateTicket = (updatedTicket) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === updatedTicket.id ? updatedTicket : ticket
    );

    saveTickets(updatedTickets);
  };

  const deleteTicket = (id) => {
    const updatedTickets = tickets.filter(
      (ticket) => ticket.id !== id
    );

    saveTickets(updatedTickets);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicket,
        deleteTicket,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}