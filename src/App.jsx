import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CompanyList } from "./pages/CompanyList";
import { SingleView } from "./pages/SingleView";
import { AdminPanel } from "./panels/AdminPanel/AdminPanel";
import { AllUsers } from "./panels/AdminPanel/AllUsers";
import { AllEventTeams } from "./panels/AdminPanel/AllEventTeams";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<HomePage />} />
        <Route path="/companylist" element={<CompanyList/>} />
        <Route path="/singleview" element={<SingleView/>} /> */}

        <Route path="/" element={<AdminPanel />} />
        <Route path="/allusers" element={<AllUsers />} />
        <Route path="/allteams" element={<AllEventTeams />} />

      </Routes>
    </div>
  );
}

export default App;
