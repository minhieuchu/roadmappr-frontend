import { useCallback, useMemo } from "react";

import { AddDialog } from "@/components/Dialogs/AddDialog";
import { CustomNode } from "@/components/RoadmapFlow/CustomNode";
import {
  AddButtonContainer,
  FlowContainer,
} from "@/components/RoadmapFlow/index.styles";
import { LeftPanel } from "@/components/RoadmapFlow/LeftPanel";
import { TopPanel } from "@/components/RoadmapFlow/TopPanel";
import { selectRoadmap, setDialogName, useRoadmapStore } from "@/store";
import { Roadmap } from "@/store/index.types";
import AddIcon from "@mui/icons-material/Add";
import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

const nodeTypes = {
  CustomNode: CustomNode,
};

export function RoadmapFlow() {
  const selectedRoadmap = useRoadmapStore(selectRoadmap);
  const { initialNodes, initialEdges } = useMemo(() => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    const parseRoadmap = (roadmap: Roadmap) => {
      initialNodes.push({
        id: roadmap._id,
        type: "CustomNode",
        position: { x: 0, y: 0 },
        data: { target: roadmap.target },
      });

      roadmap.steps.forEach((step) => {
        initialEdges.push({
          id: `${roadmap._id}_${step._id}`,
          source: roadmap._id,
          target: step._id,
        });
        parseRoadmap(step);
      });
    };

    parseRoadmap(selectedRoadmap);

    return { initialNodes, initialEdges };
  }, [selectedRoadmap]);
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);
  const onAddButtonClick = useCallback(() => {
    setDialogName("AddNodeDialog");
  }, []);

  return (
    <>
      <TopPanel />
      <LeftPanel />
      <FlowContainer>
        <AddDialog />
        <AddButtonContainer onClick={onAddButtonClick}>
          <AddIcon />
          {"Add"}
        </AddButtonContainer>
        <ReactFlow
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodes={nodes}
          edges={edges}
          style={{ borderBottomLeftRadius: "1rem" }}
        >
          <Background
            bgColor="#272038"
            variant={BackgroundVariant.Dots}
            gap={20}
            size={1.25}
          />
        </ReactFlow>
      </FlowContainer>
    </>
  );
}
