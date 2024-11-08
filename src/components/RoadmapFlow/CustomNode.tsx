import { useCallback, useState } from "react";

import {
  CustomNodeContainer,
  MenuStyled,
} from "@/components/RoadmapFlow/index.styles";
import { setDialogName, setSelectedStepId } from "@/store";
import { RoadmapDialogName } from "@/store/index.types";
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
    [],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const optionClickHandler = useCallback(
    (dialogName: RoadmapDialogName) => () => {
      setDialogName(dialogName);
      setSelectedStepId(data._id);
      handleMenuClose();
    },
    [data._id, handleMenuClose],
  );

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
        <MenuItem onClick={optionClickHandler(RoadmapDialogName.AddNode)}>
          Add sub-step
        </MenuItem>
        <MenuItem onClick={optionClickHandler(RoadmapDialogName.EditNode)}>
          Edit
        </MenuItem>
        <MenuItem onClick={optionClickHandler(RoadmapDialogName.DeleteNode)}>
          Delete
        </MenuItem>
      </MenuStyled>
      {data.hasSource && <Handle type="source" position={Position.Bottom} />}
    </>
  );
}
