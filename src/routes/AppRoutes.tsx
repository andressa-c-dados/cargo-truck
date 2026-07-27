import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard.tsx";
import VolumeDetails from "../pages/VolumeDetails.tsx";
import CreateCargo from "../pages/CreateCargo.tsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/volume/:id" element={<VolumeDetails />} />
        <Route path="/cargo/create" element={<CreateCargo />} />
      </Routes>
    </BrowserRouter>
  );
}