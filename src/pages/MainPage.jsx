import { Button, Stack, Typography } from "@mui/material";
import BoardColumn from "../components/BoardColumn";
import { COLUMNS } from "../constants/COLUMNS";
import { useDispatch, useSelector } from "react-redux";
import TaskCard from "../components/TaskCard";
import { useState } from "react";
import TaskForm from "../components/TaskForm";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { updateTask } from "../store/slices/tasksSlice";
import { getInitials } from "../shared/getInitials";
import { useAlert } from "../hooks/useAlert";

export default function MainPage() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { showAlert } = useAlert();

  const [open, setOpen] = useState(false);
  const { tasks } = useSelector((state) => state.tasks);
  const [activeTask, setActiveTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

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
      <Button variant="contained" onClick={openCreateModal}>
        CREATE TASK
      </Button>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <Stack direction="row" spacing={2} sx={{ minHeight: "100%" }}>
          {COLUMNS.map((col) => (
            <BoardColumn key={col.id} id={col.id} title={col.title}>
              {tasks
                .filter((t) => t.status === col.id)
                .map((task) => (
                  <TaskCard
                    key={task.id}
                    id={task.id}
                    title={task.title}
                    code={task.id.slice(0, 3).toUpperCase()}
                    assignee={getInitials(task.assignee.name)}
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
              assignee={getInitials(activeTask.assignee.name)}
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
