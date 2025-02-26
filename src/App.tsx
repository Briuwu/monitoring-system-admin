import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login";

import DashboardLayout from "@/pages/dashboard";
import DashboardHome from "@/pages/dashboard/dashboard-home";
import RequirementsPage from "@/pages/dashboard/requirements";
import CalendarPage from "@/pages/dashboard/calendar";
import SettingsPage from "./pages/dashboard/settings";
import UsersPage from "./pages/dashboard/users";
import AddRequirementPage from "./pages/dashboard/requirements/add";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="/dashboard/requirements" element={<RequirementsPage />} />
        <Route
          path="/dashboard/requirements/add"
          element={<AddRequirementPage />}
        />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/users" element={<UsersPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
export default App;
