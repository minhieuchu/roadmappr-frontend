import { CustomNodeContainer } from "@/components/RoadMap/index.styles";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

type CustomNodeData = Node<{ target: string }, "target">;

export function CustomNode({ data }: NodeProps<CustomNodeData>) {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <CustomNodeContainer> {data.target} </CustomNodeContainer>
      <Handle type="source" position={Position.Right} />
    </>
  );
}
