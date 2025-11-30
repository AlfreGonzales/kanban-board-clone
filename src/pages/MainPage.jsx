import {
  Avatar,
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import BoardColumn from "../components/BoardColumn";
import { COLUMNS } from "../constants/COLUMNS";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { updateTask } from "../store/slices/tasksSlice";
import { useAlert } from "../hooks/useAlert";
import { getInitials } from "../shared/getInitials";

export default function MainPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [selectedUser, setSelectedUser] = useState("all");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 500);

    return () => clearTimeout(handler);
  }, [filter]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setOpen(true);
  };

  const handleDragStart = (event) => {
    const id = event.active.id;
    const task = tasks.find((t) => t.id === id);
    setActiveTask(task);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const task = tasks.find((task) => task.id === active.id);
    if (task.status === over.id) return;

    const currentColumn = COLUMNS.find((col) => col.id === task.status);
    const newColumn = COLUMNS.find((col) => col.id === over.id);

    if (newColumn.order < currentColumn.order) {
      showAlert({
        type: "error",
        title: "No puedes mover la tarea a una columna previa",
      });
      return;
    } else if (newColumn.order - currentColumn.order > 1) {
      showAlert({
        type: "error",
        title: "No puedes mover la tarea saltandote columnas",
      });
      return;
    } else if (newColumn.authRole !== user.role) {
      showAlert({
        type: "error",
        title: "No tienes permiso para mover esta tarea",
      });
      return;
    }

    dispatch(updateTask({ id: active.id, task: { status: over.id } }));
    setActiveTask(null);
  };

  const handleClick = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  return (
    <>
      <Typography variant="h4">Kanban Board</Typography>
      <Box sx={{ display: "flex", gap: "20px", mb: "20px" }}>
        <TextField
          label="Filter by task"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ width: "200px" }}
        />
        <TextField
          select
          label="Filter by username"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          sx={{ minWidth: "200px" }}
          slotProps={{
            select: {
              renderValue: (selected) => {
                if (selected === "all") return "All";

                return (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: "small",
                        mr: 1.5,
                        bgcolor: "primary.main",
                      }}
                    >
                      {getInitials(selected)}
                    </Avatar>
                    {selected}
                  </Box>
                );
              },
            },
          }}
        >
          <MenuItem value="all">All</MenuItem>
          {[...new Set(tasks.map((t) => t.assignee.name))].map((name) => (
            <MenuItem key={name} value={name}>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  fontSize: "small",
                  mr: "15px",
                  bgcolor: "primary.main",
                }}
              >
                {getInitials(name)}
              </Avatar>
              {name}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={openCreateModal}>
          CREATE TASK
        </Button>
      </Box>

      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Stack direction="row" spacing={2} sx={{ minHeight: "90%" }}>
          {COLUMNS.map((col) => (
            <BoardColumn key={col.id} id={col.id} title={col.title}>
              {tasks
                .filter((t) => t.status === col.id)
                .filter((t) =>
                  t.title.toLowerCase().includes(debouncedFilter.toLowerCase())
                )
                .filter((t) =>
                  selectedUser !== "all"
                    ? t.assignee.name === selectedUser
                    : true
                )
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    code={task.id.slice(0, 3).toUpperCase()}
                    assignee={task.assignee.name}
                    onClick={() => handleClick(task)}
                  />
                ))}
            </BoardColumn>
          ))}
        </Stack>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              title={activeTask.title}
              code={activeTask.id.slice(0, 3).toUpperCase()}
              assignee={activeTask.assignee.name}
              isActive
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskForm
        open={open}
        setOpen={setOpen}
        selectedTask={selectedTask}
        setSelectedTask={setSelectedTask}
      />
    </>
  );
}
