import { BarChartOverview } from "./components/bar-chart-overview";
import DueSoon from "./components/due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./components/subscriptions";
import { useRequirement } from "@/hooks/use-requirement";
import { generateReport } from '@/pages/dashboard/components/generate-reports';

function DashboardHome() {
  const { requirementList } = useRequirement();

  const subscriptionCounts = {
    active: requirementList.filter(
      (item) => item.status.toLowerCase() === "active"
    ),
    inactive: requirementList.filter(
      (item) => item.status.toLowerCase() === "inactive"
    ),
    pending: requirementList.filter(
      (item) => item.status.toLowerCase() === "pending"
    ),
    total: requirementList,
  };

  const chartData = [
    {
      date: "Annual",
      value: subscriptionCounts.active.length,
      fill: "#10B981",
    },
    {
      date: "Semi Annual",
      value: subscriptionCounts.inactive.length,
      fill: "#EF4444",
    },
    {
      date: "Quarterly",
      value: subscriptionCounts.pending.length,
      fill: "#F59E0B",
    },
    {
      date: "Monthly",
      value: subscriptionCounts.total.length,
      fill: "#3B82F6",
    },
  ];

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard Overview</h2>
        <Button onClick={() => generateReport(requirementList)}>Generate Reports</Button>
      </div>
      <div className="grid lg:grid-cols-4 gap-2 w-full">
        <Subscriptions
          title="Total Subscriptions"
          item={subscriptionCounts.total}
          color="bg-blue-500"
        />
        <Subscriptions
          title="Active Subscriptions"
          item={subscriptionCounts.active}
          color="bg-green-500"
        />
        <Subscriptions
          title="Inactive Subscriptions"
          item={subscriptionCounts.inactive}
          color="bg-red-500"
        />
        <Subscriptions
          title="Pending Subscriptions"
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
