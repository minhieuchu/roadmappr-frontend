import { CustomNodeContainer } from "@/components/RoadmapFlow/index.styles";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type CustomNodeData = Node<{ target: string }, "target">;

export function CustomNode({ data }: NodeProps<CustomNodeData>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <CustomNodeContainer> {data.target} </CustomNodeContainer>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
