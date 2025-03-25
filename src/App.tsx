import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router";
import LoginPage from "@/pages/login";
import { ProtectedRoutes } from "./pages/protected-routes";
import DashboardLayout from "@/pages/dashboard";

const LazyDashbooardHome = lazy(() => import("@/components/dashboard-home"));
const LazyRequirementPage = lazy(
  () => import("@/pages/dashboard/requirements")
);
const LazyCalendarPage = lazy(() => import("@/pages/dashboard/calendar"));
const LazyUserPage = lazy(() => import("@/pages/dashboard/users"));
const LazyAddRequirementPage = lazy(
  () => import("@/pages/dashboard/requirements/add")
);
const LazyUserDetailsPage = lazy(
  () => import("@/pages/dashboard/users/user-details")
);
const LazyRequirementDetailsPage = lazy(
  () => import("@/components/requirement-details")
);
const LazyUpdateRequirementPage = lazy(
  () => import("@/pages/dashboard/requirements/update")
);
const LazyClientPage = lazy(() => import("@/pages/client"));
const LazyAddRequirementClientPage = lazy(() => import("@/pages/client/add"));
const LazyUpdateRequirementClientPage = lazy(
  () => import("@/pages/client/update")
);
const LazyActivityLogsPage = lazy(
  () => import("@/pages/dashboard/activity-logs")
);

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route
            index
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyDashbooardHome />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/requirements"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyRequirementPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/requirements/add"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyAddRequirementPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/requirements/update/:requirementId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyUpdateRequirementPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/requirements/:requirementId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyRequirementDetailsPage />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/calendar"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyCalendarPage />
              </Suspense>
            }
          />

          <Route
            path="/dashboard/users"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyUserPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/users/:userId"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyUserDetailsPage />
              </Suspense>
            }
          />
          <Route
            path="/dashboard/activity-logs"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LazyActivityLogsPage />
              </Suspense>
            }
          />
        </Route>
        <Route
          path="/client"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyClientPage />
            </Suspense>
          }
        />
        <Route
          path="/client/add"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyAddRequirementClientPage />
            </Suspense>
          }
        />
        <Route
          path="/client/requirements/update/:requirementId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyUpdateRequirementClientPage />
            </Suspense>
          }
        />
        <Route
          path="/client/requirements/:requirementId"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LazyRequirementDetailsPage isClient />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
export default App;
