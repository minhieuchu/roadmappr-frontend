export type RoadmapDialogName = "AddNodeDialog" | "";

export type Roadmap = {
  _id: string;
  target: string;
  steps?: Roadmap[];
};

export interface RoadmapState {
  dialogName: RoadmapDialogName;
  roadmaps: Roadmap[];
  selectedRoadmap: Roadmap | null;
}

type Actions = {
  setDialogName: (name: RoadmapDialogName) => void;
  setRoadmaps: (roadmaps: Roadmap[]) => void;
  setSelectedRoadmap: (roadMap: Roadmap) => void;
};

export type RoadmapStoreType = RoadmapState & Actions;
