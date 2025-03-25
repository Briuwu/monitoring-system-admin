import { BarChartOverview } from "../pages/dashboard/components/bar-chart-overview";
import DueSoon from "./due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./subscriptions";
import { useFetchRequirements } from "@/hooks/requirements";
import { generateReport } from "@/pages/dashboard/components/generate-reports";
import { getDashboardData } from "@/lib/utils";
import { Activities } from "./activities";
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
        <Subscriptions
          title="Total Compliances"
          item={subscriptions.total}
          color="bg-blue-500"
          isClient={isClient}
        />
        <Subscriptions
          title="Active Compliances"
          item={subscriptions.active}
          color="bg-green-500"
          isClient={isClient}
        />
        <Subscriptions
          title="Inactive Compliances"
          item={subscriptions.inactive}
          color="bg-red-500"
          isClient={isClient}
        />
        <Subscriptions
          title="On Process Compliances"
          item={subscriptions.pending}
          color="bg-yellow-500"
          isClient={isClient}
        />
      </div>
      <div className="grid lg:grid-cols-[0.75fr_1fr] gap-5">
        <BarChartOverview chartData={chartData} />
        <DueSoon isClient={isClient} />
      </div>
      <div>
        <Activities dept={department} isClient={isClient} />
      </div>
    </div>
  );
}
export default DashboardHome;
