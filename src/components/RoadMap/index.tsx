import { useCallback } from "react";

import { AddDialog } from "@/components/Dialogs/AddDialog";
import {
  AddButtonContainer,
  FlowContainer,
} from "@/components/RoadMap/index.styles";
import { LeftPanel } from "@/components/RoadMap/LeftPanel";
import { TopPanel } from "@/components/RoadMap/TopPanel";
import { setDialogName } from "@/store/index.types";
import AddIcon from "@mui/icons-material/Add";
import { Background, BackgroundVariant, ReactFlow } from "@xyflow/react";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export function RoadMap() {
  const onClick = useCallback(() => {
    setDialogName("AddNodeDialog");
  }, []);
  return (
    <>
      <TopPanel />
      <LeftPanel />
      <FlowContainer>
        <AddDialog />
        <AddButtonContainer onClick={onClick}>
          <AddIcon />
          {"Add"}
        </AddButtonContainer>
        <ReactFlow
          nodes={initialNodes}
          edges={initialEdges}
          style={{ borderBottomLeftRadius: "1rem" }}
        >
          <Background variant={BackgroundVariant.Dots} gap={20} size={1.25} />
        </ReactFlow>
      </FlowContainer>
    </>
  );
}
