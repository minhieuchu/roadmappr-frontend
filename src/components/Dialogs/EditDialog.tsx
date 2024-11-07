import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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
import { CustomNodeData } from "@/components/RoadmapFlow/CustomNode";

export function EditDialog() {
  const reactFlow = useReactFlow<CustomNodeData>();
  const [input, setInput] = useState("");
  const selectedDialogName = useRoadmapStore(selectDialogName);
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);
  const selectedStepId = useRoadmapStore(selectSelectedStepId);
  const roadmaps = useRoadmapStore(selectRoadmaps);

  const isOpen = useMemo(
    () => selectedDialogName === "EditNodeDialog",
    [selectedDialogName]
  );

  const editNode = useMemo(
    () => reactFlow.getNode(selectedStepId),
    [reactFlow, selectedStepId]
  );

  useEffect(() => {
    setInput(editNode?.data.target ?? "");
  }, [editNode]);

  const onClose = useCallback(() => setDialogName(""), []);
  const onInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInput(event.target.value);
    },
    []
  );
  const onSubmit = useCallback(async () => {
    if (!selectedRoadmapId || !selectedStepId) {
      return;
    }
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

    stepIdsToRoot.reverse();

    try {
      const { data: updatedRoadmap } = await axios.patch<Roadmap>(
        `${import.meta.env.VITE_BACKEND_URL}/update`,
        {
          step_ids: stepIdsToRoot,
          target: input,
        }
      );
      const updatedRoadmaps = roadmaps.map((roadmap) =>
        roadmap._id === selectedRoadmapId ? updatedRoadmap : roadmap
      );
      setRoadmaps(updatedRoadmaps);
    } catch (e) {
      console.error(e);
    }
    onClose();
    setInput("");
    setSelectedStepId("");
  }, [input, onClose, reactFlow, roadmaps, selectedRoadmapId, selectedStepId]);

  return (
    <DialogStyled onClose={onClose} open={isOpen} transitionDuration={300}>
      <DialogTitle sx={{ color: cyan[500] }}>Edit</DialogTitle>
      <DialogContent>
        <TextFieldStyled
          value={input}
          variant="standard"
          sx={{ width: "100%", fontWeight: 300 }}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions sx={{ padding: "0.5rem 1.5rem" }}>
        <Button
          disabled={!input.length}
          sx={{ color: cyan[500] }}
          onClick={onSubmit}
        >
          {"Submit"}
        </Button>
      </DialogActions>
    </DialogStyled>
  );
}
