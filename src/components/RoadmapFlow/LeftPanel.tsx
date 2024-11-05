import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  LeftPanelContainer,
  LeftPanelPopoverContainer,
  PopoverStyled,
} from "@/components/RoadmapFlow/index.styles";
import {
  selectRoadmaps,
  selectSelectedRoadmapId,
  setRoadmaps,
  setSelectedRoadmapId,
  useRoadmapStore,
} from "@/store";
import { Roadmap } from "@/store/index.types";
import GridViewIcon from "@mui/icons-material/GridView";
import Tooltip from "@mui/material/Tooltip";

export function LeftPanel() {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPopoverOpen = Boolean(anchorEl);
  const roadmaps = useRoadmapStore(selectRoadmaps);
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);

  const handleLeftPanelIconClick = useCallback(() => {
    setAnchorEl(containerRef.current);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleRoadmapClick = useCallback(
    (roadmapId: string) => () => {
      const selectedRoadmap = roadmaps.find(
        (roadmap) => roadmap._id === roadmapId
      )!;
      setSelectedRoadmapId(selectedRoadmap._id);
      handlePopoverClose();
    },
    [roadmaps, handlePopoverClose]
  );

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get<Roadmap[]>(
          `${import.meta.env.VITE_BACKEND_URL}/roadmaps`
        );
        setRoadmaps(data);
        if (data.length) {
          if (!data.some((roadmap) => roadmap._id === selectedRoadmapId)) {
            setSelectedRoadmapId(data[0]._id);
          }
          return;
        }
        setSelectedRoadmapId("");
      } catch (e) {
        console.error(e);
      }
    };

    fetchRoadmaps();
  }, [selectedRoadmapId]);

  return (
    <LeftPanelContainer ref={containerRef}>
      <PopoverStyled
        open={isPopoverOpen}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: 84,
        }}
      >
        <LeftPanelPopoverContainer>
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className={roadmap._id === selectedRoadmapId ? "selected" : ""}
              onClick={handleRoadmapClick(roadmap._id)}
            >
              {roadmap.target}
            </div>
          ))}
        </LeftPanelPopoverContainer>
      </PopoverStyled>
      <Tooltip title="Roadmaps">
        <GridViewIcon onClick={handleLeftPanelIconClick} />
      </Tooltip>
    </LeftPanelContainer>
  );
}
