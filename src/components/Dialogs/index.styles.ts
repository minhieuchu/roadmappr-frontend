import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

export const DialogStyled = styled(Dialog)({
  ".MuiDialog-paper[role='dialog']": {
    width: "36rem",
    padding: "1rem",
    border: `2px solid ${cyan[700]}`,
    borderRadius: "0.5rem",
    backgroundColor: "#1d1335",
  },
});

export const TextFieldStyled = styled(TextField)({
  input: {
    fontWeight: 300,
    color: "whitesmoke",
  },
  ".MuiInput-root::after": {
    transform: "scaleX(1) translateX(0)",
  },
});

export const DialogContentStyled = styled(DialogContent)({
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  color: "white",
  fontSize: "1.125rem",
  fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",

  "& > div": {
    flex: 1,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    lineHeight: "1.5rem",
    height: "7rem",
    padding: "1rem",
    backgroundColor: cyan[600],
    borderRadius: "0.5rem",
    boxSizing: "border-box",
    cursor: "pointer",
    transition: "0.3s",

    "&:hover": {
      backgroundColor: cyan[700],
    },
  },

  "& > p": {
    margin: "0.5rem",
  },
});

export const ButtonStyled = styled(Button)({
  backgroundColor: cyan[600],
  transition: "0.3s",
  "&:hover": {
    opacity: 0.9,
  },
});
