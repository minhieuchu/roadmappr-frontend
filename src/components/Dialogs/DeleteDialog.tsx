import axios from "axios";
import { useCallback, useMemo } from "react";

import {
  ButtonStyled,
  DialogContentStyled,
  DialogStyled,
} from "@/components/Dialogs/index.styles";
import { CustomNodeData } from "@/components/RoadmapFlow/CustomNode";
import {
  selectDialogName,
  selectRoadmaps,
  selectSelectedRoadmapId,
  selectSelectedStepId,
  setDialogName,
  setRoadmaps,
  setSelectedRoadmapId,
  setSelectedStepId,
  useRoadmapStore,
} from "@/store";
import { Roadmap, RoadmapDialogName } from "@/store/index.types";
import Button from "@mui/material/Button";
import { cyan } from "@mui/material/colors";
import DialogActions from "@mui/material/DialogActions";
import { useReactFlow } from "@xyflow/react";

export function DeleteDialog() {
  const reactFlow = useReactFlow<CustomNodeData>();
  const selectedDialogName = useRoadmapStore(selectDialogName);
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);
  const selectedStepId = useRoadmapStore(selectSelectedStepId);
  const roadmaps = useRoadmapStore(selectRoadmaps);

  const isOpen = useMemo(
    () => selectedDialogName === RoadmapDialogName.DeleteNode,
    [selectedDialogName],
  );

  const isDeletingRoadmap = useMemo(
    () => selectedRoadmapId === selectedStepId,
    [selectedRoadmapId, selectedStepId],
  );

  const onClose = useCallback(() => setDialogName(RoadmapDialogName.Empty), []);

  const deleteNodeHandler = useCallback(
    (deleteRecursive: boolean) => async () => {
      if (!selectedRoadmapId || !selectedStepId) {
        onClose();
        return;
      }

      if (selectedRoadmapId === selectedStepId) {
        try {
          const { data: deleteStatus } = await axios.delete<boolean>(
            `${import.meta.env.VITE_BACKEND_URL}/delete`,
            {
              data: {
                step_ids: [selectedStepId],
              },
            },
          );

          if (deleteStatus) {
            const updatedRoadmaps = roadmaps.filter(
              (roadmap) => roadmap._id !== selectedRoadmapId,
            );
            setRoadmaps(updatedRoadmaps);
            setSelectedStepId("");
            setSelectedRoadmapId(updatedRoadmaps[0]?._id ?? "");
          }
        } catch (e) {
          console.error(e);
        }
        onClose();
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
        const requestParams = {
          step_ids: stepIdsToRoot,
          ...(deleteRecursive && { delete_recursive: true }),
        };
        const { data: updatedRoadmap } = await axios.delete<Roadmap>(
          `${import.meta.env.VITE_BACKEND_URL}/delete`,
          {
            data: requestParams,
          },
        );

        const updatedRoadmaps = roadmaps.map((roadmap) =>
          roadmap._id === selectedRoadmapId ? updatedRoadmap : roadmap,
        );
        setRoadmaps(updatedRoadmaps);
      } catch (e) {
        console.error(e);
      }
      onClose();
    },
    [onClose, roadmaps, reactFlow, selectedRoadmapId, selectedStepId],
  );

  return (
    <DialogStyled onClose={onClose} open={isOpen} transitionDuration={300}>
      <DialogContentStyled>
        {isDeletingRoadmap ? (
          <p>Delete this roadmap entirely?</p>
        ) : (
          <>
            <div onClick={deleteNodeHandler(false)}>Delete this step only</div>
            <div onClick={deleteNodeHandler(true)}>
              Delete this step and all steps below
            </div>
          </>
        )}
      </DialogContentStyled>
      <DialogActions sx={{ padding: "0.5rem 1.5rem" }}>
        <Button sx={{ color: cyan[500] }} onClick={onClose}>
          {"Cancel"}
        </Button>
        <ButtonStyled variant="contained" onClick={deleteNodeHandler(true)}>
          {"Delete"}
        </ButtonStyled>
      </DialogActions>
    </DialogStyled>
  );
}
