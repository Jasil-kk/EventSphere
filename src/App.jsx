import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CompanyList } from "./pages/CompanyList";
import { SingleView } from "./pages/SingleView";
import { AdminPanel } from "./panels/AdminPanel/AdminPanel";
import { AllUsers } from "./panels/AdminPanel/AllUsers";
import { AllEventTeams } from "./panels/AdminPanel/AllEventTeams";
import { AddCategory } from "./panels/AdminPanel/AddCategory";
import { PublishNotification } from "./panels/AdminPanel/PublishNotification";
import { TeamPanel } from "./panels/TeamPanel/TeamPanel";
import { AllServices } from "./panels/TeamPanel/AllServices";
import { Enquiries } from "./panels/TeamPanel/Enquiries";
import { Notifications } from "./panels/TeamPanel/Notifications";
import { Inbox } from "./panels/TeamPanel/Inbox";

function App() {
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  
  return (
    <div className="App">
      {token && role === "admin" ? (
        <Routes>
          <Route path="/" element={<AdminPanel />} />
          <Route path="/allusers" element={<AllUsers />} />
          <Route path="/allteams" element={<AllEventTeams />} />
          <Route path="/addcategory" element={<AddCategory />} />
          <Route
            path="/publishnotification"
            element={<PublishNotification />}
          />
        </Routes>
      ) : token && role === "event_management" ? (
        <Routes>
          <Route path="/" element={<TeamPanel />} />
          <Route path="/allservices" element={<AllServices />} />
          <Route path="/enquiries" element={<Enquiries />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/inbox" element={<Inbox />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/companylist" element={<CompanyList />} />
          <Route path="/singleview" element={<SingleView />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
