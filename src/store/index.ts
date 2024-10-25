export type RoadMapprDialogName = "AddNodeDialog" | "";

export interface RoadMapprState {
  dialogName: RoadMapprDialogName;
}

type Actions = {
  setDialogName: (name: RoadMapprDialogName) => void;
};

export type RoadMapprStoreType = RoadMapprState & Actions;
