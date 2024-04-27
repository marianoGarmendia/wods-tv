import { Routes, Route } from "react-router-dom";
import InitPage from "./pages/initPage";
import CreateWod from "./pages/createWod";

function App() {
  return (
    <Routes>
      <Route path="/wod-tv" element={<InitPage />}></Route>
      <Route path="/wod-tv/create-wod" element={<CreateWod />}></Route>
    </Routes>
  );
}

export default App;
