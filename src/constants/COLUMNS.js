export const COLUMNS = [
  { id: "backlog", title: "Backlog", order: 1 },
  { id: "in-progress", title: "In Progress", order: 2, authRole: "dev" },
  { id: "qa", title: "QA", order: 3, authRole: "dev" },
  { id: "done", title: "Done", order: 4, authRole: "qa" },
];
