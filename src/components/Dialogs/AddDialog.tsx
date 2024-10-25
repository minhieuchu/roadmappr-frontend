import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";

import {
  DialogStyled,
  TextFieldStyled,
} from "@/components/Dialogs/index.styles";
import {
  selectDialogName,
  setDialogName,
  useRoadMapprStore,
} from "@/store/index.types";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import DialogTitle from "@mui/material/DialogTitle";

export function AddDialog() {
  const [input, setInput] = useState("");
  const selectedDialogName = useRoadMapprStore(selectDialogName);
  const isOpen = useMemo(
    () => selectedDialogName === "AddNodeDialog",
    [selectedDialogName]
  );
  const onClose = useCallback(() => setDialogName(""), []);
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );
  const onSubmit = useCallback(() => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/create`, { target: input });
    onClose();
  }, [input, onClose]);

  return (
    <DialogStyled onClose={onClose} open={isOpen} transitionDuration={300}>
      <DialogTitle sx={{ color: cyan[800] }}>Tell us your goal</DialogTitle>
      <DialogContent>
        <TextFieldStyled
          value={input}
          variant="standard"
          sx={{ width: "100%", fontWeight: 300 }}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0.5rem 1.5rem" }}>
        <Button disabled={!input.length} onClick={onSubmit}>
          {"Let's go"}
        </Button>
      </DialogActions>
    </DialogStyled>
  );
}
