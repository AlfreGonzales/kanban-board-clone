import { Stack, Typography } from "@mui/material";
import BoardColumn from "../components/BoardColumn";
import { COLUMNS } from "../constants/COLUMNS";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";

export default function MainPage() {
  const { tasks } = useSelector((state) => state.tasks);

  return (
    <>
      <Typography variant="h4">Kanban Board</Typography>
      <Stack direction="row" spacing={2} sx={{ minHeight: "100%" }}>
        {COLUMNS.map((col) => (
          <BoardColumn key={col.id} title={col.title}>
            {tasks
              .filter((t) => t.status === col.id)
              .map((task) => (
                <TaskCard
                  key={task.id}
                  title={task.title}
                  code={task.code}
                  assignee={task.assignee}
                />
              ))}
          </BoardColumn>
        ))}
      </Stack>
    </>
  );
}
