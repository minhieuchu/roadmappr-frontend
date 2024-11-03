import "@xyflow/react/dist/style.css";

import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/HomePage";
import { RoadmapFlow } from "@/components/RoadmapFlow";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<RoadmapFlow />} />
    </Routes>
  );
}

export default App;
