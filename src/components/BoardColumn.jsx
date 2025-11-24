import { Card, Stack, Typography } from "@mui/material";

export default function BoardColumn({ title, children }) {
  return (
    <Card sx={{ width: "332px", p: "16px", minHeight: "100%" }}>
      <Typography sx={{ mb: "16px" }}>{title}</Typography>
      <Stack spacing={1}>{children}</Stack>
    </Card>
  );
}
