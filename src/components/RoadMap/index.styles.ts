import { styled } from "@mui/material/styles";

export const TopPanelContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "3.75rem",
  display: "flex",
  alignItems: "center",
  padding: "0 1.25rem",
  backgroundImage: `linear-gradient(to right, #ffc0cb, #ff1493, #d80073)`,

  svg: {
    color: "white",
    cursor: "pointer",
  },
});

export const LeftPanelContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "3.75rem",
  left: 0,
  width: "4rem",
  height: "calc(100vh - 3.75rem)",
  backgroundColor: theme.palette.grey[200],
}));
