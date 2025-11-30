import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Modal,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createTask, updateTask } from "../store/slices/tasksSlice";
import { getUsers } from "../services/userService";
import { getInitials } from "../shared/getInitials";
import { useAlert } from "../hooks/useAlert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "800px",
};

const initialState = {
  title: "",
  description: "",
  assignee: "",
};

export default function TaskForm({
  open,
  setOpen,
  selectedTask,
  setSelectedTask,
}) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(
    selectedTask
      ? {
          title: selectedTask.title,
          description: selectedTask.description,
          assignee: selectedTask.assignee.id,
        }
      : initialState
  );
  const { title, description, assignee } = form;
  const [errors, setErrors] = useState({});
  const { showAlert } = useAlert();

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    getUsers()
      .then((data) => setUserList(data))
      .catch((error) => console.error("error loading users", error));
  }, []);

  useEffect(() => {
    setForm(
      selectedTask
        ? {
            title: selectedTask.title,
            description: selectedTask.description,
            assignee: selectedTask.assignee.id,
          }
        : initialState
    );
  }, [selectedTask]);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSave = () => {
    if (!validate()) return;

    const { id, name } = userList.find((user) => user.id === form.assignee);
    const assignee = { id, name };

    if (!selectedTask) {
      dispatch(createTask({ ...form, assignee }));
    } else {
      dispatch(
        updateTask({ id: selectedTask.id, task: { ...form, assignee } })
      );
    }
    showAlert({
      type: "success",
      title: "Tarea guardada correctamente",
    });
    setOpen(false);
    setForm(initialState);
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialState);
    setErrors({});
    setSelectedTask(null);
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title.trim()) newErrors.title = "El título es obligatorio";
    if (!form.description.trim())
      newErrors.description = "La descripción es obligatoria";
    if (!form.assignee) newErrors.assignee = "Debes seleccionar un usuario";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                name="title"
                value={title}
                label="Title"
                onChange={handleChange}
                error={Boolean(errors.title)}
                helperText={errors.title}
              />
              <TextField
                name="description"
                value={description}
                label="Description"
                multiline
                rows={4}
                onChange={handleChange}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
              <TextField
                name="assignee"
                value={assignee}
                label="Assignee"
                select
                onChange={handleChange}
                error={Boolean(errors.assignee)}
                helperText={errors.assignee}
                slotProps={{
                  select: {
                    renderValue: (selected) => {
                      const user = userList.find((u) => u.id === selected);
                      if (!user) return "";

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
                            {getInitials(user.name)}
                          </Avatar>
                          {user.name}
                        </Box>
                      );
                    },
                  },
                }}
              >
                {userList.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: "small",
                        mr: 1.5,
                        bgcolor: "primary.main",
                      }}
                    >
                      {getInitials(user.name)}
                    </Avatar>
                    {user.name}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="outlined"
                color="error"
                startIcon={<CloseIcon />}
                onClick={handleClose}
              >
                CANCEL
              </Button>
              <Button
                variant="contained"
                startIcon={<SaveIcon />}
                onClick={handleSave}
              >
                SAVE
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Modal>
    </div>
  );
}
