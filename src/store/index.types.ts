export type RoadmapDialogName = "AddNodeDialog" | "";

export type Roadmap = {
  _id: string;
  target: string;
  steps?: Roadmap[];
};

export interface RoadmapState {
  dialogName: RoadmapDialogName;
  roadmaps: Roadmap[];
  selectedRoadmapId: string;
  selectedStepId: string;
}

type Actions = {
  setDialogName: (name: RoadmapDialogName) => void;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  setSelectedRoadmapId: (roadmapId: string) => void;
  setSelectedStepId: (stepId: string) => void;
};

export type RoadmapStoreType = RoadmapState & Actions;
