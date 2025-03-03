import { BarChartOverview } from "./components/bar-chart-overview";
import DueSoon from "./components/due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./components/subscriptions";
import { useFetchRequirements } from "@/hooks/requirements";
import { generateReport } from "@/pages/dashboard/components/generate-reports";
import { getRemainingDays } from "@/lib/utils";

function DashboardHome() {
  const { data: requirementList, isLoading } = useFetchRequirements();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!requirementList) {
    return <div>No data found</div>;
  }

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

  const annualValue = requirementList.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "annual"
  ).length;

  const semiAnnualValue = requirementList.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "semi annual"
  ).length;

  const quarterlyValue = requirementList.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "quarterly"
  ).length;

  const monthlyValue = requirementList.filter(
    (item) => item.frequencyOfCompliance.toLowerCase() === "monthly"
  ).length;

  const chartData = [
    {
      date: "Monthly",
      value: monthlyValue,
      fill: "#DE3163",
    },
    {
      date: "Quarterly",
      value: quarterlyValue,
      fill: "#A6F1E0",
    },
    {
      date: "SemiAnnual",
      value: semiAnnualValue,
      fill: "#3D8D7A",
    },
    {
      date: "Annual",
      value: annualValue,
      fill: "#FDB7EA",
    },
  ];

  const dueSoon = requirementList.filter((item) => {
    const remainingDays = getRemainingDays(item.dateSubmitted, item.expiration);
    return (
      (item.frequencyOfCompliance.toLowerCase() === "annual" && remainingDays <= 90) ||
      (item.frequencyOfCompliance.toLowerCase() === "semi annual" && remainingDays <= 60) ||
      (item.frequencyOfCompliance.toLowerCase() === "quarterly" && remainingDays <= 40) ||
      (item.frequencyOfCompliance.toLowerCase() === "monthly" && remainingDays <= 15)
    );
  });


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
        <DueSoon data={dueSoon} />
      </div>
    </div>
  );
}
export default DashboardHome;
