import { useCallback } from "react";

import { AddDialog } from "@/components/Dialogs/AddDialog";
import { CustomNode } from "@/components/RoadMap/CustomNode";
import {
  AddButtonContainer,
  FlowContainer,
} from "@/components/RoadMap/index.styles";
import { LeftPanel } from "@/components/RoadMap/LeftPanel";
import { TopPanel } from "@/components/RoadMap/TopPanel";
import { setDialogName } from "@/store/index.types";
import AddIcon from "@mui/icons-material/Add";
import {
  Background,
  BackgroundVariant,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

const nodeTypes = {
  CustomNode: CustomNode,
};

const initialNodes = [
  {
    id: "1",
    type: "CustomNode",
    position: { x: 0, y: 0 },
    data: { target: "First target" },
  },
  {
    id: "2",
    type: "CustomNode",
    position: { x: 250, y: 50 },
    data: { target: "Second target" },
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function RoadMap() {
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
