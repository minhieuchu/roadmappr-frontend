import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";

export const DialogStyled = styled(Dialog)({
  ".MuiDialog-paper[role='dialog']": {
    width: "36rem",
    padding: "1rem",
    borderRadius: "0.5rem",
  },
});

export const TextFieldStyled = styled(TextField)({
  ".MuiInput-root": {
    fontWeight: 300,
  },
});
