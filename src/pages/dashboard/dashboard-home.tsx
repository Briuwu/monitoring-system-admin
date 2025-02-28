import { BarChartOverview } from "./components/bar-chart-overview";
import DueSoon from "./components/due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./components/subscriptions";
// import { useRequirement } from "@/hooks/use-requirement";

const items = [
  {
    id: 1,
    title: "Total Subscriptions",
    value: 5,
    color: "bg-neutral-800",
  },
  {
    id: 2,
    title: "Active Subscriptions",
    value: 3,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Inactive Subscriptions",
    value: 2,
    color: "bg-red-500",
  },
  {
    id: 4,
    title: "Pending Subscriptions",
    value: 0,
    color: "bg-yellow-500",
  },
];

function DashboardHome() {
  // const { requirementList } = useRequirement();

  // const subscriptionCounts = {
  //   active: requirementList.filter((item) => item.status.toLowerCase() === "active"),
  //   inactive: requirementList.filter((item) => item.status.toLowerCase() === "inactive"),
  //   pending: requirementList.filter((item) => item.status.toLowerCase() === "pending"),
  //   total: requirementList.length,
  // };
  // <Subscriptions
  //         title="Total Subscriptions"
  //         count={subscriptionCounts.total}
  //         color="blue"
  //       />
  //       <Subscriptions
  //         title="Active Subscriptions"
  //         count={subscriptionCounts.active.length}
  //         color="green"
  //       />
  //       <Subscriptions
  //         title="Inactive Subscriptions"
  //         count={subscriptionCounts.inactive.length}
  //         color="red"
  //       />
  //       <Subscriptions
  //         title="Pending Subscriptions"
  //         count={subscriptionCounts.pending.length}
  //         color="yellow"
  //       />

  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard Overview</h2>
        <Button>Generate Reports</Button>
      </div>
      <div className="grid lg:grid-cols-4 gap-2 w-full">
        {items.map((item) => (
          <Subscriptions key={item.id} item={item} />
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-5">
        <BarChartOverview />
        <DueSoon />
      </div>
    </div>
  );
}
export default DashboardHome;
