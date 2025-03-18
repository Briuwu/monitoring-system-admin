import { BarChartOverview } from "./components/bar-chart-overview";
import DueSoon from "./components/due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./components/subscriptions";
import { useFetchRequirements } from "@/hooks/requirements";
import { generateReport } from "@/pages/dashboard/components/generate-reports";
import { getDashboardData } from "@/lib/utils";

function DashboardHome() {
  const { data: requirementList, isLoading } = useFetchRequirements();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!requirementList) {
    return <div>No data found</div>;
  }

  const { subscriptionCounts, chartData } = getDashboardData(requirementList);

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
          item={subscriptionCounts.total}
          color="bg-blue-500"
        />
        <Subscriptions
          title="Active Compliances"
          item={subscriptionCounts.active}
          color="bg-green-500"
        />
        <Subscriptions
          title="Inactive Compliances"
          item={subscriptionCounts.inactive}
          color="bg-red-500"
        />
        <Subscriptions
          title="On Process Compliances"
          item={subscriptionCounts.pending}
          color="bg-yellow-500"
        />
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <BarChartOverview chartData={chartData} />
        <DueSoon />
      </div>
    </div>
  );
}
export default DashboardHome;
