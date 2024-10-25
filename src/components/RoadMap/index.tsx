import { AddButton } from "@/components/RoadMap/AddButton";
import { FlowContainer } from "@/components/RoadMap/index.styles";
import { LeftPanel } from "@/components/RoadMap/LeftPanel";
import { TopPanel } from "@/components/RoadMap/TopPanel";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function RoadMap() {
  return (
    <>
      <TopPanel />
      <LeftPanel />
      <FlowContainer>
        <AddButton />
        <ReactFlow nodes={initialNodes} edges={initialEdges}>
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        </ReactFlow>
      </FlowContainer>
    </>
  );
}
