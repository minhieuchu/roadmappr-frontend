import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import {
  RoadMapprDialogName,
  RoadMapprState,
  RoadMapprStoreType,
} from "@/store";

export const useRoadMapprStore = create(
  persist(
    immer<RoadMapprStoreType>((set) => ({
      dialogName: "",

      setDialogName: (name: RoadMapprDialogName) => {
        set((state) => {
          state.dialogName = name;
        });
      },
    })),
    {
      name: "RoadMapprStorage",
    },
  ),
);

export const selectDialogName = (state: RoadMapprState) => state.dialogName;

export const { setDialogName } = useRoadMapprStore.getState();
