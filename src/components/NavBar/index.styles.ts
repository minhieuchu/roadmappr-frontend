import { pink } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const NavBarContainer = styled("div")(({ theme }) => ({
  width: "100vw",
  height: "4rem",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  justifyContent: "center",
  padding: "0 0.5rem",
  borderBottom: `1px solid ${theme.palette.grey[300]}`,
  boxSizing: "border-box",

  "& > div:first-of-type": {
    maxWidth: "82rem",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export const NavBarItem = styled("div")({
  height: "100%",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 0.75rem",
  borderRadius: "0.25rem",
  boxSizing: "border-box",
  cursor: "pointer",
  transition: "0.3s",

  svg: {
    fontSize: "2.25rem",
    color: pink[500],
  },

  span: { fontSize: "1.25rem", fontWeight: 600 },

  "&:hover": {
    backgroundColor: pink[50],
  },
});
