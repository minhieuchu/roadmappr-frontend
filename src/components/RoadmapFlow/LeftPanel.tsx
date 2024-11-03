import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  LeftPanelContainer,
  LeftPanelPopeverContainer,
  PopoverStyled,
} from "@/components/RoadmapFlow/index.styles";
import {
  selectRoadmaps,
  selectSelectedRoadmap,
  setRoadmaps,
  setSelectedRoadmap,
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
  const selectedRoadmap = useRoadmapStore(selectSelectedRoadmap);

  const handleLeftPanelIconClick = useCallback(() => {
    setAnchorEl(containerRef.current);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleRoadmapClick = useCallback(
    (roadmapId: string) => () => {
      const selectedRoadmap = roadmaps.find(
        (roadmap) => roadmap._id === roadmapId,
      )!;
      setSelectedRoadmap(selectedRoadmap);
      handlePopoverClose();
    },
    [roadmaps, handlePopoverClose],
  );

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get<Roadmap[]>(
          `${import.meta.env.VITE_BACKEND_URL}/roadmaps`,
        );
        setRoadmaps(data);
        if (data.length) {
          setSelectedRoadmap(data[0]);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchRoadmaps();
  }, []);

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
        <LeftPanelPopeverContainer>
          {roadmaps.map((roadmap) => (
            <div
              key={roadmap._id}
              className={roadmap._id === selectedRoadmap?._id ? "selected" : ""}
              onClick={handleRoadmapClick(roadmap._id)}
            >
              {roadmap.target}
            </div>
          ))}
        </LeftPanelPopeverContainer>
      </PopoverStyled>
      <Tooltip title="Roadmaps">
        <GridViewIcon onClick={handleLeftPanelIconClick} />
      </Tooltip>
    </LeftPanelContainer>
  );
}
