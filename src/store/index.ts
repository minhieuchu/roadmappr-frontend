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
      dialogName: "",
      roadmaps: [],
      selectedRoadmap: null,

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

      setSelectedRoadmap: (roadMap: Roadmap) => {
        set((state) => {
          state.selectedRoadmap = roadMap;
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
export const selectSelectedRoadmap = (state: RoadmapState) =>
  state.selectedRoadmap;

export const { setDialogName, setRoadmaps, setSelectedRoadmap } =
  useRoadmapStore.getState();
