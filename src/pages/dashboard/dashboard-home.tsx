import { BarChartOverview } from "./components/bar-chart-overview";
import DueSoon from "./components/due-soon";
import { Button } from "@/components/ui/button";
import { Subscriptions } from "./components/subscriptions";

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
];

function DashboardHome() {
  return (
    <div className="w-full space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Dashboard Overview</h2>
        <Button>Generate Reports</Button>
      </div>
      <div className="grid lg:grid-cols-3 gap-2 w-full">
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
