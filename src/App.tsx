import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login";

import DashboardLayout from "@/pages/dashboard";
import DashboardHome from "@/pages/dashboard/dashboard-home";
import RequirementsPage from "@/pages/dashboard/requirements";
import CalendarPage from "@/pages/dashboard/calendar";
import SettingsPage from "@/pages/dashboard/settings";
import UsersPage from "@/pages/dashboard/users";
import AddRequirementPage from "@/pages/dashboard/requirements/add";
import UserDetails from "@/pages/dashboard/users/user-details";
import RequirementDetails from "./pages/dashboard/requirements/requirement-details";
import AuthProvider from "./context/auth-provider";
import UpdateRequirementPage from "./pages/dashboard/requirements/update";
import ClientPage from "./pages/client";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />

          <Route
            path="/dashboard/requirements"
            element={<RequirementsPage />}
          />
          <Route
            path="/dashboard/requirements/add"
            element={<AddRequirementPage />}
          />
          <Route
            path="/dashboard/requirements/update/:requirementId"
            element={<UpdateRequirementPage />}
          />
          <Route
            path="/dashboard/requirements/:requirementId"
            element={<RequirementDetails />}
          />

          <Route path="/dashboard/calendar" element={<CalendarPage />} />

          <Route path="/dashboard/users" element={<UsersPage />} />
          <Route path="/dashboard/users/:userId" element={<UserDetails />} />

          <Route path="/dashboard/settings" element={<SettingsPage />} />
        </Route>
        <Route path="/client" element={<ClientPage />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
