import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchGetProfile, fetchLogin } from "../store/slices/authSlice";
import { useAlert } from "../hooks/useAlert";

const initialState = {
  email: "",
  password: "",
  role: "dev",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showAlert } = useAlert();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const { email, password, role } = form;

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async () => {
    try {
      const token = await dispatch(fetchLogin(form)).unwrap();
      await dispatch(fetchGetProfile({ token, role: form.role })).unwrap();
      navigate("/");
    } catch {
      showAlert({
        type: "error",
        title: "Credenciales incorrectas",
      });
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        spacing={5}
        sx={{ p: "50px", border: "1px solid", borderRadius: "20px" }}
      >
        <TextField
          name="email"
          value={email}
          label="Email"
          onChange={handleChange}
        />
        <TextField
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          label="Password"
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment>
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
          onChange={handleChange}
        />
        <TextField
          name="role"
          value={role}
          label="Rol"
          select
          onChange={handleChange}
        >
          <MenuItem value="dev">Developer</MenuItem>
          <MenuItem value="qa">QA</MenuItem>
        </TextField>
        <Button variant="contained" onClick={handleClick}>
          INICIAR SESION
        </Button>
      </Stack>
    </Box>
  );
}
