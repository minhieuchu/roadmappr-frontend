import axios from "axios";
import React, { useCallback, useMemo, useState } from "react";

import {
  DialogStyled,
  TextFieldStyled,
} from "@/components/Dialogs/index.styles";
import {
  selectDialogName,
  selectRoadmaps,
  selectSelectedRoadmapId,
  selectSelectedStepId,
  setDialogName,
  setRoadmaps,
  setSelectedStepId,
  useRoadmapStore,
} from "@/store";
import { Roadmap } from "@/store/index.types";
import { DialogActions, DialogContent } from "@mui/material";
import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactFlow } from "@xyflow/react";

export function AddDialog() {
  const reactFlow = useReactFlow();
  const [input, setInput] = useState("");
  const selectedDialogName = useRoadmapStore(selectDialogName);
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);
  const selectedStepId = useRoadmapStore(selectSelectedStepId);
  const roadmaps = useRoadmapStore(selectRoadmaps);

  const isOpen = useMemo(
    () => selectedDialogName === "AddNodeDialog",
    [selectedDialogName]
  );
  const dialogTitle = useMemo(
    () => (selectedStepId ? "Tell us your next step" : "Tell us your goal"),
    [selectedStepId]
  );
  const onClose = useCallback(() => setDialogName(""), []);
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );
  const onSubmit = useCallback(async () => {
    try {
      if (selectedRoadmapId && selectedStepId) {
        const edges = reactFlow.getEdges();
        const stepIdsToRoot = [selectedStepId];
        let currentStepId = selectedStepId;

        while (true) {
          const edge = edges.find((edge) => edge.target === currentStepId);
          if (!edge) {
            break;
          }
          stepIdsToRoot.push(edge.source);
          if (edge.source === selectedRoadmapId) {
            break;
          }
          currentStepId = edge.source;
        }

        const { data: updatedRoadmap } = await axios.post<Roadmap>(
          `${import.meta.env.VITE_BACKEND_URL}/create`,
          {
            step_ids: stepIdsToRoot.reverse(),
            target: input,
          }
        );
        const updatedRoadmaps = roadmaps.map((roadmap) =>
          roadmap._id === selectedRoadmapId ? updatedRoadmap : roadmap
        );
        setRoadmaps(updatedRoadmaps);
      } else {
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/create`, {
          target: input,
        });
      }
    } catch (e) {
      console.error(e);
    }
    onClose();
    setInput("");
    setSelectedStepId("");
  }, [input, onClose, reactFlow, roadmaps, selectedRoadmapId, selectedStepId]);

  return (
    <DialogStyled onClose={onClose} open={isOpen} transitionDuration={300}>
      <DialogTitle sx={{ color: cyan[800] }}>{dialogTitle}</DialogTitle>
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
