import { useCallback, useState } from "react";

import {
  CustomNodeContainer,
  MenuStyled,
} from "@/components/RoadmapFlow/index.styles";
import { setDialogName, setSelectedStepId } from "@/store";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import { Handle, Node, NodeProps, Position } from "@xyflow/react";

export type CustomNodeData = Node<
  { _id: string; target: string; hasSource: boolean; hasTarget: boolean },
  "_id" | "target" | "hasSource" | "hasTarget"
>;

export function CustomNode({ data }: NodeProps<CustomNodeData>) {
  const [anchorEl, setAnchorEl] = useState<SVGSVGElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleIconClick = useCallback(
    (event: React.MouseEvent<SVGSVGElement>) => {
      setAnchorEl(event.currentTarget);
    },
    []
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleAddStepOptionClick = useCallback(() => {
    setDialogName("AddNodeDialog");
    setSelectedStepId(data._id);
    handleMenuClose();
  }, [data._id, handleMenuClose]);

  const handleEditOptionClick = useCallback(() => {
    setDialogName("EditNodeDialog");
    setSelectedStepId(data._id);
    handleMenuClose();
  }, [data._id, handleMenuClose]);

  return (
    <>
      {data.hasTarget && <Handle type="target" position={Position.Top} />}
      <CustomNodeContainer>
        {data.target} <MoreVertIcon onClick={handleIconClick} />
      </CustomNodeContainer>
      <MenuStyled
        anchorEl={anchorEl}
        open={isMenuOpen}
        onClose={handleMenuClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleAddStepOptionClick}>Add sub-step</MenuItem>
        <MenuItem onClick={handleEditOptionClick}>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
      </MenuStyled>
      {data.hasSource && <Handle type="source" position={Position.Bottom} />}
    </>
  );
}
