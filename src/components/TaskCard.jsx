import { Avatar, Card, Stack, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DragHandleIcon from "@mui/icons-material/DragHandle";

export default function TaskCard({ title, code, assignee }) {
  return (
    <Card sx={{ width: "300px", p: "16px" }}>
      <Typography>{title}</Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <BookmarkBorderIcon fontSize="small" color="secondary" />
          <Typography fontSize="small">{code}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <DragHandleIcon color="secondary" />
          <Avatar sx={{ width: 24, height: 24 }}>{assignee}</Avatar>
        </Stack>
      </Stack>
    </Card>
  );
}
