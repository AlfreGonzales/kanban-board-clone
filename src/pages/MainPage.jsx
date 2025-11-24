import { Button, Stack, Typography } from "@mui/material";
import BoardColumn from "../components/BoardColumn";
import { COLUMNS } from "../constants/COLUMNS";
import { useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import TaskForm from "../components/TaskForm";

export default function MainPage() {
  const [open, setOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);

  const openCreateModal = () => {
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h4">Kanban Board</Typography>
      <Button variant="contained" onClick={openCreateModal}>
        CREATE TASK
      </Button>
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

      <TaskForm open={open} setOpen={setOpen} />
    </>
  );
}
