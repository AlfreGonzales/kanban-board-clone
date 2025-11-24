import { Stack, Typography } from "@mui/material";
import BoardColumn from "../components/BoardColumn";
import { COLUMNS } from "../constants/COLUMNS";

export default function MainPage() {
  return (
    <>
      <Typography variant="h4">Kanban Board</Typography>
      <Stack direction="row" spacing={2} sx={{ minHeight: "100%" }}>
        {COLUMNS.map((col) => (
          <BoardColumn key={col.id} title={col.title}></BoardColumn>
        ))}
      </Stack>
    </>
  );
}
