import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const NavBarContainer = styled("div")({
  width: "100vw",
  height: "4rem",
  display: "flex",
  justifyContent: "center",
  padding: "0 0.5rem",
  boxSizing: "border-box",

  "& > div:first-of-type": {
    maxWidth: "82rem",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export const NavBarItem = styled("div")({
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.25rem",
  boxSizing: "border-box",
  cursor: "pointer",

  svg: {
    fontSize: "2.25rem",
    color: pink[500],
  },

  span: { fontSize: "1.25rem", fontWeight: 600 },
});
