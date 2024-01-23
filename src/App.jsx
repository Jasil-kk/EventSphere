import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CompanyList } from "./pages/CompanyList";
import { SingleView } from "./pages/SingleView";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/companylist" element={<CompanyList/>} />
        <Route path="/singleview" element={<SingleView/>} />
      </Routes>
    </div>
  );
}

export default App;
