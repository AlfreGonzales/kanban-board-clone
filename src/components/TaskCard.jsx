import { Avatar, Card, Stack, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useDraggable } from "@dnd-kit/core";

export default function TaskCard({
  id,
  title,
  code,
  assignee,
  isActive = false,
  onClick,
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging && !isActive ? 0 : 1,
      }
    : undefined;

  return (
    <Card
      ref={setNodeRef}
      sx={{ ...style, width: "300px", p: "16px", cursor: "pointer" }}
      onClick={onClick}
    >
      <Typography sx={{ cursor: "grab" }} {...listeners} {...attributes}>
        {title}
      </Typography>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <BookmarkBorderIcon fontSize="small" color="secondary" />
          <Typography fontSize="small">COD-{code}</Typography>
        </Stack>

        <Stack direction="row" spacing={1}>
          <DragHandleIcon color="secondary" />
          <Avatar sx={{ width: 24, height: 24, fontSize: "small" }}>
            {assignee}
          </Avatar>
        </Stack>
      </Stack>
    </Card>
  );
}
