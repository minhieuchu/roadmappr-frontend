import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  Roadmap,
  RoadmapDialogName,
  RoadmapState,
  RoadmapStoreType,
} from "@/store/index.types";

const tmp: Roadmap = {
  _id: "0",
  target: "First target",
  steps: [
    { _id: "1", target: "second target", steps: [] },
    {
      _id: "2",
      target: "3rd target",
      steps: [{ _id: "3", target: "4th target", steps: [] }],
    },
  ],
};

export const useRoadmapStore = create(
  persist(
    immer<RoadmapStoreType>((set) => ({
      dialogName: "",
      roadMap: tmp,

      setDialogName: (name: RoadmapDialogName) => {
        set((state) => {
          state.dialogName = name;
        });
      },

      setRoadmap: (roadMap: Roadmap) => {
        set((state) => {
          state.roadMap = roadMap;
        });
      },
    })),
    {
      name: "RoadmapStorage",
    }
  )
);

export const selectDialogName = (state: RoadmapState) => state.dialogName;
export const selectRoadmap = (state: RoadmapState) => state.roadMap;

export const { setDialogName, setRoadmap } = useRoadmapStore.getState();
