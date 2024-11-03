import { useCallback, useEffect, useMemo } from "react";

import { AddDialog } from "@/components/Dialogs/AddDialog";
import { CustomNode } from "@/components/RoadmapFlow/CustomNode";
import {
  AddButtonContainer,
  RoadmapGridContainer,
} from "@/components/RoadmapFlow/index.styles";
import { LeftPanel } from "@/components/RoadmapFlow/LeftPanel";
import { TopPanel } from "@/components/RoadmapFlow/TopPanel";
import useLayout from "@/components/RoadmapFlow/useLayout";
import { selectSelectedRoadmap, setDialogName, useRoadmapStore } from "@/store";
import { Roadmap } from "@/store/index.types";
import AddIcon from "@mui/icons-material/Add";
import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";

const nodeTypes = {
  CustomNode: CustomNode,
};

function RoadmapGrid() {
  const selectedRoadmap = useRoadmapStore(selectSelectedRoadmap);
  const reactFlowInstance = useReactFlow();

  const { initialNodes, initialEdges } = useMemo(() => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];

    const parseRoadmap = (roadmap: Roadmap | null) => {
      if (!roadmap) {
        return;
      }
      initialNodes.push({
        id: roadmap._id,
        type: "CustomNode",
        position: { x: 0, y: 0 },
        data: { target: roadmap.target },
      });

      roadmap.steps?.forEach((step) => {
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

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.3 });
    }, 100);
  }, [initialNodes, setNodes, reactFlowInstance]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  const onAddButtonClick = useCallback(() => {
    setDialogName("AddNodeDialog");
  }, []);

  const onReactFlowInit = useCallback(() => {
    setTimeout(() => {
      reactFlowInstance.fitView({ padding: 0.3 });
    });
  }, [reactFlowInstance]);

  useLayout();

  return (
    <RoadmapGridContainer>
      <AddDialog />
      {!nodes.length && (
        <AddButtonContainer onClick={onAddButtonClick}>
          <AddIcon />
          {"Add"}
        </AddButtonContainer>
      )}
      <ReactFlow
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodes={nodes}
        edges={edges}
        onInit={onReactFlowInit}
      >
        <Background
          bgColor="#272038"
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1.25}
        />
      </ReactFlow>
    </RoadmapGridContainer>
  );
}

export function RoadmapFlow() {
  return (
    <ReactFlowProvider>
      <TopPanel />
      <LeftPanel />
      <RoadmapGrid />
    </ReactFlowProvider>
  );
}
