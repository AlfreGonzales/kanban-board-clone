import {
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
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../store/slices/tasksSlice";

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

export default function TaskForm({ open, setOpen }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialState);
  const { title, description, assignee } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    dispatch(createTask(form));
  };

  const handleClose = () => {
    setOpen(false);
    setForm(initialState);
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
              />
              <TextField
                name="description"
                value={description}
                label="Description"
                multiline
                rows={4}
                onChange={handleChange}
              />
              <TextField
                name="assignee"
                value={assignee}
                label="Assignee"
                select
                onChange={handleChange}
              >
                <MenuItem value="value">label</MenuItem>
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
                onClick={handleClick}
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
