import dagre from "dagre";
import { useEffect } from "react";

import { Edge, Node, useNodesInitialized, useReactFlow } from "@xyflow/react";

// the layout direction (T = top, R = right, B = bottom, L = left, TB = top to bottom, ...)
export type Direction = "TB" | "LR" | "RL" | "BT";

function useLayout() {
  const { getNodes, getEdges, setNodes, setEdges } = useReactFlow();
  const nodesInitialized = useNodesInitialized();

  useEffect(() => {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    const nodes: Node[] = getNodes();
    const edges: Edge[] = getEdges();

    // only run the layout if there are nodes and they have been initialized with their dimensions
    if (!nodes.length || !nodesInitialized) {
      return;
    }

    dagreGraph.setGraph({
      rankdir: "LR",
      edgesep: 240,
      ranksep: 80,
      nodesep: 50,
      ranker: "longest-path",
    });

    nodes.forEach((node: Node) => {
      dagreGraph.setNode(node.id, {
        width: node.measured?.width ?? 0,
        height: node.measured?.height ?? 0,
      });
    });

    edges.forEach((edge: Edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    setNodes((nodes: Node[]) =>
      nodes.map((node) => {
        const { x, y } = dagreGraph.node(node.id);

        Object.assign(node, {
          position: { x, y },
          style: { opacity: 1 },
        });

        return { ...node };
      })
    );

    setEdges((edges) =>
      edges.map((edge) => ({ ...edge, style: { opacity: 1 } }))
    );
  }, [getNodes, getEdges, setNodes, setEdges, nodesInitialized]);
}

export default useLayout;
