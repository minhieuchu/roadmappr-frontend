import { cyan, teal } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

export const TopPanelContainer = styled("div")({
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "3.5rem",
  display: "flex",
  alignItems: "center",
  padding: "0 1.25rem",
  backgroundImage: `linear-gradient(to right, ${teal[300]}, ${cyan[600]}, ${teal[800]})`,

  svg: {
    color: "white",
    cursor: "pointer",
  },
});

export const LeftPanelContainer = styled("div")(({ theme }) => ({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100vw",
  height: "calc(100vh - 3.5rem)",
  borderRight: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[200],
}));

export const FlowContainer = styled("div")({
  position: "fixed",
  top: "3.5rem",
  left: "4rem",
  width: "calc(100vw - 4rem)",
  height: "calc(100vh - 4.25rem)",
  backgroundColor: "white",
  borderBottomLeftRadius: "1rem",
  zIndex: 1,
});

export const AddButtonContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "2rem",
  right: "2.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: theme.palette.text.secondary,
  fontSize: "1.125rem",
  padding: "0.4rem 1.5rem",
  paddingLeft: "1rem",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "0.75rem",
  backgroundColor: theme.palette.grey[50],
  cursor: "pointer",
  zIndex: 1,
}));
