import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  Roadmap,
  RoadmapDialogName,
  RoadmapState,
  RoadmapStoreType,
} from "@/store/index.types";

export const useRoadmapStore = create(
  persist(
    immer<RoadmapStoreType>((set) => ({
      dialogName: RoadmapDialogName.None,
      roadmaps: [],
      selectedRoadmapId: "",
      selectedStepId: "",

      setDialogName: (name: RoadmapDialogName) => {
        set((state) => {
          state.dialogName = name;
        });
      },

      setRoadmaps: (roadMaps: Roadmap[]) => {
        set((state) => {
          state.roadmaps = roadMaps;
        });
      },

      setSelectedRoadmapId: (roadmapId: string) => {
        set((state) => {
          state.selectedRoadmapId = roadmapId;
        });
      },

      setSelectedStepId: (stepId: string) => {
        set((state) => {
          state.selectedStepId = stepId;
        });
      },
    })),
    {
      name: "RoadmapStorage",
    },
  ),
);

export const selectDialogName = (state: RoadmapState) => state.dialogName;
export const selectRoadmaps = (state: RoadmapState) => state.roadmaps;
export const selectSelectedRoadmapId = (state: RoadmapState) =>
  state.selectedRoadmapId;
export const selectSelectedStepId = (state: RoadmapState) =>
  state.selectedStepId;

export const {
  setDialogName,
  setRoadmaps,
  setSelectedRoadmapId,
  setSelectedStepId,
} = useRoadmapStore.getState();
