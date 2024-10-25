import { Route, Routes } from "react-router-dom";

import { HomePage } from "@/components/HomePage";
import { RoadMap } from "@/components/RoadMap";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<RoadMap />} />
    </Routes>
  );
}

export default App;
