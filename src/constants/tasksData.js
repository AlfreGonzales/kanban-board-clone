export const tasksData = [
  {
    id: crypto.randomUUID(),
    title: "Fix login timeout bug",
    description:
      "Resolve issue causing users to be logged out after 30 seconds of inactivity.",
    assignee: { id: 4, name: "Grace Taylor" },
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Design booking overview page",
    description: "Create UI layout for the main booking summary dashboard.",
    assignee: { id: 7, name: "Alice Smith" },
    status: "qa",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Optimize hotel search queries",
    description:
      "Improve database performance by adding indexes to hotel search filters.",
    assignee: { id: 2, name: "Eva Martinez" },
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Implement reservation cancellation flow",
    description:
      "Add endpoint and UI workflow for users to cancel existing reservations.",
    assignee: { id: 9, name: "Frank Lopez" },
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Refactor user role middleware",
    description: "Simplify role validation logic for admin and staff users.",
    assignee: { id: 5, name: "David Wilson" },
    status: "done",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Add real-time notification service",
    description:
      "Implement WebSocket channel to notify admins of new reservations.",
    assignee: { id: 1, name: "Bob Brown" },
    status: "qa",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Improve mobile responsiveness",
    description:
      "Update CSS to support small-screen booking and room selection.",
    assignee: { id: 6, name: "Henry Davis" },
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Migrate reservation logs",
    description:
      "Move reservation-related logs to dedicated microservice storage.",
    assignee: { id: 3, name: "John Doe" },
    status: "done",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Add discount voucher feature",
    description:
      "Allow managers to create and apply discount vouchers to reservations.",
    assignee: { id: 8, name: "Carol Johnson" },
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Improve error handling",
    description: "Add global exception filter and standardize error objects.",
    assignee: { id: 4, name: "Grace Taylor" },
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Create monthly sales report",
    description:
      "Generate automated report for total reservations and revenue.",
    assignee: { id: 6, name: "Alice Smith" },
    status: "qa",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Fix overlap in room availability",
    description:
      "Resolve bug where rooms appear double-booked for certain dates.",
    assignee: { id: 3, name: "Irene White" },
    status: "done",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Add multi-language support",
    description: "Enable language switcher and load translations dynamically.",
    assignee: { id: 1, name: "Bob Brown" },
    status: "backlog",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Implement dark mode",
    description: "Add theme toggler and persistent user preference storage.",
    assignee: { id: 9, name: "Frank Lopez" },
    status: "in-progress",
    createdAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Refactor reservation service",
    description:
      "Split reservation service into smaller modules for maintainability.",
    assignee: { id: 3, name: "John Doe" },
    status: "qa",
    createdAt: new Date().toISOString(),
  },
];
