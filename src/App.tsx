import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login";

import DashboardLayout from "@/pages/dashboard";
import DashboardHome from "@/components/dashboard-home";
import RequirementsPage from "@/pages/dashboard/requirements";
import CalendarPage from "@/pages/dashboard/calendar";
import UsersPage from "@/pages/dashboard/users";
import AddRequirementPage from "@/pages/dashboard/requirements/add";
import UserDetails from "@/pages/dashboard/users/user-details";
import RequirementDetails from "./components/requirement-details";
import UpdateRequirementPage from "./pages/dashboard/requirements/update";
import ClientPage from "./pages/client";
import AddRequirementClientPage from "./pages/client/add";
import UpdateRequirementClientPage from "./pages/client/update";
import { ProtectedRoutes } from "./pages/protected-routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
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
        </Route>
        <Route path="/client" element={<ClientPage />} />
        <Route path="/client/add" element={<AddRequirementClientPage />} />
        <Route
          path="/client/requirements/update/:requirementId"
          element={<UpdateRequirementClientPage />}
        />
        <Route
          path="/client/requirements/:requirementId"
          element={<RequirementDetails isClient />}
        />
      </Route>
    </Routes>
  );
}
export default App;
