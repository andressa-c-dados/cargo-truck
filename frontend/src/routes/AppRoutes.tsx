import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import VolumeDetails from "../pages/VolumeDetails";
import CreateCargo from "../pages/CreateCargo";
import EditCargo from "../pages/EditCargo";

import Layout from "../components/common/Layout";


export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>


        <Route element={<Layout />}>


          <Route 
            path="/" 
            element={<Dashboard />} 
          />


          <Route
            path="/volume/:id"
            element={<VolumeDetails />}
          />


          <Route
            path="/cargo/create"
            element={<CreateCargo />}
          />

          <Route
            path="/cargo/:id/edit"
            element={<EditCargo />}
          />


        </Route>


      </Routes>

    </BrowserRouter>

  );
}
