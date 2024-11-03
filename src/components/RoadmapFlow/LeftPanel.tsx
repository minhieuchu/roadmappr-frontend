import axios from "axios";
import { useEffect } from "react";

import { LeftPanelContainer } from "@/components/RoadmapFlow/index.styles";
import { setRoadmaps, setSelectedRoadmap } from "@/store";
import { Roadmap } from "@/store/index.types";
import GridViewIcon from "@mui/icons-material/GridView";

export function LeftPanel() {
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const { data } = await axios.get<Roadmap[]>(
          `${import.meta.env.VITE_BACKEND_URL}/roadmaps`
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
    <LeftPanelContainer>
      <GridViewIcon />
    </LeftPanelContainer>
  );
}
