const initialTickets = [
  {
    id: "TKT-1001",
    subject: "Unable to access company email",
    description:
      "User is unable to access the company email account since this morning.",
    requester: "Anushree Oimbe",
    email: "anushree@example.com",
    assignedTo: "Rahul Sharma",
    category: "Technical",
    priority: "High",
    status: "Open",
    createdAt: "2026-09-28",
    updatedAt: "2026-09-28",
    slaDue: "2026-09-29",
    comments: [],
    attachments: [],
    activity: [
      {
        text: "Ticket created",
        date: "2026-09-28 09:30 AM",
      },
    ],
  },

  {
    id: "TKT-1002",
    subject: "Password reset request",
    description:
      "User requested a password reset for the internal portal.",
    requester: "Priya Patel",
    email: "priya@example.com",
    assignedTo: "Sneha Kulkarni",
    category: "Access",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-09-27",
    updatedAt: "2026-09-28",
    slaDue: "2026-09-29",
    comments: [
      {
        id: 1,
        user: "Sneha Kulkarni",
        text: "Working on the password reset request.",
        date: "2026-09-28 10:15 AM",
      },
    ],
    attachments: [],
    activity: [
      {
        text: "Ticket created",
        date: "2026-09-27 11:00 AM",
      },
      {
        text: "Assigned to Sneha Kulkarni",
        date: "2026-09-27 11:10 AM",
      },
      {
        text: "Status changed to In Progress",
        date: "2026-09-28 10:15 AM",
      },
    ],
  },

  {
    id: "TKT-1003",
    subject: "Laptop software installation",
    description:
      "Request to install required development software on company laptop.",
    requester: "Amit Kumar",
    email: "amit@example.com",
    assignedTo: "Rahul Sharma",
    category: "Software",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-09-25",
    updatedAt: "2026-09-27",
    slaDue: "2026-09-28",
    comments: [],
    attachments: [],
    activity: [
      {
        text: "Ticket created",
        date: "2026-09-25 02:00 PM",
      },
      {
        text: "Ticket resolved",
        date: "2026-09-27 04:30 PM",
      },
    ],
  },

  {
    id: "TKT-1004",
    subject: "VPN connection issue",
    description:
      "VPN disconnects frequently when connecting from home network.",
    requester: "Neha Joshi",
    email: "neha@example.com",
    assignedTo: "Vikram Singh",
    category: "Technical",
    priority: "Critical",
    status: "Pending",
    createdAt: "2026-09-26",
    updatedAt: "2026-09-28",
    slaDue: "2026-09-28",
    comments: [],
    attachments: [],
    activity: [
      {
        text: "Ticket created",
        date: "2026-09-26 09:00 AM",
      },
      {
        text: "Status changed to Pending",
        date: "2026-09-28 01:00 PM",
      },
    ],
  },
];

export default initialTickets;