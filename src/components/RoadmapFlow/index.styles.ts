import { cyan, teal } from "@mui/material/colors";
import Popover from "@mui/material/Popover";
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

export const LeftPanelContainer = styled("div")({
  position: "fixed",
  top: "50%",
  left: 0,
  transform: "translateY(-50%)",
  width: "4rem",
  height: "20rem",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1.5rem 1rem",
  borderTopRightRadius: "1.25rem",
  borderBottomRightRadius: "1.25rem",
  backgroundColor: "#141020",
  boxSizing: "border-box",
  zIndex: 1,

  "& > svg": {
    color: "white",
    fontSize: "1.75rem",
    cursor: "pointer",
  },
});

export const PopoverStyled = styled(Popover)({
  ".MuiPaper-root": {
    borderRadius: "1.25rem",
  },
});

export const LeftPanelPopeverContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  width: "12rem",
  height: "20rem",
  padding: "1.5rem 0",
  color: "white",
  backgroundColor: "#141020",
  borderRadius: "1rem",
  boxSizing: "border-box",

  "& > div": {
    display: "flex",
    alignItems: "center",
    height: "2rem",
    padding: "0 1.5rem",
    transition: "0.2s",
    cursor: "pointer",

    "&:hover": {
      color: cyan[500],
    },

    "&.selected": {
      color: cyan[500],
    },
  },
});

export const RoadmapGridContainer = styled("div")({
  position: "fixed",
  top: "3.5rem",
  left: 0,
  width: "100vw",
  height: "calc(100vh - 3.5rem)",
});

export const AddButtonContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: "2rem",
  right: "2.5rem",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  color: theme.palette.common.white,
  fontSize: "1.125rem",
  padding: "0.4rem 1.5rem",
  paddingLeft: "1rem",
  border: `2px solid ${cyan[600]}`,
  borderRadius: "0.75rem",
  backgroundColor: "#272038",
  cursor: "pointer",
  zIndex: 1,
}));

export const CustomNodeContainer = styled("div")({
  width: "10rem",
  height: "4rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "white",
  border: `2px solid ${cyan[600]}`,
  borderRadius: "0.5rem",
});
