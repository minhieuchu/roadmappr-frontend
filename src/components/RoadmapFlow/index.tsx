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
import {
  selectRoadmaps,
  selectSelectedRoadmapId,
  setDialogName,
  useRoadmapStore,
} from "@/store";
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
import { EditDialog } from "@/components/Dialogs/EditDialog";

const nodeTypes = {
  CustomNode: CustomNode,
};

function RoadmapGrid() {
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);
  const roadmaps = useRoadmapStore(selectRoadmaps);
  const reactFlowInstance = useReactFlow();

  const { initialNodes, initialEdges } = useMemo(() => {
    const initialNodes: Node[] = [];
    const initialEdges: Edge[] = [];
    const selectedRoadmap = roadmaps.find(
      (roadmap) => roadmap._id === selectedRoadmapId
    );
    if (!selectedRoadmap) {
      return { initialNodes, initialEdges };
    }

    const parseRoadmap = (roadmap: Roadmap, isRoot: boolean) => {
      initialNodes.push({
        id: roadmap._id,
        type: "CustomNode",
        position: { x: 0, y: 0 },
        data: {
          _id: roadmap._id,
          target: roadmap.target,
          hasSource: !!roadmap.steps?.length,
          hasTarget: !isRoot,
        },
      });

      roadmap.steps?.forEach((step) => {
        initialEdges.push({
          id: `${roadmap._id}_${step._id}`,
          source: roadmap._id,
          target: step._id,
        });
        parseRoadmap(step, false);
      });
    };
    parseRoadmap(selectedRoadmap, true);

    return { initialNodes, initialEdges };
  }, [roadmaps, selectedRoadmapId]);

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
      <EditDialog />
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
