import axios from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  LeftPanelContainer,
  LeftPanelPopoverContainer,
  PopoverStyled,
} from "@/components/RoadmapFlow/index.styles";
import {
  selectDialogName,
  selectRoadmaps,
  selectSelectedRoadmapId,
  setDialogName,
  setRoadmaps,
  setSelectedRoadmapId,
  useRoadmapStore,
} from "@/store";
import { Roadmap, RoadmapDialogName } from "@/store/index.types";
import DataSaverOnIcon from "@mui/icons-material/DataSaverOn";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Tooltip from "@mui/material/Tooltip";

enum UtilOption {
  RoadmapList = "RoadmapList",
  AddNew = "AddNew",
  Null = "",
}

export function LeftPanel() {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const [utilOption, setUtilOption] = useState<UtilOption>(UtilOption.Null);
  const containerRef = useRef<HTMLDivElement>(null);
  const roadmaps = useRoadmapStore(selectRoadmaps);
  const selectedRoadmapId = useRoadmapStore(selectSelectedRoadmapId);
  const selectedDialogName = useRoadmapStore(selectDialogName);

  const isPopoverOpen = useMemo(
    () => utilOption === UtilOption.RoadmapList,
    [utilOption],
  );

  const handleRoadmapListClick = useCallback(() => {
    setUtilOption(UtilOption.RoadmapList);
    setAnchorEl(containerRef.current);
  }, []);

  const handleAddNew = useCallback(() => {
    setUtilOption(UtilOption.AddNew);
    setDialogName(RoadmapDialogName.AddNode);
  }, []);

  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
    setUtilOption(UtilOption.Null);
  }, []);

  const handleRoadmapClick = useCallback(
    (roadmapId: string) => () => {
      const selectedRoadmap = roadmaps.find(
        (roadmap) => roadmap._id === roadmapId,
      )!;
      setSelectedRoadmapId(selectedRoadmap._id);
      handlePopoverClose();
    },
    [roadmaps, handlePopoverClose],
  );

  const { addNewOptionClassName, roadmapListOptionClassName } = useMemo(() => {
    let roadmapListOptionClassName = "",
      addNewOptionClassName = "";
    if (utilOption === UtilOption.AddNew) {
      addNewOptionClassName = "selected";
    }
    if (utilOption === UtilOption.RoadmapList) {
      roadmapListOptionClassName = "selected";
    }
    return { addNewOptionClassName, roadmapListOptionClassName };
  }, [utilOption]);

  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get<Roadmap[]>(
          `${import.meta.env.VITE_BACKEND_URL}/roadmaps`,
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

  useEffect(() => {
    if (selectedDialogName === RoadmapDialogName.None) {
      setUtilOption(UtilOption.Null);
    }
  }, [selectedDialogName]);

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
        <FormatListBulletedIcon
          className={roadmapListOptionClassName}
          onClick={handleRoadmapListClick}
        />
      </Tooltip>
      <Tooltip title="Add new">
        <DataSaverOnIcon
          className={addNewOptionClassName}
          onClick={handleAddNew}
        />
      </Tooltip>
    </LeftPanelContainer>
  );
}
