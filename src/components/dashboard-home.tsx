import { lazy, Suspense } from "react";

const LazySubscription = lazy(() => import("./subscriptions"));
const LazyDueSoon = lazy(() => import("./due-soon"));

const LazyBarChartOverview = lazy(
  () => import("@/pages/dashboard/components/bar-chart-overview")
);

const LazyActivities = lazy(() => import("./activities"));

import { generateReport } from "@/pages/dashboard/components/generate-reports";

import { Button } from "@/components/ui/button";
import { useFetchRequirements } from "@/hooks/requirements";
import { getDashboardData } from "@/lib/utils";

import { useMemo } from "react";

function DashboardHome({ isClient }: { isClient?: boolean }) {
  const department = JSON.parse(localStorage.getItem("user-department")!);
  const { data: requirementList, isLoading } = useFetchRequirements(
    isClient ? department : ""
  );

  const { subscriptions, chartData } = useMemo(
    () => getDashboardData(requirementList ?? []),
    [requirementList]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!requirementList) {
    return <div>No data found</div>;
  }

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard Overview</h2>
        <Button onClick={() => generateReport(requirementList)}>
          Generate Reports
        </Button>
      </div>
      <div className="grid lg:grid-cols-4 gap-2 w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <LazySubscription
            title="Total Compliances"
            item={subscriptions.total}
            color="bg-blue-500"
            isClient={isClient}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <LazySubscription
            title="Active Compliances"
            item={subscriptions.active}
            color="bg-green-500"
            isClient={isClient}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <LazySubscription
            title="Inactive Compliances"
            item={subscriptions.inactive}
            color="bg-red-500"
            isClient={isClient}
          />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <LazySubscription
            title="On Process Compliances"
            item={subscriptions.pending}
            color="bg-yellow-500"
            isClient={isClient}
          />
        </Suspense>
      </div>
      <div className="grid lg:grid-cols-[0.75fr_1fr] gap-5">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyBarChartOverview chartData={chartData} />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <LazyDueSoon isClient={isClient} />
        </Suspense>
      </div>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyActivities dept={department} isClient={isClient} />
        </Suspense>
      </div>
    </div>
  );
}
export default DashboardHome;
