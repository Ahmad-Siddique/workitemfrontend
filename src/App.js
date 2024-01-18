import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllMaterial from "./pages/Material/AllMaterial";
import AllLabour from "./pages/Labour/AllLabour";
import AllEquipment from "./pages/Equipment/AllEquipment";
import AllWorkItems from "./pages/Work Item/AllWorkItems";
import CreateWorkItems from "./pages/Work Item/CreateWorkItem";
import Testing from "./pages/Test/Testing";
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

          <Route path="/alllabour" element={<AllLabour />}></Route>

          <Route path="/allequipment" element={<AllEquipment />}></Route>

          <Route path="/allworkitem" element={<AllWorkItems />}></Route>
          <Route path="/createworkitem" element={<CreateWorkItems />}></Route>

          <Route path="/testing" element={<Testing />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
