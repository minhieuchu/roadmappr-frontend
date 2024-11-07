import { cyan } from "@mui/material/colors";
import Dialog from "@mui/material/Dialog";
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
