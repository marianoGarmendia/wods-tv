import { Routes, Route } from "react-router-dom";
import InitPage from "./pages/initPage";
import CreateWod from "./pages/createWod";

function App() {
  return (
    <Routes>
      <Route path="/" element={<InitPage />}></Route>
      <Route path="/create-wod" element={<CreateWod />}></Route>
    </Routes>
  );
}

export default App;
