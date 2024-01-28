import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllMaterial from "./pages/Material/AllMaterial";
import AllLabour from "./pages/Labour/AllLabour";
import AllEquipment from "./pages/Equipment/AllEquipment";
import AllWorkItems from "./pages/Work Item/AllWorkItems";
import CreateWorkItems from "./pages/Work Item/CreateWorkItem";
import Testing from "./pages/Test/Testing";
import AddEquipment from "./pages/Equipment/AddEquipment";
import UpdateEquipment from "./pages/Equipment/UpdateEquipment";
import AddMaterial from "./pages/Material/AddMaterial";
import UpdateMaterial from "./pages/Material/UpdateMaterial";
import AddLabour from "./pages/Labour/AddLabour";
import UpdateLabour from "./pages/Labour/UpdateLabour";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/allmaterial" replace={true} />}
          ></Route>
          <Route path="/allmaterial" element={<AllMaterial />}></Route>
          <Route path="/addmaterial" element={<AddMaterial />}></Route>
          <Route path="/updatematerial/:id" element={<UpdateMaterial />}></Route>

          <Route path="/alllabour" element={<AllLabour />}></Route>
          <Route path="/addlabour" element={<AddLabour />}></Route>
          <Route path="/updatelabour/:id" element={<UpdateLabour />}></Route>

          <Route path="/allequipment" element={<AllEquipment />}></Route>
          <Route path="/addequipment" element={<AddEquipment />}></Route>
          <Route
            path="/updateequipment/:id"
            element={<UpdateEquipment />}
          ></Route>

          <Route path="/allworkitem" element={<AllWorkItems />}></Route>
          <Route path="/createworkitem" element={<CreateWorkItems />}></Route>

          <Route path="/testing" element={<Testing />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
