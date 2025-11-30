import { useDroppable } from "@dnd-kit/core";
import { Card, Stack, Typography } from "@mui/material";

export default function BoardColumn({ id, title, children }) {
  const { isOver, setNodeRef } = useDroppable({ id: id });

  const style = {
    transform: isOver ? "scale(1.025)" : undefined,
    transition: "transform 0.3s ease",
  };

  return (
    <Card
      ref={setNodeRef}
      sx={{ ...style, width: "332px", p: "16px", minHeight: "100%" }}
    >
      <Typography sx={{ mb: "16px" }}>{title}</Typography>
      <Stack spacing={1}>{children}</Stack>
    </Card>
  );
}
