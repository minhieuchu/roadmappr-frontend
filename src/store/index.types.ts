export type RoadmapDialogName = "AddNodeDialog" | "";

export type Roadmap = {
  _id: string;
  target: string;
  steps: Roadmap[];
};

export interface RoadmapState {
  dialogName: RoadmapDialogName;
  roadMap: Roadmap;
}

type Actions = {
  setDialogName: (name: RoadmapDialogName) => void;
  setRoadmap: (roadMap: Roadmap) => void;
};

export type RoadmapStoreType = RoadmapState & Actions;
